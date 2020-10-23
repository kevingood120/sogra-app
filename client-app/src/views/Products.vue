<template>
    <div class="container app">
        <div class="mb-1 d-flex d-flex align-items-baseline justify-content-between">
            <h3 class="mb-2">Produtos</h3>
            <button @click="openModalProduct" class="btn btn-primary d-flex justify-content-center align-content-between">
                <i class="material-icons mr-1">add</i>Adicionar
            </button>
        </div>
        <input @keypress.enter="changeSearchText" type="text" placeholder="Pesquisar por descrição" class="form-control mb-1" id="search-desc">
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th v-for="(column, index) in columns" :key="index">{{column}}</th>
                    </tr>
                </thead>
                <tbody v-if="rows.length">
                    <tr v-for="row in rows" :key="row.idProduct">
                        <td>{{row.idProduct}}</td>
                        <td>{{row.desc}}</td>
                        <td>{{row.stock}}</td>
                        <td>{{row.price | toCurrency}}</td>
                        <td>{{row.costPrice | toCurrency}}</td>
                        <td>
                            <a class="table-edit" title="Editar" href="javascript:void(0)">
                                <i @click="() => editProduct({...row})" class="material-icons md-18 text-dark">edit</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6" class="text-center">Não há linhas para serem exibidas</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="modal-product" role="dialog" class="modal fade">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Registrar produto</h5>
                    </div>
                    <div class="modal-body">
                        <ProductRegister @submit="handleSubmit" v-model="product" @close="closeModal"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import ProductRegister from '../components/ProductRegister.vue'
import api from '../config/api'
import jQuery from 'jquery'

export default {
    components: {
        ProductRegister
    },
    data: () => ({
        columns: ['#','Descrição', 'Estoque', 'Preço', 'Preço de custo', 'Ações'],
        rows: [],
        product: { }
    }),
    methods: {
        handleSubmit() {
            const url = `/product/${this.product.idProduct || ''}`
            api[this.product.idProduct ? 'put' : 'post'](url, this.product).then(response => {
                this.rows = [response.data]

            }).finally(() => this.product = { })
        },
        getProducts(searchText) {
            if(!searchText) return
            api.get(`product?desc=${searchText}`).then(response => {
                this.rows = response.data
            })
        },
        changeSearchText(ev) {
            const searchText = ev.target.value
            this.getProducts(searchText)
        },
        editProduct(product) {
            this.product = product
            this.openModalProduct()
        },
        closeModal() {
            jQuery('#modal-product').modal('hide')
            this.product = { }
        },
        openModalProduct() {
            jQuery('#modal-product').modal({
                keyboard: false,
                focus: true,
                show: true,
                backdrop: 'static'
            })
        }
    },
    mounted() {
        this.getProducts()
    }
}
</script>

<style>
</style>