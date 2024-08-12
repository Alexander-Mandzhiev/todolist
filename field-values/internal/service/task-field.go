package service

import (
	"field-values/internal/entity"
	"field-values/internal/repository"
)

type TaskFieldService struct {
	repo repository.TaskField
}

func NewTaskFieldService(repo repository.TaskField) *TaskFieldService {
	return &TaskFieldService{repo: repo}
}

func (s *TaskFieldService) Create(field string, arg *entity.FieldValues) (*entity.FieldValues, error) {
	return s.repo.Create(field, arg)
}

func (s *TaskFieldService) Update(field string, arg *entity.FieldValues) (*entity.FieldValues, error) {
	return s.repo.Update(field, arg)
}
func (s *TaskFieldService) Delete(field string, arg *entity.GetValueParams) error {
	return s.repo.Delete(field, arg)
}

func (s *TaskFieldService) GetProject(arg entity.ProjectValue) (entity.Project, error) {
	return s.repo.GetProject(arg)
}

func (s *TaskFieldService) GetTask(id string) (entity.TaskField, error) {
	return s.repo.GetTask(id)
}
