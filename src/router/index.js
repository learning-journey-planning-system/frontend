import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/HomePage.vue'
import SkillPage from '../views/SkillPage.vue'
import LoginPage from '../views/LoginPage.vue'
import AViewSkills from '../views/AViewSkills.vue'

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
  },
  {
    path: '/LoginPage',
    name: 'LoginPage',
    component: LoginPage
  },

  {
    path: '/AViewSkills',
    name: 'AViewSkills',
    component: AViewSkills
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router