import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../components/home/home-page.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
