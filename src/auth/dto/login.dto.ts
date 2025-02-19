import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail({}, { message: 'Por favor, ingresa un correo válido.' })
  @IsNotEmpty({ message: 'Email es requerido' })
  @ApiProperty({ example: 'email@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerido.' })
  @ApiProperty({ example: '123' })
  password: string;
}
