import { createRouter, createWebHistory } from 'vue-router'
import CountryListView from '../views/CountryListView.vue'
import CountryDetailView from '../views/CountryDetailView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'liste', component: CountryListView },
    { path: '/pays/:code', name: 'detail', component: CountryDetailView }
  ]
})
