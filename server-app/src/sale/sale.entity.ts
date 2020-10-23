import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from "typeorm";
import SaleItem from "src/sale-item/sale-item.entity";
import ServiceItem from "src/service-item/service-item.entity";

@Entity()
class Sale {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    idSale?: number

    @CreateDateColumn({
        type: "datetime"
    })
    readonly createdAt?: Date

    @Column('varchar')
    salesman: string

    @Column('decimal', {
        scale: 2,
        precision: 10
    })
    total: number

    @Column('decimal', {
        scale: 2,
        precision: 10
    })
    costsTotal: number

    @Column('tinyint', {
        unsigned: true
    })
    paymentMethod: number

    @Column('varchar')
    comment: string

    @Column('decimal', {
        scale: 2,
        precision: 10,
        default: null
    })
    discount?: number

    @OneToMany(() => SaleItem, saleItem => saleItem.sale, { 
        cascade: true,
    })
    items: SaleItem[]  

    @OneToMany(() => ServiceItem, serviceItem => serviceItem.sale, { 
        cascade: true,
    })
    services: ServiceItem[] 
}

export default Sale