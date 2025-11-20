import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductoRepository } from './producto.repository';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaService,
    ProductoRepository,
  ],
})
export class ProductModule {}
