<template>
    <div class="container app">
        <div class="mb-1 d-flex d-flex align-items-baseline justify-content-between">
            <h3 class="mb-2">Caixa</h3>
            <div class="d-flex">
                <button @click="openModalSale" class="btn btn-success mr-1 d-flex justify-content-center align-content-between">
                    <i class="material-icons mr-1">add</i>Vender
                </button>
                <button @click="openModalService" class="btn btn-success d-flex mr-1 justify-content-center align-content-between">
                    <i class="material-icons mr-1">add</i>Serviço
                </button>
                <button @click="openModalCashier" class="btn btn-success d-flex mr-1 justify-content-center align-content-between">
                    <i class="material-icons mr-1">remove</i>Dinheiro
                </button>
                <button class="btn btn-info mr-1 d-flex justify-content-center align-content-between" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <i class="material-icons mr-1">visibility</i>Estatísticas
                </button>
            </div>
        </div>
        <div class="collapse mt-2 mb-2" id="collapseExample">
            <div class="card card-body">
                <h3>Estatísticas</h3>
                <br>
                <p class="h5">Débito: {{totalCostsPaymentMethods[0] | toCurrency}}</p>
                <p class="h5">Crédito: {{totalCostsPaymentMethods[1] | toCurrency}}</p>
                <p class="h5">Dinheiro: {{totalCostsPaymentMethods[2] | toCurrency}}</p>
                <p class="h5">Descontos: {{totalDiscount | toCurrency}}</p>
                <p class="h5">Retirado: {{withdrawn[0] | toCurrency}}</p>
                <p class="h5">Adicionado: {{withdrawn[1] | toCurrency}}</p>
                <br>
                <p class="h5">Total: {{totalSales | toCurrency}}</p>
                <p class="h5">Custos totais: {{totalCostsSales | toCurrency}}</p>
            </div>
        </div>
        <div class="row align-items-end">
            <div class="col-5">
                <div class="form-group">
                    <label>Data inicial</label>
                    <input class="form-control" v-model="searchDates.start" type="date">
                </div>
            </div>
            <div class="col-5 pl-0">
                <div class="form-group">
                    <label>Data final</label>
                    <input class="form-control" v-model="searchDates.final" type="date">
                </div>
            </div>
            <div class="col-2 pl-2">
                 <button @click="searchSales" class="btn btn-primary mb-3 d-flex justify-content-center align-content-between">
                    <i class="material-icons md18">search</i>
                </button>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th v-for="(column, index) in columns" :key="index">{{column}}</th>
                    </tr>
                </thead>
                <tbody v-if="rows.length">
                    <tr v-for="row in rows" :key="row.idSale">
                        <td>{{row.idSale}}</td>
                        <td>{{row.salesman}}</td>
                        <td>{{row.createdAt | toDate}}</td>
                        <td>{{row.total | toCurrency}}</td>
                        <td>{{row.costsTotal | toCurrency}}</td>
                        <td>{{(row.discount || 0) | toCurrency}}</td>
                        <td>{{row.paymentMethod | toPayment}}</td>
                        <td>
                            <a @click="openModalViewSale(row)" href="javascript:void(0)" title="Detalhes">
                                <i class="material-icons md-18 text-dark">visibility</i>
                            </a>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td class="text-center" :colspan="columns.length">Não há linhas para serem exibidas</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <cashier-table :items="cashiers"/>
        <div id="modal-sale" role="dialog" class="modal fade">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Vender</h4>
                    </div>
                    <SaleRegister :services="services" @endRegister="endRegister"  @close="closeModalSale"/> 
                </div>
            </div>
        </div>
        <div id="modal-cashier" role="dialog" class="modal fade">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Adicionar ou remover dinheiro</h4>
                    </div>
                    <CashierRegister @endRegister="endRegister" @close="closeModalCashier"/>
                </div>
            </div>
        </div>
        <div id="modal-service" role="dialog" class="modal fade">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Adicionar serviço</h4>
                    </div>
                    <ServiceRegister @close="closeModalService"/>
                </div>
            </div>
        </div>
        <div id="modal-view-sale" role="dialog" class="modal fade">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Detalhes da venda</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <SaleView :sale="saleSelected"/>
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>
import api from '../config/api'
import SaleRegister from '../components/SaleRegister'
import ServiceRegister from '../components/ServiceRegister'
import SaleView from '../components/SaleView'
import CashierRegister from '../components/CashierRegister'
import jQuery from 'jquery'
import CashierTable from '../components/CashierTable'

