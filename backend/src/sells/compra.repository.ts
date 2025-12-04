import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompraRepository {
  constructor(private prisma: PrismaService) {}

  async ingresosDelDia() {
    const result = await this.prisma.compra.aggregate({
      _sum: {
        total: true,
      },
      where: {
        fecha: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)), // inicio del día
          lte: new Date(new Date().setHours(23, 59, 59, 999)), // fin del día
        },
      },
    });

    return {
      ingresos_dia: result._sum.total ?? 0,
    };
  }
}
