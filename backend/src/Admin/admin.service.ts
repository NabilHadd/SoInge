import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdministradorService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdministradorCreateInput) {
    return this.prisma.administrador.create({ data });
  }
}