export default {
    components: {
        SaleRegister,
        SaleView,
        ServiceRegister,
        CashierRegister,
        CashierTable
    },
    data: () => ({
        columns: ['#', 'Vendedor','Data', 'Total', 'Custos','Desconto', "Método de Pagamento" , 'Ações'],
        rows: [],
        services: [],
        saleSelected: { },
        searchDates: {
            start: '',
            final: ''
        },
        cashiers: []
    }),
    methods: {
        openModalService() {
            jQuery('#modal-service').modal({
                keyboard: false,
                focus: true,
                show: true,
                backdrop: 'static'
            })
        },
        closeModalService() {
            jQuery('#modal-service').modal('hide')
        },
        closeModalCashier() {
            jQuery('#modal-cashier').modal('hide')
        },
        openModalCashier() {
            jQuery('#modal-cashier').modal({
                keyboard: false,
                focus: true,
                show: true,
                backdrop: 'static'
            })
        },
        searchSales() {
            const { start, final } = this.searchDates

            const startDate = new Date(start)
            const finalDate = new Date(final)

            const queryFinalData = isNaN(finalDate) ? null : `&finalDate=${finalDate.toJSON()}`

            if(isNaN(startDate))
                alert('Preencha a data inicial')
            else
                api.get(`/sale?startDate=${startDate.toJSON()}${queryFinalData}`).then(response => {
                    this.rows = response.data
                }).finally(() => {
                    api.get(`/cashier?startDate=${startDate.toJSON()}${queryFinalData}`).then(response => {
                        this.cashiers = response.data
                    })
                })
        },
        searchSalesByNow() {
            const now = new Date().toJSON()
            api.get(`/sale?startDate=${now}`).then(response => {
                this.rows = response.data
            }).finally(() => {
                api.get(`/cashier?startDate=${now}`).then(response => {
                    this.cashiers = response.data
                })
            })
        },
        closeModalSale() {
            jQuery('#modal-sale').modal('hide')
        },
        endRegister() {
            this.searchSalesByNow()
        },
        openModalSale() {

            api.get('/service').then(response => {
                this.services = response.data
                jQuery('#modal-sale').modal({
                    keyboard: false,
                    focus: true,
                    show: true,
                    backdrop: 'static'
                })
            })
        },
        openModalViewSale(sale) {
            api.get(`/sale/${sale.idSale}`).then((response) => {
                this.saleSelected = response.data[0]
            }).finally(() => {
                jQuery('#modal-view-sale').modal({
                    focus: true,
                    show: true,
                    backdrop: 'static'
                })
            })
        },
    },
    mounted() {
        this.searchSalesByNow()
    },
    computed: {
        totalSales() {
            let total =  this.rows.reduce((prev, cur) => {
                return cur.total + prev
            }, 0)

            this.cashiers.forEach(item => {
                if(item.withdraw.data[0])
                    total -= item.value
                else
                    total += item.value
            })

            return total
        },
        totalDiscount() {
            return this.rows.reduce((prev, cur) => {
                return (cur.discount || 0) + prev
            }, 0)
        },
        totalCostsSales() {
            return this.rows.reduce((prev, cur) => {
                return cur.costsTotal + prev
            }, 0)
        },
        totalCostsPaymentMethods() {
            const payments = [0,0,0]

            this.rows.forEach(item => {
                const payment = Number(item.paymentMethod)
                payments[payment] += item.total
            })

            return payments
        },
        withdrawn() {
            const withdraws = [0,0]
            this.cashiers.forEach(item => {
                if(item.withdraw.data[0])
                    withdraws[0] += item.value
                else
                    withdraws[1] += item.value
            })
            return withdraws
        }
    }
}
</script>