import { Controller, Post, Body } from '@nestjs/common';
import { CompraService } from './compra.service';

@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post('log')
  async logCompra(
    @Body()
    body: {
      total: number;
      rut_comprador: string;
      rut_admin: string;
      detalles: { id_producto: number; cantidad: number; subtotal: number }[];
    },
  ) {
    return this.compraService.logCompra(body);
  }

  @Get('ingresos-dia')
  async ingresosDia() {
    const monto = await this.compraService.obtenerIngresosDelDia();
    return { ingresos_dia: monto };
  }
  @Get('detalles')
  async obtenerComprasConDetalles() {
    return this.compraService.obtenerComprasConDetalles();
  }
}
