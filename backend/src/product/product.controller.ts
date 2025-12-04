import { Controller, Get, Post, Body, Query, Param} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Get('/byId/:id_producto')
  async getProductById(@Param('id_producto') id: string) {
    return this.productService.getById(Number(id));
  }

  @Get('all')
  async getAllProducts() {
    return this.productService.getAll();
  }

  @Get('validate-stock')
  async validateStock(@Query('id_producto') id_producto: string, @Query('push_stock') push_stock: string) {
    return this.productService.validateStock(Number(id_producto), Number(push_stock));
  }


  @Get('count')
  async getCount() {
    return {
      count: await this.productService.getProductNum(),
    };
  }
  @Post('create')
  async createProduct(@Body() body) {
    return this.productService.createProduct(body);
  }

  
  @Post('review')
  async addReviewProducto(@Body() body) {
    
    return this.productService.addReview(body);
  }


  @Post('stock-reduce')
  async stockReduce(@Body() body) {
    const id_producto = body.id_producto;
    const stock_redux = body.stock_redux;
    return this.productService.reduceStock(id_producto, stock_redux);
  }


}
