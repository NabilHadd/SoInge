import { Injectable } from '@nestjs/common';
import { CompraRepository } from './compra.repository';

@Injectable()
export class CompraService {

  constructor(private readonly compraRepository: CompraRepository) {}

  async logCompra(body: {
    total: number;
    rut_comprador: string;
    rut_admin: string;
    detalles: { id_producto: number; cantidad: number; subtotal: number }[];
  }) {
    return this.compraRepository.logCompra(body);
  }
}
