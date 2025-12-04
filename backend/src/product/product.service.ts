import { Injectable } from '@nestjs/common';
import { ProductoRepository } from './producto.repository';

@Injectable()
export class ProductService {

    constructor(
        private readonly repo: ProductoRepository
    ) {}



 async getProductNum(){
    return this.repo.countProducts();
  }



async getAll() {
  //cambiar el nombre de reseñas a reviews por el tema de la ñ
  const productos = await this.repo.getAllProducts();

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
async createProduct(data: { nombre: string, descripcion: string, precio: number, stock: number, imagen: string}) {
  const imagenBuffer = Buffer.from(data.imagen, 'base64'); 
  await this.repo.postProduct({
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: data.precio,
    stock: data.stock,
    imagen: imagenBuffer
  });
}

async addReview(
  data: { 
  id_producto: number,
  valoracion: number,
  descripcion: string})
  {
    await this.repo.postReview(data)

}


async validateStock(id_producto: number, push_stock: number){
  const pull_stock = await this.repo.getStock(id_producto);
  const product = await this.repo.getProduct(id_producto);
  return {product: product, validation:(push_stock <= pull_stock)};

}


async reduceStock(id_producto: number, stock_redux: number){
  const pull_stock = await this.repo.getStock(id_producto);
  const new_stock = pull_stock - stock_redux;
  if (new_stock < 0) throw new Error('no se puede almacenar stock negativo');

  await this.repo.updateStock(id_producto, new_stock);
}

async getById(id: number){
  const p = await this.repo.finProductById(id);
  
  return {
    id_producto: p.id_producto,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precio,
    stock: p.stock,
    imagen: Buffer.from(p.imagen).toString("base64"),
    reviews: p.reseñas
  }
}

}
