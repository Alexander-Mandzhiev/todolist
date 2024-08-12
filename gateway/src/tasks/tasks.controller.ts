import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto, UpdateOrderDto } from './dto/task.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CreateTasksResponse, TasksResponse, UpdateOrderTasksResponse } from 'src/types/tasks.types';
import { DeleteMessage } from 'src/types/IBase';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@ApiTags('Задачи')
@Auth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @ApiBody({ type: TaskDto })
  @ApiOkResponse({ type: CreateTasksResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: TaskDto) {
    return this.tasksService.create(userId, dto);
  }

  @ApiOkResponse({ type: [TasksResponse] })
  @HttpCode(HttpStatus.OK)
  @Get(':project_id/:status_id')
  findAll(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('status_id') statusId: string) {
    return this.tasksService.findAll(userId, projectId, statusId);
  }

  @ApiOkResponse({ type: TasksResponse })
  @HttpCode(HttpStatus.OK)
  @Get(':project_id/:status_id/:id')
  findOne(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('status_id') statusId: string, @Param('id') id: string) {
    return this.tasksService.findOne(userId, projectId, statusId, id);
  }

  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ type: UpdateOrderTasksResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(`order`)
  updateOrderStatuses(@CurrentUser('id') userId: string, @Body() dto: UpdateOrderDto) {
    return this.tasksService.updateOrderTasks(userId, dto);
  }

  @ApiBody({ type: TaskDto })
  @ApiOkResponse({ type: TasksResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: TaskDto) {
    return this.tasksService.update(userId, id, dto);
  }

  @ApiOkResponse({ type: DeleteMessage })
  @HttpCode(HttpStatus.OK)
  @Delete(':project_id/:status_id/:id')
  remove(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('status_id') statusId: string, @Param('id') id: string) {
    return this.tasksService.remove(userId, projectId, statusId, id);
  }
}
