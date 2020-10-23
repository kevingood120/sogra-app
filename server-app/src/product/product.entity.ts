import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import IProduct from 'src/interfaces/IProduct'

@Entity()
export default class Product implements IProduct {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    idProduct?: number

    @Column('varchar')
    desc: string

    @Column('int', {
        unsigned: true
    })
    stock: number

    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    price: number

    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    costPrice: number
}
