import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SaleModule } from './sale/sale.module';
import { ServiceModule } from './service/service.module';
import { CashierModule } from './cashier/cashier.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    
  }), ProductModule, SaleModule, ServiceModule, CashierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(
    private readonly connection: Connection
  ) {}
}
