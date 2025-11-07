import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}


  async getUsers(){
    const data = await this.prismaService.administrador.findUnique({
      where: {
        rut_admin: '214277603'
      }
    });
    return data
  }

  async addUser(user: { rut_admin: string; nombre: string; email: string; contraseña: string;}) {
    try {
      await this.prismaService.administrador.create({
      data:user
    });}
    catch (error) {
      throw new Error(error.message)
    }
  }
}