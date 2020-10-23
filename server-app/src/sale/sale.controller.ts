import { Controller, Get, Body, Post, Param, Query } from '@nestjs/common';
import { SaleService } from './sale.service';
import ISale from 'src/interfaces/ISale';

@Controller('sale')
export class SaleController {

    constructor(
        readonly saleService: SaleService
    ) {}

    @Post()
    async addSale(@Body() sale: ISale) {
        sale.items.forEach(item => {
            item.product.stock -= item.quantity
        })
        return await this.saleService.addSale(sale)
    }

    @Get('/total')
    async getTotal() {
        return await this.saleService.totalMoneyNow()
    }

    @Get(':idSale')
    async getSaleById(@Param('idSale') idSale: number) {
        return await this.saleService.getSaleById(idSale)
    }

    @Get()
    async getSales(
        @Query('startDate') startDate: Date,
        @Query('finalDate') finalDate: Date
        ) {
            return await this.saleService.getSalesByCreatedAt({startDate, finalDate})
    }
}
