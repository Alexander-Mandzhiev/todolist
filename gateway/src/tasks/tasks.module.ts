import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
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
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule { }
