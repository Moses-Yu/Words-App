import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '../views/HomeView.vue'
import FirstPage from '../components/FirstPage.vue'

const routes = [
  {
    path: '/',
    name: 'firstpage',
    component: FirstPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
