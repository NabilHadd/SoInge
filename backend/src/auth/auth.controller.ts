import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() body: any) {

    const rut = body.rut_admin
    const nombre = body.nombre
    const email = body.email
    const contraseña = body.contraseña

    return this.auth.register(rut, nombre, email, contraseña);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.auth.login(body.rutAdmin, body.password);
  }
}
