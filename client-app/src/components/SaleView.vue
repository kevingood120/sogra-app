<template>
    <div class="modal-body">
        <p class="text-primary">{{sale.createdAt | toDateInFull}}</p>
        <p>Vendedor(a): {{sale.salesman}}</p>
        <p>Método de pagamento: {{sale.paymentMethod | toPayment}}</p>
        <div v-if="sale.items && sale.items.length > 0 && sale.items[0].product" class="mb-2">
            <h5>Produtos</h5>
            <div class="table-responsive">
                <table class="table-sale-items table table-bordered">
                    <thead>
                        <tr>
                            <th v-for="(column, index) in columns" :key="index">{{column}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in sale.items" :key="item.product.idProduct">
                            <td>{{item.product.desc}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{item.product.price | toCurrency}}</td>
                            <td>{{item.subtotal | toCurrency}}</td>
                            <td>{{item.coatsSubtotal | toCurrency}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="sale.services && sale.services.length > 0 && sale.services[0].service">
            <h5>Serviços</h5>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th v-for="(column, index) in ['Descrição', 'Preço']" :key="index">{{column}}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(service) in sale.services" :key="service.idService">
                            <td>{{service.service.desc}}</td>
                            <td>{{service.price | toCurrency}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <strong v-if="sale.comment">Observações</strong>
        <p class="text-wrap text-justify">{{sale.comment}}</p>
        <p class="text-right">
            Total: 
            {{sale.total | toCurrency}}
            <span v-if="sale.discount" class="text-danger">(-{{sale.discount | toCurrency}})</span>
        </p>
        <p class="text-right">Total de custos: {{sale.costsTotal | toCurrency}}</p>
    </div>
</template>

<script>
export default {
    props: {
        sale: {
            type: Object,
            required: true,
            default: () => { }
        }
    },
    data: () => ({
        columns: ['Descrição', 'Quantidade', 'Preço', 'Subtotal', 'Subcustos'],
    })
}
</script>

<style>

</style>