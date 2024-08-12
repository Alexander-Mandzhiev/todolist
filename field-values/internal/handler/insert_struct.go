package handler

import "field-values/internal/entity"

func InsertFieldValues(msg *entity.MessageRabbitMQ) *entity.FieldValues {
	switch msg.Value.(type) {
	case float64:
		return &entity.FieldValues{
			Value:       int(msg.Value.(float64)),
			TaskFieldID: msg.TaskFieldID,
			TaskID:      msg.TaskID,
		}

	default:
		return &entity.FieldValues{
			Value:       msg.Value,
			TaskFieldID: msg.TaskFieldID,
			TaskID:      msg.TaskID,
		}
	}
}

func InsertGetValueParams(msg *entity.MessageRabbitMQ) *entity.GetValueParams {
	return &entity.GetValueParams{
		TaskFieldID: msg.TaskFieldID,
		TaskID:      msg.TaskID,
	}
}

func InsertProjectValues(msg *entity.MessageRabbitMQ) *entity.ProjectValue {
	return &entity.ProjectValue{
		ProjectId: msg.ProjectId,
		UserId:    msg.UserId,
	}
}
