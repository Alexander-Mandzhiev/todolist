import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { StatusesService } from 'src/statuses/statuses.service';
import { ProjectsService } from 'src/projects/projects.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "VALUE_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'values',
        }
      }
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService, PrismaService, StatusesService, ProjectsService],
  exports: [TasksService]
})
export class TasksModule { }
