import { Injectable } from '@nestjs/common';
import { ProductoRepository } from './producto.repository';
import { BadRequestException } from '@nestjs/common';

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



//metodo para reducir stock por compra.
async reduceStock(id_producto: number, stock_redux: number){
  const pull_stock = await this.repo.getStock(id_producto);
  const product = await this.getById(id_producto);
  const new_stock = pull_stock - stock_redux;
  if (new_stock < 0) throw new BadRequestException(`No se realizo la compra, no hay suficientes: ${product.nombre}`);

  await this.repo.updateStock(id_producto, new_stock);
}

//metodo para actualizar stock (algo mas administrativo)
async updateStock(id_producto: number, push_stock: number){
  await this.repo.updateStock(id_producto, push_stock);
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

async updateProduct(data: { id_producto: number, nombre?: string, descripcion?: string, precio?: number, stock?: number, imagen?: string}) {
    let imagenBuffer: Buffer | undefined = undefined;   
    if (data.imagen) {
      imagenBuffer = Buffer.from(data.imagen, 'base64'); 
    }
    await this.repo.updateProduct({
      id_producto: data.id_producto,
      nombre: data.nombre,
      descripcion: data.descripcion,
      precio: data.precio,
      stock: data.stock,
      imagen: imagenBuffer
    });
  }
  async deleteProduct(id_producto: number) {
    await this.repo.deleteProduct(id_producto);
  }

}
