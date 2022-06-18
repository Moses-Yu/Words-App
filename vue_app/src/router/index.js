import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '../views/HomeView.vue'
import FirstPage from '../components/FirstPage.vue'
import LoginPage from '../components/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'firstPage',
    component: FirstPage
  },
  {
    path: '/login',
    name: 'loginPage',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
