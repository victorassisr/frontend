import Vue from 'vue'
import Router from 'vue-router'
import listaProdutos from './components/ProdutosLista.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'listaProdutos',
      component: listaProdutos
    },
  ]
})
