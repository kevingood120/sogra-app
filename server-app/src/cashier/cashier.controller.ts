import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { CashierService } from './cashier.service';
import { Cashier } from './cashier.entity';

@Controller('cashier')
export class CashierController {
    constructor(
       private cashierService: CashierService 
    ) {}

    @Post()
    async addCashier(@Body() cashier: Cashier) {
        return await this.cashierService.addCashier(cashier)
    }

    @Get()
    async getCashiersByCreatedAt(
        @Query('startDate') startDate: Date,
        @Query('finalDate') finalDate: Date
    ) {
        return await this.cashierService.getCashiersByCreatedAt({startDate, finalDate})
    }
}
