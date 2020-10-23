import { Injectable } from '@nestjs/common';
import { Cashier } from './cashier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CashierService {

    constructor(
        @InjectRepository(Cashier)
        private readonly cashierRepo: Repository<Cashier>
    ) {}

    async addCashier(cashier: Cashier) {
        return await this.cashierRepo.save(cashier);
    }

    async getCashiersByCreatedAt({startDate, finalDate}: any) {
        const query = this.cashierRepo.createQueryBuilder('s')
            
        if(finalDate && startDate)
            query.where(
                'CONVERT(s.createdAt, DATE) BETWEEN CONVERT(:startDate, DATE) AND CONVERT(:finalDate, DATE)', 
                { startDate, finalDate })
        else 
            query.where(
                'CONVERT(s.createdAt, DATE) = CONVERT(:startDate, DATE)', 
                { startDate })

        return await query.getMany()
    }
}
