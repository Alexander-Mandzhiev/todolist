import { Controller, Get, Body, Delete, UsePipes, ValidationPipe, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserResponse, UserResponse } from 'src/types/users.types';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DeleteMessage } from 'src/types/IBase';

@ApiTags('Пользователи')
@Auth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOkResponse({ type: UserResponse })
  @HttpCode(HttpStatus.OK)
  @Get()
  async findOne(@CurrentUser('id') id: string) {
    const { password, ...profile } = await this.usersService.findOneById(id);
    return profile
  }

  @ApiBody({ type: UserDto })
  @ApiOkResponse({ type: UpdateUserResponse })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @Patch()
  async update(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.usersService.update(id, dto);
  }

  @ApiOkResponse({ type: DeleteMessage })
  @HttpCode(HttpStatus.OK)
  @Delete()
  async remove(@CurrentUser('id') id: string) {
    return this.usersService.remove(id);
  }
}
