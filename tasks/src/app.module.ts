import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { StatusesModule } from './statuses/statuses.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProjectsModule,
    StatusesModule,
    TasksModule,
    TaskFieldsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
