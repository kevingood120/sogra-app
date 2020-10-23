import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products'
import Sales from '../views/Sales'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes,
  
})

router.push('/sales')

export default router
