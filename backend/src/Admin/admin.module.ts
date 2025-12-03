import { Module } from '@nestjs/common';
import { AdministradorService } from './admin.service';
import { AdministradorController } from './admin.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AdministradorController],
  providers: [AdministradorService, PrismaService],
})
export class AdministradorModule {}
