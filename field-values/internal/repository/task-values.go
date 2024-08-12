package repository

import (
	"field-values/internal/entity"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type TaskValuesPostgres struct {
	db *sqlx.DB
}

func NewTaskValuesPostgres(db *sqlx.DB) *TaskValuesPostgres {
	return &TaskValuesPostgres{db: db}
}

func (q *TaskValuesPostgres) GetProject(arg entity.ProjectValue) (entity.Project, error) {
	var p entity.Project
	query := "SELECT * FROM project WHERE id = $1 AND user_id = $2"
	if err := q.db.Get(&p, query, arg.ProjectId, arg.UserId); err != nil {
		return p, err
	}
	return p, nil
}

func (q *TaskValuesPostgres) GetTask(id string) (entity.TaskField, error) {
	var p entity.TaskField
	query := `SELECT * FROM task_fields WHERE id = $1`
	if err := q.db.Get(&p, query, id); err != nil {
		return p, err
	}
	return p, nil
}

func (q *TaskValuesPostgres) Create(field string, arg *entity.FieldValues) (*entity.FieldValues, error) {
	query := fmt.Sprintf(`INSERT INTO %s (value, task_field_id, task_id) VALUES ($1, $2, $3) RETURNING value, task_field_id, task_id`, field)
	if err := q.db.QueryRow(query, arg.Value, arg.TaskFieldID, arg.TaskID).Scan(&arg.Value, &arg.TaskFieldID, &arg.TaskID); err != nil {
		return arg, err
	}
	return arg, nil
}

func (q *TaskValuesPostgres) Update(field string, arg *entity.FieldValues) (*entity.FieldValues, error) {
	query := fmt.Sprintf(`UPDATE %s SET value = $1, task_field_id = $2, task_id = $3 WHERE task_field_id = $2 AND task_id = $3 RETURNING value, task_field_id, task_id`, field)
	if err := q.db.QueryRow(query, arg.Value, arg.TaskFieldID, arg.TaskID).Scan(&arg.Value, &arg.TaskFieldID, &arg.TaskID); err != nil {
		return arg, err
	}
	return arg, nil
}

func (q *TaskValuesPostgres) Delete(field string, arg *entity.GetValueParams) error {
	query := fmt.Sprintf(`DELETE FROM %s WHERE task_field_id = $1 AND task_id = $2`, field)
	_, err := q.db.Exec(query, arg.TaskFieldID, arg.TaskID)
	return err
}

/*

 const { userId, projectId, taskFieldId, taskId, value } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const { field } = await this.taskFieldsService.findOne(taskFieldId)
      if (field === 'integer' && typeof value === 'number') {
        return await this.prisma.taskIntValues.create({ data: { value, taskFieldId, taskId }, });
      }
      if (field === 'string' && typeof value === 'string') {
        return await this.prisma.taskStrValues.create({ data: { value, taskFieldId, taskId }, });
      }
      if (field === 'enum' && typeof value === 'string') {
        const { name } = await this.prisma.taskFieldsEnumValue.findUnique({ where: { id: value } })
        return await this.prisma.taskEnumValues.create({ data: { value: name, taskFieldId, taskId }, });
      }
      return { message: `Проверьте правильность отправляемых данных!` }
*/
