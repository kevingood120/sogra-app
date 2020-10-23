import { Entity, JoinColumn, ManyToOne, Column, PrimaryGeneratedColumn } from "typeorm";
import Sale from "src/sale/sale.entity";
import Service from "src/service/service.entity";

@Entity()
export default class ServiceItem {
    @PrimaryGeneratedColumn({ unsigned: true })
    idServiceItem: number

    @JoinColumn({
        name: 'idSale'
    })
    @ManyToOne(() => Sale, sale => sale.idSale)
    sale?: Sale

    @JoinColumn({
        name:'idService'
    })
    @ManyToOne(() => Service, service => service.idService, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION'
    })
    service?: Service = null;

    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    price: number
}