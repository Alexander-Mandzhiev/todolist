import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusDto, UpdateOrderDto } from './dto/status.dto';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateStatusesResponse, StatusesResponse, UpdateOrderStatusesResponse } from '../types/statuses.types';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { DeleteMessage } from 'src/types/IBase';

@ApiTags('Статус задачи')
@Auth()
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) { }

  @ApiBody({ type: StatusDto })
  @ApiOkResponse({ type: CreateStatusesResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Post()
  create(@CurrentUser('id') id: string, @Body() dto: StatusDto) {
    return this.statusesService.create(id, dto);
  }

  @ApiOkResponse({ type: [StatusesResponse] })
  @HttpCode(HttpStatus.OK)
  @Get(':project_id')
  findAll(@CurrentUser('id') id: string, @Param('project_id') projectId: string) {
    return this.statusesService.findAll(id, projectId);
  }

  @ApiOkResponse({ type: StatusesResponse })
  @HttpCode(HttpStatus.OK)
  @Get(':project_id/:id')
  findOne(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('id') id: string) {
    return this.statusesService.findOne(userId, projectId, id);
  }

  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({ type: UpdateOrderStatusesResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(`order`)
  updateOrderStatuses(@CurrentUser('id') userId: string, @Body() dto: UpdateOrderDto) {
    return this.statusesService.updateOrderStatuses(userId, dto);
  }

  @ApiBody({ type: StatusDto })
  @ApiOkResponse({ type: CreateStatusesResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(@CurrentUser('id') userId: string, @Param('id') id: string, @Body() dto: StatusDto) {
    return this.statusesService.update(userId, id, dto);
  }

  @ApiOkResponse({ type: DeleteMessage })
  @HttpCode(HttpStatus.OK)
  @Delete(':project_id/:id')
  remove(@CurrentUser('id') userId: string, @Param('project_id') projectId: string, @Param('id') id: string) {
    return this.statusesService.remove(userId, projectId, id);
  }
}
