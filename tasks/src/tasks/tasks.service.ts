import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FieldValuesDTO, IdTaskDto, StatusIdDto, TaskDto, UpdateOrderDto, UpdateTaskDto } from './dto/task.dto';
import { PrismaService } from 'src/prisma.service';
import { StatusesService } from 'src/statuses/statuses.service';
import { ProjectsService } from 'src/projects/projects.service';
import { TaskFieldValueDto } from './dto/task-field-value.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @Inject("VALUE_SERVICE") private client: ClientProxy,
    private prisma: PrismaService,
    private projectService: ProjectsService,
    private statusService: StatusesService) { }


  async findOneById(id: string) {
    try {
      return await this.prisma.task.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }


  async create(dto: TaskDto) {
    try {
      const { userId, projectId, statusId, description, name } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existStatus = await this.statusService.findOneStatus(statusId)
      if (!existStatus) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const count = await this.prisma.task.count({ where: { statusId: statusId } })

      const task = await this.prisma.task.create({
        data: { name, description, order: count, statusId },
        select: { id: true, createdAt: true, name: true, description: true, order: true }
      });

      dto.data.forEach(async (element: FieldValuesDTO) => {
        let message = {
          userId,
          projectId: dto.projectId,
          value: element.value,
          taskFieldId: element.taskFieldId,
          taskId: task.id
        }
        const v = await lastValueFrom(this.client.send({ cmd: "create-field-value" }, message))
      })

      return task.id
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findAll(dto: StatusIdDto) {
    try {
      const { userId, projectId, statusId } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existStatus = await this.statusService.findOneStatus(statusId)
      if (!existStatus) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const tasks = await this.prisma.task.findMany({
        where: { statusId }, select: {
          id: true, createdAt: true, name: true, description: true,
          taskIntValues: { select: { value: true, taskFieldId: true } },
          taskStrValues: { select: { value: true, taskFieldId: true } },
          taskEnumValues: { select: { value: true, taskFieldId: true } }
        }
      });
      return tasks
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задач! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findOne(dto: IdTaskDto) {
    try {
      const { userId, projectId, statusId, id } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existStatus = await this.statusService.findOneStatus(statusId)
      if (!existStatus) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      return await this.prisma.task.findUnique({
        where: { id, statusId }, select: {
          id: true, createdAt: true, name: true, description: true,
          taskIntValues: { select: { value: true, taskFieldId: true } },
          taskStrValues: { select: { value: true, taskFieldId: true } },
          taskEnumValues: { select: { value: true, taskFieldId: true } }
        }
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async update(dto: UpdateTaskDto) {
    try {
      const { userId, projectId, statusId, id, name, description } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existStatus = await this.statusService.findOneStatus(statusId)
      if (!existStatus) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      dto.data.forEach(async (element: FieldValuesDTO) => {
        let message = {
          userId,
          projectId: dto.projectId,
          value: element.value,
          taskFieldId: element.taskFieldId,
          taskId: id
        }
        const v = await lastValueFrom(this.client.send({ cmd: "update-field-value" }, message))
      })

      const count = await this.prisma.task.count({ where: { statusId: dto.statusId } })
      await this.prisma.task.update({
        where: { id },
        data: { name, description, statusId, order: count },
        select: {
          id: true, createdAt: true, name: true, description: true, order: true,
          taskIntValues: { select: { value: true, taskFieldId: true } },
          taskStrValues: { select: { value: true, taskFieldId: true } },
          taskEnumValues: { select: { value: true, taskFieldId: true } }
        }
      })
      return id
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async remove(dto: IdTaskDto) {
    try {
      const { userId, projectId, statusId, id } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existStatus = await this.statusService.findOneStatus(statusId)
      if (!existStatus) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const task = await this.prisma.task.findUnique({ where: { id } });
      if (!task) throw new HttpException(`Произошла ошибка удаления задачи! Задание не найдено!`, HttpStatus.BAD_REQUEST);

      await this.prisma.task.delete({ where: { id } });
      return { message: 'Задача успешно удалена!' };
    } catch (error) {
      throw new HttpException(`Произошла ошибка удаления задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async updateOrderTasks(dto: UpdateOrderDto) {
    try {
      const { userId, projectId, statusId } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existStatus = await this.statusService.findOneStatus(statusId)
      if (!existStatus) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      return await this.prisma.$transaction(
        dto.ids.map((id, order) => this.prisma.task.update({
          where: { id }, data: { order },
          select: {
            id: true, createdAt: true, name: true, description: true,
            taskIntValues: { select: { value: true, taskFieldId: true } },
            taskStrValues: { select: { value: true, taskFieldId: true } },
            taskEnumValues: { select: { value: true, taskFieldId: true } }
          }
        }))
      )
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления порядка задачи!`, HttpStatus.FORBIDDEN);
    }
  }
}
