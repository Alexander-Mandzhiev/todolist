import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { StatusDto, UpdateOrderDto } from './dto/status.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SandStatustDto, SandStatustUpdateOrderDto, SandUodateStatusDto } from 'src/types/statuses.types';
import { FindOneId, ProjectId } from 'src/types/IBase';

@Injectable()
export class StatusesService {
  constructor(@Inject("PROJECTS_SERVICE") private client: ClientProxy) { }

  async create(userId: string, dto: StatusDto) {
    try {
      const sanding: SandStatustDto = { userId, projectId: dto.projectId, name: dto.name }
      return this.client.send({ cmd: "create-status" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findAll(userId: string, projectId: string) {
    try {
      const sanding: ProjectId = { userId, projectId }
      return this.client.send({ cmd: "get-all-status" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения статусов проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findOne(userId: string, projectId: string, id: string) {
    try {
      const sanding: FindOneId = { userId, projectId, id }
      return this.client.send({ cmd: "get-one-status" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async update(userId: string, id: string, dto: StatusDto) {
    try {
      const sanding: SandUodateStatusDto = { userId, projectId: dto.projectId, id, name: dto.name }
      return this.client.send({ cmd: "update-status" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async remove(userId: string, projectId: string, id: string) {
    try {
      const sanding: FindOneId = { userId, id, projectId }
      return this.client.send({ cmd: "delete-status" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async updateOrderStatuses(userId: string, dto: UpdateOrderDto) {
    try {
      const sanding: SandStatustUpdateOrderDto = { userId, projectId: dto.projectId, ids: dto.ids }
      return this.client.send({ cmd: "update-status-order-project" }, sanding)
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }

  }
}
