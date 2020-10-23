<template>
  <ContainerApp>
    <Header>Material de Construção</Header>
    <router-view />
  </ContainerApp>
</template>

<script>
import ContainerApp from './components/ContainerApp'
import Header from './components/Header'
export default {
  components: {
    ContainerApp,
    Header
  }
}
</script>


<style>

* {
  white-space: nowrap;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-clear-button{
    display: none;
    -webkit-appearance: none;
}

.material-icons.md-18 {
  font-size: 18px;
}

.container.app {
  padding: 15px 10px;
}

.modal-body {
  word-wrap: break-word;
}

</style>

