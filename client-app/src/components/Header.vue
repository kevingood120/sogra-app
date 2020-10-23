<template>
    <nav class="navbar navbar-expand-lg navbar-dark orange">
        <div class="container">
            <a class="navbar-brand" href="#"><strong>ARAÚJO</strong> <small style="text-transform: uppercase">material de construção</small></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-expanded="false" aria-label="Alterna navegação">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">

                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-item nav-link" exact-active-class="active" to="/products">Produtos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-item nav-link" exact-active-class="active" to="/sales">Vendas</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['title']
}
</script>

<style>
    .orange {
        background-color: #ff4500;
    }
</style>