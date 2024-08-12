package rabbitmq

import (
	"context"
	"encoding/json"
	"field-values/internal/entity"
	"log"

	amqp "github.com/rabbitmq/amqp091-go"
)

func ConnectMQ(rabbitmq string) (*amqp.Connection, *amqp.Channel) {
	conn, err := amqp.Dial(rabbitmq)
	FailOnError(err, "Failed to connect to RabbitMQ")
	ch, err := conn.Channel()
	FailOnError(err, "Failed to open a channel")
	return conn, ch
}

func CloseMQ(conn *amqp.Connection, channel *amqp.Channel) {
	defer conn.Close()
	defer channel.Close()
}

func SandCreateOrUpdate(ctx context.Context, ch *amqp.Channel, message amqp.Delivery, res *entity.FieldValues) {
	response, err := json.Marshal(*res)
	FailOnError(err, "failed to marshal")
	err = ch.PublishWithContext(ctx, "", message.ReplyTo, false, false,
		amqp.Publishing{
			ContentType:   "application/json",
			CorrelationId: message.CorrelationId,
			Body:          []byte(response),
		})
	FailOnError(err, "Failed to publish a message")
	message.Ack(false)
}

func SandDelete(ctx context.Context, ch *amqp.Channel, message amqp.Delivery, res string) {
	response, err := json.Marshal(res)
	FailOnError(err, "failed to marshal")
	err = ch.PublishWithContext(ctx, "", message.ReplyTo, false, false,
		amqp.Publishing{
			ContentType:   "application/json",
			CorrelationId: message.CorrelationId,
			Body:          []byte(response),
		})
	FailOnError(err, "Failed to publish a message")
	message.Ack(false)
}

func FailOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}
