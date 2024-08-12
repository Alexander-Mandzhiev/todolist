import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserResponse, User } from 'src/types/users.types';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(dto: UserDto): Promise<User> {
    return await this.prisma.user.create({ data: { username: '', email: dto.email, password: await hash(dto.password) } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, dto: UserDto): Promise<UpdateUserResponse> {
    let data = dto;
    if (dto.password) { data = { ...dto, password: await hash(dto.password) } }
    return await this.prisma.user.update({ where: { id }, data, select: { username: true, email: true } })
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleteUser = await this.prisma.user.delete({ where: { id } });
    return { message: 'Пользователь успешно удален!' };
  }

}
