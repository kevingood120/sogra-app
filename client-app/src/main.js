import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'material-design-icons/iconfont/material-icons.css'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import Payments from './config/Payments'
import Typeahead from './components/Typeahead.vue'
 
// Global registration
Vue.component('typeahead', Typeahead)
 
Vue.filter('toCurrency', function (value) {
  if (typeof value !== "number") {
      return value;
  }

  if (!value) value = 0
  
  var formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
  });
  return formatter.format(value);
});

Vue.filter('toPayment', function (value) {
  if (typeof value !== "number") {
      return value;
  }

  return Payments[value]
});


Vue.filter('toDate', (value) => {
  return moment(value).locale('pt-BR').format("DD/MM/YYYY HH:mm")
})

Vue.filter('toDateInFull', (value) => {
  return moment(value).locale('pt-BR').format("LLLL")
})

Vue.config.productionTip = true

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
