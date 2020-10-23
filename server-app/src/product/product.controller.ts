import { Controller, Get, Query, Post, Body, Put, Param } from '@nestjs/common';
import IProduct from 'src/interfaces/IProduct';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Get()
    async getProductsByDesc(@Query('desc') desc: string) {
        if(!desc) return []
        return await this.productService.getProductsByDesc(desc)
    }

    @Post()
    async addProduct(@Body() product: IProduct) {
        return await this.productService.addProduct(product)
    }

    @Put(':idProduct')
    async updateProduct(
        @Body() product: IProduct, 
        @Param('idProduct') idProduct: number) {
            return await this.productService.updateProduct(idProduct, product)
    }
}
