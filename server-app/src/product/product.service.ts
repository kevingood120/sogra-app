import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import Product from './product.entity';
import IProduct from 'src/interfaces/IProduct';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>
    ) {}

    async getProductsByDesc(desc: string) {
        return await this.productRepo.find({
            where: {
                desc: Like(`%${desc}%`)
            },
            take: 20
        })
    }

    async addProduct(product: IProduct) {
        return await this.productRepo.save(product)
    }

    async updateProduct(idProduct: number, product: IProduct) {
        await this.productRepo.update(idProduct, product)
        return await this.productRepo.findOne(idProduct)
    }
}
