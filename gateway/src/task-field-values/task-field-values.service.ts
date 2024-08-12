import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TaskFieldValueDto } from './dto/task-field-value.dto';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs';

@Injectable()
export class TaskFieldValuesService {

  constructor(@Inject("PROJECTS_SERVICE") private client: ClientProxy) { }

  async create(userId: string, dto: TaskFieldValueDto) {
    try {
      const sanding = { userId, projectId: dto.projectId, value: dto.value, taskFieldId: dto.taskFieldId, taskId: dto.taskId }
      return this.client.send({ cmd: "create-field-value" }, sanding).pipe(timeout(5000))
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения поля задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }


  async update(userId: string, dto: TaskFieldValueDto) {
    try {
      const sanding = { userId, projectId: dto.projectId, value: dto.value, taskFieldId: dto.taskFieldId, taskId: dto.taskId }
      return this.client.send({ cmd: "update-field-value" }, sanding).pipe(timeout(5000))
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновленния значения поля задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async remove(userId: string, projectId: string, taskFieldId: string, taskId: string) {
    try {
      const sanding = { userId, projectId, taskFieldId, taskId }
      return this.client.send({ cmd: "remove-field-value" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка удаления значения поля задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }
}