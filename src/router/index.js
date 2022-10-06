import { createRouter, createWebHistory } from "vue-router";
import LHomePage from '../views/LHomePage.vue'
import LViewSkills from '../views/LViewSkills.vue'
import LoginPage from '../views/LoginPage.vue'
import AViewSkills from '../views/AViewSkills.vue'
import AHomePage from '../views/AHomePage.vue'
import APanelHome from '../views/APanelHome.vue'
import AViewRoles from '../views/AViewRoles.vue'

const routes = [
  {
    path: '/LHomePage',
    name: 'LHomePage',
    component: LHomePage
  }, 
  {
    path: '/LViewSkills/:roleID',
    name: 'LViewSkills',
    component: LViewSkills,
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

  {
    path: '/AHomePage',
    name: 'AHomePage',
    component: AHomePage
  },

  {
    path: '/AViewRoles',
    name: 'AViewRoles',
    component: AViewRoles
  },

  {
    path: '/APanelHome',
    name: 'APanelHome',
    component: APanelHome
  },

  {
    path: '/AViewCourses',
    name: 'AViewCourses',
    component: AViewCourses
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router