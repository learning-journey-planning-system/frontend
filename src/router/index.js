import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/HomePage.vue'
import SkillPage from '../views/SkillPage.vue'
import LoginPage from '../views/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  }, 
  {
    path: '/SkillPage/:roleID',
    name: 'SkillPage',
    component: SkillPage,
    props: true,
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router