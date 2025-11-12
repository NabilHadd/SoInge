import { Controller, Get, Post, Body} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async getAllProducts() {
    return this.productService.getAll();
  }

  @Post('review')
  async addReviewProducto(@Body() body) {
    console.log(body)
    return this.productService.addReview(body);
  }

}
