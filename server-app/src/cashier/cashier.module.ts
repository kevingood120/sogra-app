import { Module } from '@nestjs/common';
import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashier } from './cashier.entity';

@Module({
  controllers: [CashierController],
  providers: [CashierService],
  imports: [TypeOrmModule.forFeature([Cashier])]
})
export class CashierModule {}
