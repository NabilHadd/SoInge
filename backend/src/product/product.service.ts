import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {

    constructor(
        private readonly prisma: PrismaService
    ) {}

async getAll() {
  //cambiar el nombre de reseñas a reviews por el tema de la ñ
  const productos = await this.prisma.producto.findMany({
    include: {
      reseñas: true
    },
  });

  return productos.map((p) => ({
    id_producto: p.id_producto,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precio,
    stock: p.stock,
    imagen: Buffer.from(p.imagen).toString("base64"),
    reviews: p.reseñas
  }));
}

}
