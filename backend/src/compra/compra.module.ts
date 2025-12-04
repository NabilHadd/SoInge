import { Module } from '@nestjs/common';
import { CompraService } from './compra.service';
import { CompraController } from './compra.controller';
import { CompraRepository } from './compra.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompraController],
  providers: [
    CompraService,
    CompraRepository,
    PrismaService, // necesario
  ],
})
export class CompraModule {}
