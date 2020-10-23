<template>
    <div class="modal-body">
        <form @submit.prevent="addService">
            <div class="form-group">
                <label>Descrição</label>
                <input type="text" v-model="desc" class="form-control">
            </div>
            <button class="btn btn-success">Salvar</button>
            <button type="button" @click="close" class="btn btn-danger ml-2">Fechar</button>
        </form>
    </div>
</template>

<script>
import api from '../config/api'
export default {
    name: "ServiceRegister",
    data: () => ({
        desc: ''
    }),
    methods: {
        close() {
            this.desc = ''
            this.$emit('close')
        },
        addService() {
            if(!this.desc)
                alert('Descrição em branco inválido')
            else
                api.post('/service', { desc: this.desc }).then(resolve => {
                    this.desc = ''
                    alert('Serviço adicionado com sucesso, código: ' + resolve.data.idService)
                })
        }
    }
}
</script>

<style>

</style>