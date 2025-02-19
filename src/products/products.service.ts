import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterDto } from './dto/filter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { name, sku, quantity, price } = createProductDto;

    const existingUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!existingUser) {
      throw new ConflictException('El usuario no existe.');
    }

    const existingProduct = await this.productRepository.findOne({
      where: { user: { id: user.id }, sku },
    });

    if (existingProduct) {
      throw new ConflictException('El producto ya existe.');
    }

    const product = this.productRepository.create({
      name,
      sku,
      quantity,
      price,
      user: existingUser,
    });

    return this.productRepository.save(product);
  }

  async getProductsByUser(user: User, filters: FilterDto) {
    const { name, sku, minPrice, maxPrice, page = 1, limit = 10 } = filters;

    const query = this.productRepository
      .createQueryBuilder('product')
      .where('product.userId = :userId', { userId: user.id });

    if (name) {
      query.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }

    if (sku) {
      query.andWhere('product.sku = :sku', { sku });
    }

    if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    const [products, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      products,
    };
  }
  async getAll(filters: FilterDto) {
    const { name, sku, minPrice, maxPrice, page = 1, limit = 10 } = filters;

    const query = this.productRepository.createQueryBuilder('product');

    if (name) {
      query.andWhere('product.name LIKE :name', { name: `%${name}%` });
    }

    if (sku) {
      query.andWhere('product.sku = :sku', { sku });
    }

    if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    const [products, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      products,
    };
  }
}
