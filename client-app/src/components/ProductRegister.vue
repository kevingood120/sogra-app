<template>
    <form id="product-form" @submit="handleSubmit">
        <div class="form-group">
            <label for="product-desc">Descrição</label>
            <input v-model="product.desc" required type="text" class="form-control" id="product-desc">
        </div>
        <div class="form-group">
            <label for="product-stock">Estoque</label>
            <input v-model.number="product.stock" min="0" required max="10000" type="number" class="form-control" id="product-stock">
        </div>
        <div class="form-group">
            <label for="product-price">Preço</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">R$</span>
                </div>
                <input v-model.number="product.price" min="0" required step="any" type="number" class="form-control" id="product-price">
            </div>
        </div>
        <div class="form-group">
            <label for="product-costprice">Preço de custo</label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">R$</span>
                </div>
                <input v-model.number="product.costPrice" min="0" required step="any" type="number" class="form-control" id="product-costprice">
            </div>
        </div>        
        <button class="btn btn-success">Salvar</button>
        <button type="button" @click="$emit('close')" class="btn btn-danger ml-1">Fechar</button>
    </form>
</template>

<script>

export default {
    model: {
        prop: 'productProp',
        event: 'product:change'
    },
    props: {
        productProp: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        handleSubmit(ev){
            ev.preventDefault()
            if(this.product.costPrice > this.product.price) {
                alert("Valor de custo maior que valor de venda")
                return;
            }
            
            this.$emit('submit')
            this.product = { }
        }
    },
    computed: {
        product: {
            get() {
                return this.productProp
            },
            set(value) {
                this.$emit('product:change', value)
            }
        }
    }
}
</script>

<style>
    #product-form > .input-field {
        padding-bottom: 5px;
        padding-top: 5px;
    }
</style>