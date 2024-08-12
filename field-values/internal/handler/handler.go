package handler

import (
	"field-values/internal/entity"
	"field-values/internal/service"
	"reflect"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) Create(msg *entity.MessageRabbitMQ) (*entity.FieldValues, error) {
	var taskField *entity.FieldValues
	var err error
	value := InsertFieldValues(msg)
	field, _ := h.Exists(msg)
	typeField := reflect.TypeOf(value.Value).Kind()

	if typeField == reflect.Int && field.Field == "integer" {
		taskField, err = h.services.TaskField.Create("int_fields", value)
		if err != nil {
			return &entity.FieldValues{}, err
		}
	}
	if typeField == reflect.String && field.Field == "string" {
		taskField, err = h.services.TaskField.Create("str_fields", value)
		if err != nil {
			return &entity.FieldValues{}, err
		}
	}

	if typeField == reflect.String && field.Field == "enum" {
		taskField, err = h.services.TaskField.Create("task_enum_value", value)
		if err != nil {
			return &entity.FieldValues{}, err
		}
	}
	return taskField, nil
}

func (h *Handler) Update(msg *entity.MessageRabbitMQ) (*entity.FieldValues, error) {
	value := InsertFieldValues(msg)
	field, _ := h.Exists(msg)

	typeField := reflect.TypeOf(value.Value).Kind()
	var taskField *entity.FieldValues
	var err error

	if typeField == reflect.Int && field.Field == "integer" {
		taskField, err = h.services.TaskField.Update("int_fields", value)
		if err != nil {
			return &entity.FieldValues{}, err
		}
	}

	if typeField == reflect.String && field.Field == "string" {
		taskField, err = h.services.TaskField.Update("str_fields", value)
		if err != nil {
			return &entity.FieldValues{}, err
		}
	}

	if typeField == reflect.String && field.Field == "enum" {
		taskField, err = h.services.TaskField.Update("task_enum_value", value)
		if err != nil {
			return &entity.FieldValues{}, err
		}
	}

	return taskField, nil
}

func (h *Handler) Delete(msg *entity.MessageRabbitMQ) error {
	value := InsertGetValueParams(msg)
	field, _ := h.Exists(msg)
	if field.Field == "integer" {
		err := h.services.TaskField.Delete("int_fields", value)
		if err != nil {
			return err
		}
	}

	if field.Field == "string" {
		err := h.services.TaskField.Delete("str_fields", value)
		if err != nil {
			return err
		}
	}

	if field.Field == "enum" {
		err := h.services.TaskField.Delete("task_enum_value", value)
		if err != nil {
			return err
		}
	}
	return nil
}

func (h *Handler) Exists(msg *entity.MessageRabbitMQ) (entity.TaskField, error) {
	project := InsertProjectValues(msg)
	_, err := h.services.GetProject(*project)
	if err != nil {
		return entity.TaskField{}, err
	}

	field, err := h.services.GetTask(msg.TaskFieldID)
	if err != nil {
		return entity.TaskField{}, err
	}
	return field, nil
}
