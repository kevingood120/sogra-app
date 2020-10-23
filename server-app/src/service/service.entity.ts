import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export default class Service {
    @PrimaryGeneratedColumn({unsigned: true})
    idService: number

    @Column('varchar',{length: 200})
    desc: string
}