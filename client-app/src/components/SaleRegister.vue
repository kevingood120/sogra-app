<template>
    <div class="modal-body ">
        <select class="form-control mb-3" v-model="sale.salesman">
            <option value="" selected disabled>Selecione um vendedor</option>
            <option value="Silvaneide">Silvaneide</option>
            <option value="Eduarda">Eduarda</option>
            <option value="Lúcia">Lúcia</option>
        </select>
        <select v-model="sale.paymentMethod" class="form-control mb-3">
            <option :value="-1" selected disabled>Selecione um método de pagamento</option>
            <option v-for="(payment, index) in payments" :key="index" :value="index">
                {{payment}}
            </option>
        </select>
        <h5>Produtos</h5>
        <form class="mb-1" @submit.prevent="addProduct">
            <div class="form-row">
                <div class="col-8">
                    <typeahead 
                        :data="productData" 
                        v-model="itemSale.product" 
                        :text-render="item => item.desc"
                        placeholder="Pesquisar um produto..."
                        :query.sync="productSearch"
                    >
                        <template #item="{ item }">
                            <span>
                                <span class="mr-2">{{`${item.desc}`}}</span>
                                <span>{{item.price | toCurrency}}</span>
                                <small class="ml-1">{{item.costPrice | toCurrency}}</small>
                            </span>
                            <span :class="stockColor(item)" class="badge badge-pill ml-3">{{item.stock}}</span>
                        </template>
                    </typeahead>
                </div>
                <div class="col-2">
                    <input v-model.number="itemSale.quantity" min="1" type="number" placeholder="Qtd" class="form-control w-100">
                </div>
                <div class="col">
                    <button class="btn btn-primary d-flex justify-content-center align-content-between">
                        <i class="material-icons md18">add</i>
                    </button>
                </div>
            </div>
        </form>
        <div class="scroll table-responsive border mb-4">
            <table class="table-sale-items table table-bordered">
                <thead>
                    <tr>
                        <th v-for="(column, index) in columns" :key="index">{{column}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in sale.items" :key="item.product.idProduct">
                        <td>{{item.product.desc}}</td>
                        <td>{{item.quantity}}</td>
                        <td>{{item.product.price | toCurrency}}</td>
                        <td>{{item.product.costPrice | toCurrency}}</td>
                        <td>{{item.subtotal | toCurrency}}</td>
                        <td>{{item.coatsSubtotal | toCurrency}}</td>
                        <td>
                            <a @click="removeProduct({... item}, index)" href="javascript:void(0)" title="Excluir">
                                <i class="material-icons md-18 text-dark">delete</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <h5>Serviços</h5>
        <form class="mb-1" @submit.prevent="addService">
            <div class="form-row">
                <div class="col-7">
                    <select v-model="itemService.service" class="form-control">
                        <option :value="null" disabled>Selecione um serviço</option>
                        <option :value="service" v-for="service in services" :key="service.idService" >{{service.desc}}</option>
                    </select>
                </div>
                <div class="col-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">R$</span>
                        </div>
                        <input v-model.number="itemService.price" type="number" placeholder="Valor" class="form-control" step="any" min="1" max="10000">
                    </div>
                    
                </div>
                <div class="col-2">
                    <button class="btn btn-primary d-flex justify-content-center align-content-between">
                        <i class="material-icons md18">add</i>
                    </button>
                </div>
            </div>
        </form>
        <div class="scroll table-responsive border mb-4">
            <table class="table-sale-items table table-bordered">
                <thead>
                    <tr>
                        <th v-for="(column, index) in ['Descrição', 'Preço', 'Ações']" :key="index">{{column}}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(service, index) in sale.services" :key="index">
                        <td>{{service.service.desc}}</td>
                        <td>{{service.price | toCurrency}}</td>
                        <td>
                            <a @click="removeService({... service}, index)" href="javascript:void(0)" title="Excluir">
                                <i class="material-icons md-18 text-dark">delete</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="input-group mb-2">
            <div class="input-group-prepend">
                <span class="input-group-text">R$</span>
            </div>
            <input type="number" step="any" min="1" max="10000" placeholder="Desconto" v-model.number="sale.discount" class="form-control">
        </div>
        <textarea class="form-control mb-2" cols="30" v-model="sale.comment" placeholder="Observações" maxlength="254" style="resize: none;white-space: pre-wrap;" rows="4"></textarea>
        <p class="text-right">
            Total: 
            {{totalDiscount | toCurrency}}
            <span v-if="sale.discount" class="text-danger">(-{{sale.discount | toCurrency}})</span>
        </p>
        <p class="text-right">Total de custos: {{sale.costsTotal | toCurrency}}</p>
        <button @click="onSubmit" class="btn btn-success mr-1">
            Contabilizar
        </button>
        <button @click="closeModal" class="btn btn-danger">
            Fechar
        </button>
    </div>
</template>

<script>

import api from '../config/api'
import Payments from '../config/Payments'
import { debounce } from 'vue-debounce'

export default {
    props: ['services'],
    computed: {
        totalDiscount() {
            const total = this.sale.total - this.sale.discount
            return total < 0 ? 0 : total
        }
    },
    data: () => ({
        columns: ['Descrição', 'Qtd','Preço' ,'Custo', 'Subtotal', 'Subcustos', 'Detalhes'],
        productSearch: '',
        payments: [ ...Payments],
        sale: {
            salesman: '',
            items: [],
            total: 0,
            costsTotal: 0,
            comment: '',
            paymentMethod: -1,
            discount: null,
            services: []
        },
        productData: [],
        itemService: {
            service: null,
            price: null
        },
        itemSale: {
            product: { },
            quantity: 1,
            coatsSubtotal: 0,
            subtotal: 0
        },
    }),
    methods: {
        removeProduct(item, index) {        
            this.sale.total -= item.subtotal
            this.sale.costsTotal -= item.coatsSubtotal
            this.sale.items.splice(index, 1)
        },
        removeService(item, index) {        
            this.sale.total -= item.price
            this.sale.services.splice(index, 1)
        },
        closeModal() {
            this.defaulForm()
            this.$emit('close')
        },
        stockColor(item) {
            return {
                'badge-danger': item.stock === 0,
                'badge-info': item.stock <=5,
                'badge-success': item.stock > 5
            }
        },
        defaulForm() {
            this.sale = {
                salesman: '',
                items: [],
                services: [],
                total: 0,
                discount: null,
                costsTotal: 0,
                comment: '',
                paymentMethod: -1
            }
            this.itemService = {
                service: null,
                price: null
            }
            this.productData = []
        },
        addService() {
            if(this.itemService.service === null)
                alert('Selecione um serviço para adicionar')
            else if(!this.itemService.price || this.itemService.price === 0)
                alert('Preço do serviço em branco inválido')
            else {
                this.sale.services.push(this.itemService)
                this.sale.total += this.itemService.price
                this.itemService = {
                    service: null,
                    price: null
                }
            }
        },
        addProduct() {
            if(this.itemSale.quantity < 1) {
                alert('Escolha a quantidade desejada do produto')
            }
            else if(!this.itemSale.product.idProduct) {
                alert('Escolha um produto')
            }
            else if(this.itemSale.product.stock < this.itemSale.quantity) {
                alert('Falta de estoque')
            }
            else {
                let ifExists = false
                this.sale.items.forEach(item => {
                    if(item.product.idProduct === this.itemSale.product.idProduct) 
                        ifExists = true
                })
                if(!ifExists){
                    this.itemSale.subtotal = this.itemSale.quantity * this.itemSale.product.price
                    this.itemSale.coatsSubtotal = this.itemSale.quantity * this.itemSale.product.costPrice
                    this.sale.total += this.itemSale.subtotal
                    this.sale.costsTotal += this.itemSale.coatsSubtotal
                    this.sale.items.push(this.itemSale)
                    this.itemSale = { 
                        quantity: 1,
                        product: {}
                    }
                }
                else {
                    alert('Item já esta presente no carrinho')
                }
            }
        },
        onSubmit() {
            if(!this.sale.discount)
                this.sale.discount = null
            if((!this.sale.items || this.sale.items.length < 1) && (!this.sale.services || this.sale.services.length < 1)) {
                alert('Carrinho sem produtos ou serviços inválido')
            }
            else if(!this.sale.salesman) {
                alert('Escolha um vendedor')
            }
            else if(this.sale.paymentMethod === -1)
                alert('Escolha um método de pagamento')
            else if((this.sale.discount || 0) >= this.sale.total)
                alert('Desconto maior que o total da compra') 
            else {
                this.sale.total -= this.sale.discount
                api.post('/sale', this.sale).then(response => {
                    alert('Venda realizada com sucesso, codigo: ' + response.data.idSale)
                }).finally(() => {
                    this.$emit('endRegister')
                    this.defaulForm()
                })
            }
        },
    },
    watch: {
        productSearch: debounce(function(){
            if(!this.productSearch || this.productSearch === this.itemSale.product.desc) return
            api.get(`/product?desc=${this.productSearch}`).then(res => {
                this.productData = res.data
            })
        }, 800),
    }
}
</script>

<style>
    .scroll {
        height: 200px;
        overflow-y: auto;
    }
</style>