import { Controller, Post, Body, Patch, HttpCode, UsePipes, HttpStatus, ValidationPipe, Delete, Get, Param } from '@nestjs/common';
import { TaskFieldValuesService } from './task-field-values.service';
import { TaskFieldValueDto } from './dto/task-field-value.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { DeleteMessage } from 'src/types/IBase';

@ApiTags('Значения полей задач')
@Auth()
@Controller('task-field-values')
export class TaskFieldValuesController {
  constructor(private readonly taskFieldValuesService: TaskFieldValuesService) { }

  @ApiBody({ type: TaskFieldValueDto })
  @ApiOkResponse({ type: TaskFieldValueDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: TaskFieldValueDto) {
    return this.taskFieldValuesService.create(userId, dto);
  }

  @ApiBody({ type: TaskFieldValueDto })
  @ApiOkResponse({ type: TaskFieldValueDto })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch()
  update(@CurrentUser('id') userId: string, @Body() dto: TaskFieldValueDto) {
    return this.taskFieldValuesService.update(userId, dto);
  }

  @ApiOkResponse({ type: DeleteMessage })
  @HttpCode(HttpStatus.OK)
  @Delete(':project_id/:task_id/:task_field_id')
  remove(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('task_id') task_id: string, @Param('task_field_id') task_field_id: string,) {
    return this.taskFieldValuesService.remove(userId, projectId, task_field_id, task_id);
  }
}
