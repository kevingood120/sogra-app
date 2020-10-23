<template>
    <div>
        <h3>Entradas e saída do caixa</h3>
        <div class="table-responsive">
            <table class="table table-hovered table-bordered">
                <thead>
                    <tr>
                        <th v-for="(column, index) in columns" :key="index">{{column}}</th>
                    </tr>
                </thead>
                <tbody v-if="items && items.length">
                    <tr v-for="item in items" :key="item.idCashier">
                        <td>{{item.idCashier}}</td>
                        <td>{{item.reason}}</td>
                        <td>{{item.value | toCurrency}}</td>
                        <td>{{item.withdraw.data[0] ? 'Sim' : 'Não'}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td style="text-align: center" :colspan="columns.length">
                            Não há linhas para serem exibidas
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CashierTable',
    props: ['items'],
    data: () => ({
        columns: ['#', "Razão", "Valor", "Retirado?"]
    })
}
</script>

<style>

</style>