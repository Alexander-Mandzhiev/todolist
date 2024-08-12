package repository

import (
	"field-values/internal/entity"

	"github.com/jmoiron/sqlx"
)

type TaskField interface {
	Create(field string, agr *entity.FieldValues) (*entity.FieldValues, error)
	Update(field string, arg *entity.FieldValues) (*entity.FieldValues, error)
	Delete(field string, arg *entity.GetValueParams) error
	GetProject(arg entity.ProjectValue) (entity.Project, error)
	GetTask(id string) (entity.TaskField, error)
}

type Repository struct {
	TaskField
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		TaskField: NewTaskValuesPostgres(db),
	}
}
