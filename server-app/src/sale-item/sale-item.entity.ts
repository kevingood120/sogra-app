import { Entity, Column, ManyToOne, JoinColumn, Check } from "typeorm";
import Sale from "src/sale/sale.entity";
import Product from "src/product/product.entity";

@Entity()
@Check(`"quantity" <= "product.stock"`)
class SaleItem {

    @JoinColumn({
        name: 'idSale'
    })
    @ManyToOne(() => Sale, sale => sale.idSale, {
        primary: true,
    })
    sale?: Sale
    
    @JoinColumn({
        name:'idProduct'
    })
    @ManyToOne(() => Product, product => product.idProduct, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'NO ACTION',
        primary: true
    })
    product?: Product = null;

    @Column('int', {
        unsigned: true,
    })
    quantity: number

    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    subtotal: number

    @Column('decimal', {
        precision: 10,
        scale: 2
    })
    coatsSubtotal: number
}

export default SaleItem