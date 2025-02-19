import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El SKU es obligatorio.' })
  sku: string;

  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1.' })
  @IsPositive({ message: 'La cantidad debe ser un número positivo' })
  quantity: number;

  @IsNumber()
  @Min(0.01, { message: 'El precio debe ser mayor a 0.' })
  @IsPositive({ message: 'El precio debe ser un número positivo' })
  price: number;
}
