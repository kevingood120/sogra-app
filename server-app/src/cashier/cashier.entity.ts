import { CreateDateColumn, PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Cashier {

    @PrimaryGeneratedColumn({ unsigned: true })
    idCashier: number

    @CreateDateColumn({ insert: true })
    createdAt: Date

    @Column('varchar', { length: 200 })
    reason: string

    @Column('decimal', { scale: 2, precision: 10 })
    value: number

    @Column('bit', {
        default: false
    })
    withdraw: boolean
}