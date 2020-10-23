import ISaleItem from './ISaleItem'
import ServiceItem from 'src/service-item/service-item.entity'

export default class ISale {
    idSale?: number
    readonly createdAt?: Date
    salesman: string
    total: number
    costsTotal: number
    comment: string
    items: ISaleItem[]
    services: ServiceItem[]
    paymentMethod: number
}