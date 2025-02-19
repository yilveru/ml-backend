import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FilterDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Laptop' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'SKU12345' })
  sku?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 1000, description: 'Precio minimo a filtrar' })
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 100000, description: 'Precio maximo a filtrar' })
  maxPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 2, description: 'Numero de pagina a consultar' })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({ example: 20, description: 'Limite de registros por pagina' })
  limit?: number;
}
