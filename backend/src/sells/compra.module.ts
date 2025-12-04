import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompraRepository } from './compra.repository';

@Module({
  controllers: [CompraController],
  providers: [
    CompraService,
    PrismaService,
    CompraRepository,
  ],
})
export class ProductModule {}