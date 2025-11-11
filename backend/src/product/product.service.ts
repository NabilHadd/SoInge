import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {

    constructor(
        private readonly prisma: PrismaService
    ) {}

async getAll() {
  const productos = await this.prisma.producto.findMany();

  return productos.map((p) => ({
    id_producto: p.id_producto,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precio,
    stock: p.stock,
    imagen: Buffer.from(p.imagen).toString("base64"),
  }));
}

}
