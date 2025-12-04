import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductoRepository {
    constructor(
        private readonly prisma: PrismaService
    ){}


    async getAllProducts(){
        const products = await this.prisma.producto.findMany({
            include: {
            reseñas: true
            },
        }); 

        return products ? products : []
    }
    async postProduct(data) {
    try {
        const nuevo = await this.prisma.producto.create({
        data: data
        });
        return nuevo; // devuelve el producto creado
    } catch (error) {
        throw new Error(error);
    }
    }


    async postReview(data){
        try {
            await this.prisma.reseñaProducto.create({
            data: data
            });
        } catch (error) {
            throw new Error(error);
        }
    }


    async getStock(id_producto: number){
        const product = await this.prisma.producto.findUniqueOrThrow({
            where:{
                id_producto: id_producto,
            }
        })

        return product.stock;
    }

    
    async getProduct(id_producto: number){
        return await this.prisma.producto.findUnique({
            where:{
                id_producto: id_producto,
            },
        });
    }



    async updateStock(id_producto: number, push_stock: number){
        try {
            await this.prisma.producto.update({
                where: {
                    id_producto: id_producto,
                },
                data: {
                    stock: push_stock,
                },
            });
        } catch (error) {
            throw new Error(error)
        }
    }


    async countProducts(){
        return this.prisma.producto.count();
    } 

    async finProductById(id: number){
        const product = await this.prisma.producto.findUnique({
            where: {
                id_producto: id,
            },
            include: {
                reseñas: true,
            },
        });

        if (!product) throw new Error("");
        
        return product
    }

    async updateProduct(data){
        const updateData: any = {}; 
        if (data.nombre !== undefined) updateData.nombre = data.nombre;
        if (data.descripcion !== undefined) updateData.descripcion = data.descripcion;
        if (data.precio !== undefined) updateData.precio = data.precio;
        if (data.stock !== undefined) updateData.stock = data.stock;
        if (data.imagen !== undefined) updateData.imagen = data.imagen;
        try {
            await this.prisma.producto.update({
                where: {
                    id_producto: data.id_producto,
                },
                data: updateData,
            });
        } catch (error) {
            throw new Error(error)
        } 
    }

    async logStock(
        body: {
            id_producto: number,
            variacion: number,
            descripcion: string
        })
    {
        try {
            await this.prisma.historialStock.create({
            data: body,
        });
        } catch (error) {
            throw new Error(error);
            
        }
    }

    async deleteProduct(id_producto: number){
        try {
            await this.prisma.producto.delete({
                where: {
                    id_producto: id_producto,
                },
            });
        } catch (error) {
            throw new Error(error)
        }
    }
    

}
