package service

import (
	"field-values/internal/entity"
	"field-values/internal/repository"
)

type TaskField interface {
	Create(field string, arg *entity.FieldValues) (*entity.FieldValues, error)
	Update(field string, arg *entity.FieldValues) (*entity.FieldValues, error)
	Delete(field string, arg *entity.GetValueParams) error
	GetProject(arg entity.ProjectValue) (entity.Project, error)
	GetTask(id string) (entity.TaskField, error)
}

type Service struct {
	TaskField
}

func NewService(repos repository.Repository) *Service {
	return &Service{
		TaskField: NewTaskFieldService(repos.TaskField),
	}
}
