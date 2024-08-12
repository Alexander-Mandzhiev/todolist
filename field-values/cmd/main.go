package main

import (
	"context"
	"encoding/json"
	"field-values/internal/config"
	"field-values/internal/entity"
	"field-values/internal/handler"
	"field-values/internal/rabbitmq"
	"field-values/internal/repository"
	"field-values/internal/service"
	"field-values/pkg/sl"
	"log/slog"
	"time"

	"log"
)

func main() {
	var forever chan struct{}

	// Connections DB, Repos, Services, Handlers
	cfg := config.MustLoad()
	logger := config.SetupLogger(cfg.Env)
	logger.Info("Starting consume app", slog.String("env", cfg.Env))
	logger.Debug("Debug messages are enabled")

	db, err := repository.NewPostgresDB(cfg.DatabaseURL)
	rabbitmq.FailOnError(err, "Failed to connect db")
	if err != nil {
		logger.Error("failed to initialize db: %s", sl.Err(err))
	}
	repo := repository.NewRepository(db)
	logger.Info("initialize repository")

	services := service.NewService(*repo)
	logger.Info("initialize services")

	handlers := handler.NewHandler(services)
	logger.Info("initialize handlers")

	/// rabbitMQ

	conn, ch := rabbitmq.ConnectMQ(cfg.RabbitMQ)
	defer rabbitmq.CloseMQ(conn, ch)

	q, err := ch.QueueDeclare("values", true, false, false, false, nil)
	rabbitmq.FailOnError(err, "Failed to declare a queue")

	err = ch.Qos(1, 0, false)
	rabbitmq.FailOnError(err, "Failed to set QoS")

	msgs, err := ch.Consume(q.Name, "values", false, false, false, false, nil)
	rabbitmq.FailOnError(err, "Failed to register a consumer")

	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		for message := range msgs {
			msg := &entity.MessageRabbitMQ{}
			if err := json.Unmarshal(message.Body, msg); err != nil {
				message.Nack(false, false)
				log.Printf("Failed unmarshal message: %v", err)
			}
			switch msg.Cmd {
			case "create-field-value":
				res, err := handlers.Create(msg)
				if err != nil {
					logger.Error("Error creating field value: %s", sl.Err(err))
				}
				rabbitmq.SandCreateOrUpdate(ctx, ch, message, res)
			case "update-field-value":
				res, err := handlers.Update(msg)
				if err != nil {
					logger.Error("Error updating field value: %s", sl.Err(err))
				}
				rabbitmq.SandCreateOrUpdate(ctx, ch, message, res)
			case "remove-field-value":
				err := handlers.Delete(msg)
				if err != nil {
					logger.Error("Error deleted field value: %s", sl.Err(err))
					continue
				}
				rabbitmq.SandDelete(ctx, ch, message, "value successfully deleted")
			default:
				log.Println("I'am default.")
			}
		}
	}()

	log.Println("Consumer to close the programm press CTRL+C")
	<-forever
}
