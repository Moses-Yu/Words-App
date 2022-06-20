import { createRouter, createWebHistory } from 'vue-router'

// import HomeView from '../views/HomeView.vue'
import FirstPage from '../components/FirstPage.vue'
import LoginPage from '../components/LoginPage.vue'
import MyPage from '../components/MyPage.vue'
import QuizPage from '../components/QuizPage.vue'
import SignUpPage from '../components/SignUpPage.vue'

const routes = [
  {
    path: '/',
    name: 'firstPage',
    component: FirstPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: SignUpPage
  },
  {
    path: '/myPage',
    name: 'myPage',
    component: MyPage
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: QuizPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
