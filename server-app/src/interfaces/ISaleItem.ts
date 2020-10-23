import ISale from "./ISale";
import IProduct from "./IProduct";

export default interface ISaleItem {
    sale?: ISale
    product: IProduct
    quantity: number
    subtotal: number
    coatsSubtotal: number
}