import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail({}, { message: 'Por favor, ingresa un correo válido.' })
  @ApiProperty({
    example: 'email@example.com',
    description: 'Email del usuario',
  })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @ApiProperty({ example: '123', description: 'Password del usuario' })
  password: string;

  @IsNotEmpty({
    message: 'La confirmación de la contraseña no puede estar vacía.',
  })
  @ApiProperty({ example: '123', description: 'Confirmacion de la contraseña' })
  confirmPassword: string;
}
