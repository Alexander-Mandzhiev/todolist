import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { TaskDto, UpdateOrderDto } from './dto/task.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDto, SandingTask, SandingTaskStatus, SandingTaskStatusId, UpdateTaskDto, UpdateTaskOrderDto } from 'src/types/tasks.types';

@Injectable()
export class TasksService {
  constructor(@Inject("PROJECTS_SERVICE") private client: ClientProxy) { }

  async create(userId: string, dto: TaskDto) {
    try {
      const sanding: CreateTaskDto = { userId, projectId: dto.projectId, statusId: dto.statusId, name: dto.name, description: dto.description }
      return this.client.send({ cmd: "create-task" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задач! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findAll(userId: string, projectId: string, statusId: string) {
    try {
      const sanding: SandingTaskStatus = { userId, projectId, statusId }
      return this.client.send({ cmd: "get-all-tasks" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задач! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findOne(userId: string, projectId: string, statusId: string, id: string) {
    try {
      const sanding: SandingTaskStatusId = { userId, projectId, statusId, id }
      return this.client.send({ cmd: "get-one-task" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async update(userId: string, id: string, dto: TaskDto) {
    try {
      const sanding: UpdateTaskDto = { userId, id, projectId: dto.projectId, statusId: dto.statusId, name: dto.name, description: dto.description }
      return this.client.send({ cmd: "update-task" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async remove(userId: string, projectId: string, statusId: string, id: string) {
    try {
      const sanding: SandingTaskStatusId = { userId, projectId, statusId, id }
      return this.client.send({ cmd: "delete-task" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка удаления задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async updateOrderTasks(userId: string, dto: UpdateOrderDto) {
    try {
      const sanding: UpdateTaskOrderDto = { userId, projectId: dto.projectId, statusId: dto.statusId, ids: dto.ids }
      return this.client.send({ cmd: "update-order-tasks" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления порядка задачи!`, HttpStatus.FORBIDDEN);
    }
  }
}
