import { Injectable } from '@nestjs/common';
import { CompraRepository } from './compra.repository';

@Injectable()
export class CompraService {
  constructor(private compraRepo: CompraRepository) {}

  async obtenerIngresosDelDia() {
    return this.compraRepo.ingresosDelDia();
  }
}
