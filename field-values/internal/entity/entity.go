package entity

import (
	"time"
)

type MessageRabbitMQ struct {
	Pattern `json:"pattern"`
	Data    `json:"data"`
}

type Pattern struct {
	Cmd string `json:"cmd"`
}

type Data struct {
	ProjectValue
	FieldValues
}

type DataDelete struct {
	ProjectValue
	GetValueParams
}

type GetValueParams struct {
	TaskFieldID string `json:"TaskFieldID"`
	TaskID      string `json:"TaskID"`
}

type FieldValues struct {
	Value       interface{} `json:"value"`
	TaskFieldID string      `json:"taskFieldId"`
	TaskID      string      `json:"taskId"`
}

type ProjectValue struct {
	UserId    string `json:"userId" db:"user_id"`
	ProjectId string `json:"projectId" db:"id"`
}

type Project struct {
	Id          string    `json:"id" db:"id"`
	Name        string    `json:"name" db:"name"`
	Description string    `json:"description" db:"description"`
	UserId      string    `json:"user_id" db:"user_id"`
	CreatedAt   time.Time `json:"created_at" db:"created_at"`
}

type TaskField struct {
	Id        string `json:"id" db:"id"`
	Name      string `json:"name" db:"name"`
	Field     string `json:"field" db:"field"`
	ProjectId string `json:"projectId" db:"project_id"`
}
