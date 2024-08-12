import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { StatusesModule } from './statuses/statuses.module';
import { TaskFieldsModule } from './task-fields/task-fields.module';
import { TaskFieldValuesModule } from './task-field-values/task-field-values.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    TasksModule,
    StatusesModule,
    ProjectsModule,
    TaskFieldsModule,
    TaskFieldValuesModule
  ],
})
export class AppModule { }
