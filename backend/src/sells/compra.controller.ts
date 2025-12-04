import { Controller, Get } from '@nestjs/common';
import { CompraService } from './compra.service';

@Controller('compras')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Get('ingresos-dia')
  ingresosDia() {
    return this.compraService.obtenerIngresosDelDia();
  }
}
