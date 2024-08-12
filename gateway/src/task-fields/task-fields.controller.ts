import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskFieldsService } from './task-fields.service';
import { EnumValuesDto, TaskFieldDto, UpdateTaskFieldDto } from './dto/task-field.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CreateProjectFieldResponse, ProjectFieldsResponse, ResponseEnum } from 'src/types/projectFields.types';
import { DeleteMessage } from 'src/types/IBase';

@ApiTags('Поле задачи')
@Auth()
@Controller('task-fields')
export class TaskFieldsController {
  constructor(private readonly taskFieldsService: TaskFieldsService) { }

  @ApiBody({ type: TaskFieldDto })
  @ApiOkResponse({ type: CreateProjectFieldResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@CurrentUser('id') userId: string, @Body() dto: TaskFieldDto) {
    return this.taskFieldsService.create(userId, dto);
  }

  @ApiOkResponse({ type: ProjectFieldsResponse })
  @HttpCode(HttpStatus.OK)
  @Get(':project_id')
  findAll(@CurrentUser('id') userId: string, @Param('project_id') projectId: string) {
    return this.taskFieldsService.findAll(userId, projectId);
  }

  @ApiBody({ type: EnumValuesDto })
  @ApiOkResponse({ type: ResponseEnum })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post('enum')
  createEnumValueList(@CurrentUser('id') userId: string, @Body() dto: EnumValuesDto) {
    return this.taskFieldsService.createEnumValueList(userId, dto);
  }

  @ApiBody({ type: UpdateTaskFieldDto })
  @ApiOkResponse({ type: CreateProjectFieldResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: UpdateTaskFieldDto) {
    return this.taskFieldsService.update(userId, id, dto);
  }

  @ApiOkResponse({ type: DeleteMessage })
  @HttpCode(HttpStatus.OK)
  @Delete(':project_id/:id')
  remove(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('id') id: string) {
    return this.taskFieldsService.remove(userId, projectId, id);
  }
}
