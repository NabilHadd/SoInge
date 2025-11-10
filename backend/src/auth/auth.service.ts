import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService
  ) {}


  //función para registrar un admin
  async register(rut_admin: string, nombre: string, email: string, contraseña: string) {
    const hash = await bcrypt.hash(contraseña, 10);
    return this.prisma.administrador.create({
      data: { rut_admin, nombre, email, contraseña: hash },
    });
  }


  //función para logear un admin.
  async login(rut_admin: string, contraseña: string) {

    const admin = await this.prisma.administrador.findUnique({
       where: {
         rut_admin,
        },
      });

    if (!admin) throw new UnauthorizedException('Usuario no encontrado');

    const valido = await bcrypt.compare(contraseña, admin.contraseña);
    if (!valido) throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { rut: admin.rut_admin,
      nombre: admin.nombre,
      email: admin.email 
    };

    const token = this.jwt.sign(payload);

    return {
      success: true,
      token, 
      admin: {
              rut: admin.rut_admin,
              nombre: admin.nombre,
              email: admin.email 
        } };
  }
}

