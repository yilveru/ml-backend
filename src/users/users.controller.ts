// src/users/users.controller.ts
import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registro de usuario' })
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.confirmPassword) {
      throw new Error('Las contraseñas no coinciden.');
    }

    return this.usersService.create(createUserDto);
  }
}
