import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @ApiProperty({ example: 'Laptop', description: 'Nombre del producto' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El SKU es obligatorio.' })
  @ApiProperty({ example: 'SKU123', description: 'Referencia del producto' })
  sku: string;

  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1.' })
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  @ApiProperty({ example: 20, description: 'Numero de existencias' })
  quantity: number;

  @IsNumber()
  @Min(0.01, { message: 'El precio debe ser mayor a 0.' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  @ApiProperty({ example: 1000, description: 'Valor del producto' })
  price: number;
}
