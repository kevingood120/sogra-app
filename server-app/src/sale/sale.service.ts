import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Sale from './sale.entity';

interface SearchDates {
    startDate: Date
    finalDate: Date
}

@Injectable()
export class SaleService {
    constructor(
        @InjectRepository(Sale)
        private saleRepo: Repository<Sale>,
    ) {}

    async addSale(sale: Sale) {
        
        const newSale = await this.saleRepo.save(sale, {
            transaction: true
        })

        return newSale
    }

    async totalMoneyNow() {
        const items =  await this.saleRepo.createQueryBuilder('s')
                        .select(['s.total'])
                        .where('CONVERT(s.createdAt, DATE) = CONVERT(:startDate, DATE)', { startDate: new Date() })
                        .getMany()

        return items.reduce((prev, cur) => {
            return prev + cur.total
        }, 0)
    }

    async getSalesByCreatedAt({finalDate, startDate}: SearchDates) {
        const query = this.saleRepo.createQueryBuilder('s')
            .select(['s.salesman', 's.createdAt', 's.total', 's.costsTotal', 's.comment', 's.paymentMethod', 's.idSale', 's.discount'])
            
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

    async getSaleById(idSale: number) {
        return await this.saleRepo.find({
            relations: ['items', 'items.product', 'services', 'services.service'],
            where: {
                idSale
            }
        })
    }
}
