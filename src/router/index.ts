import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import BuscarEmpleos from '../views/BuscarEmpleos.vue'
import Postularme from '@/views/Postularme.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  }
,
  {
    path: '/BuscarEmpleos',
    name: 'BuscarEmpleos',
    component: BuscarEmpleos
  },
  {
    path: '/Postularme',
    name: 'Postularme',
    component: Postularme
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
