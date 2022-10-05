import { createRouter, createWebHistory } from "vue-router";
import LHomePage from '../views/LHomePage.vue'
import SkillPage from '../views/SkillPage.vue'
import LoginPage from '../views/LoginPage.vue'
import AViewSkills from '../views/AViewSkills.vue'

const routes = [
  {
    path: '/LHomePage',
    name: 'LHomePage',
    component: LHomePage
  }, 
  {
    path: '/SkillPage/:roleID',
    name: 'SkillPage',
    component: SkillPage,
    props: true,
  },
  {
    path: '/',
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