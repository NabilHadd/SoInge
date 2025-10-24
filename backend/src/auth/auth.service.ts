import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
  ) {}

  // Función de prueba para validar la conexión con la DB
  async validateUser() {
    try {
      const users = await this.usersService.getUsers(); // asume que getUsers() existe
      console.log('Usuarios desde la DB:', users);
      return users;
    } catch (error) {
      console.error('Error al conectar con la DB:', error);
      throw error;
    }
  }
}
