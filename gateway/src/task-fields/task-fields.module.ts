import { Module } from '@nestjs/common';
import { TaskFieldsService } from './task-fields.service';
import { TaskFieldsController } from './task-fields.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "PROJECTS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'],
          queue: 'todolist-queue'
        }
      }
    ]),
  ],
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService],
})
export class TaskFieldsModule { }
