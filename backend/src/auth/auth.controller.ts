import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // <--- ruta base
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('test-db') // <--- endpoint exacto
  async testDB() {
    this.authService.createUser()
    return this.authService.validateUser();
  }
}