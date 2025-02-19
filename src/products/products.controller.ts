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

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: AuthRequest,
  ): Promise<Product> {
    return this.productsService.create(createProductDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async getProductsByUser(
    @Req() req: AuthRequest,
    @Query() filters: FilterDto,
  ) {
    return this.productsService.getProductsByUser(req.user, filters);
  }

  @Get('list')
  async getAll(@Req() @Query() filters: FilterDto) {
    return this.productsService.getAll(filters);
  }
}
