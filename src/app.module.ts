import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
dotenv.config();
console.log({"DB_HOST: ": process.env.DB_HOST,
"DB_USER: ":process.env.DB_USER,
"DB_PASS: ":process.env.DB_PASS,
"DB_NAME: ":process.env.DB_NAME
});
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USER || 'nestuser',
      password: process.env.DB_PASS || 'nestpassword',
      database: process.env.DB_NAME || 'nestdb',
      entities: [User, Product],
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
