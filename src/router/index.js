import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/HomePage.vue'
import SkillPage from '../views/SkillPage.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  }, 
  {
    path: '/SkillPage',
    name: 'SkillPage',
    component: SkillPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router