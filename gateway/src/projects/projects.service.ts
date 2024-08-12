import { Inject, Injectable } from '@nestjs/common';
import { ProjectDto } from './dto/create-project.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SandProjectDto, SandUpdateProjectDto } from 'src/types/projects.types';
import { FindOneProjectId } from 'src/types/IBase';

@Injectable()
export class ProjectsService {
  constructor(@Inject("PROJECTS_SERVICE") private client: ClientProxy) { }

  async create(userId: string, dto: ProjectDto) {
    const sanding: SandProjectDto = { userId, name: dto.name, description: dto.description }
    return this.client.send({ cmd: "create-project" }, sanding)
  }

  async findAll(id: string) {
    return this.client.send({ cmd: "get-all-projects" }, id)
  }

  async findOne(userId: string, projectId: string) {
    const sanding: FindOneProjectId = { userId, id: projectId }
    return this.client.send({ cmd: "get-one-project" }, sanding)
  }

  async update(userId: string, projectId: string, dto: ProjectDto) {
    const sanding: SandUpdateProjectDto = { userId, id: projectId, name: dto.name, description: dto.description }
    return this.client.send({ cmd: "update-projects" }, sanding)
  }

  async remove(userId: string, projectId: string) {
    const sanding: FindOneProjectId = { userId, id: projectId }
    return this.client.send({ cmd: "delete-projects" }, sanding)
  }
}
