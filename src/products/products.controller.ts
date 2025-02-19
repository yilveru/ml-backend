// src/users/users.controller.ts
import {
  Controller,
  Post,
  Get,
  Req,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterDto } from './dto/filter.dto';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthRequest } from '../auth/interfaces/auth-request.interface';
import {
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({ summary: 'Crear producto' })
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: AuthRequest,
  ): Promise<Product> {
    return this.productsService.create(createProductDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  @ApiOperation({
    summary: 'Obtener lista de productos con paginación por usuario especifico',
  })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos por usuario',
    type: [Product],
  })
  async getProductsByUser(
    @Req() req: AuthRequest,
    @Query() filters: FilterDto,
  ) {
    return this.productsService.getProductsByUser(req.user, filters);
  }

  @Get('list')
  @ApiOperation({ summary: 'Obtener lista de productos con paginación' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos',
    type: [Product],
  })
  async getAll(@Req() @Query() filters: FilterDto) {
    return this.productsService.getAll(filters);
  }
}
