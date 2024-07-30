import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import { UserDto } from './dto/UserDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Get('get-all-users')
  async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @Get('get-user/:id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findOne(id);
  }

  @Patch('update-user/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete('delete-user/:id')
  async remove(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.remove(id);
  }
}
