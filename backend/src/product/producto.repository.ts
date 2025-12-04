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
            this.prisma.producto.update({
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

    

}
