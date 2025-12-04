import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompraRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async logCompra(body: {
    total: number;
    rut_comprador: string;
    rut_admin: string;
    detalles: { id_producto: number; cantidad: number; subtotal: number }[];
    }) {
        await this.prisma.compra.create({
            data: {
                total: body.total,
                rut_comprador: body.rut_comprador,
                rut_admin: body.rut_admin,
                detalles: {
                create: body.detalles.map(d => ({
                    id_producto: d.id_producto,
                    cantidad: d.cantidad,
                    subtotal: d.subtotal,
                })),
                },
            },
        });
    }
        
}
