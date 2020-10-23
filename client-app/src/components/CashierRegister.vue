<template>
    <div class="modal-body">
        <form @submit.prevent="addCashier">
            <div class="form-group">
                <label>Razão</label>
                <input type="text" required v-model="cashier.reason" class="form-control">
            </div>
            <div class="form-group">
                <label>Valor</label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">R$</span>
                    </div>
                    <input v-model="cashier.value" min="0" required step="any" type="number" class="form-control" id="product-price">
                </div>
            </div>
            <div class="form-group form-check">
                <input v-model.number="cashier.withdraw" class="form-check-input" type="checkbox" id="chkWithdraw">
                <label class="form-check-label" for="chkWithdraw">
                    Subtrair do caixa?
                </label>
            </div>
            <button class="btn btn-success">Salvar</button>
            <button type="button" @click="$emit('close')" class="btn btn-danger ml-2">Fechar</button>
        </form>
    </div>
</template>

<script>
import api from '../config/api'

export default {
    name: 'CashierRegister',
    data: () => ({
        cashier: { }
    }),
    methods: {
        addCashier() {
            if(!this.cashier.reason || !this.cashier.value) {
                alert('Verifique os valores de entrada')
            }
            else {
                api.post('/cashier', this.cashier).then(response => {
                    this.cashier = { }
                    this.$emit('endRegister', response.data)
                })
            }
        }
    }
}
</script>

<style>

</style>