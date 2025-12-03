import { Controller, Post, Body } from '@nestjs/common';
import { AdministradorService } from './admin.service';
import { Prisma } from '@prisma/client';

@Controller('administradores')
export class AdministradorController {
  constructor(private readonly adminService: AdministradorService) {}

  @Post('register')
  create(@Body() data: Prisma.AdministradorCreateInput) {
    console.log('📥 Datos recibidos:', data);
    return this.adminService.create(data);
  }
}
