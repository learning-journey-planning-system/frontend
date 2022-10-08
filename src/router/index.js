import { createRouter, createWebHistory } from "vue-router";
import LHomePage from '../views/LHomePage.vue'
import LViewSkills from '../views/LViewSkills.vue'
import LoginPage from '../views/LoginPage.vue'
import LViewCoursePage from "../views/LViewCoursePage.vue";
import AHomePage from '../views/AHomePage.vue'
import APanelHome from '../views/APanelHome.vue'
import AViewSkills from '../views/AViewSkills.vue'
import APanelViewSkills from '../views/APanelViewSkills.vue'
import APanelViewRoles from '../views/APanelViewRoles.vue'
import APanelViewCourses from '../views/APanelViewCourses.vue'


const routes = [
  {
    path: "/LHomePage",
    name: "LHomePage",
    component: LHomePage,
  },
  {
    path: "/LViewSkills/:roleID/:rolename",
    name: "LViewSkills",
    component: LViewSkills,
    props: true,
  },
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
  },

  {
    path: "/APanelViewSkills",
    name: "APanelViewSkills",
    component: APanelViewSkills,
  },

  {
    path: "/AHomePage",
    name: "AHomePage",
    component: AHomePage,
  },

  {
    path: "/AViewSkills/:roleID/:rolename",
    name: "AViewSkills",
    component: AViewSkills,
    props: true,
  },

  {
    path: "/APanelViewRoles",
    name: "APanelViewRoles",
    component: APanelViewRoles,
  },

  {
    path: "/APanelHome",
    name: "APanelHome",
    component: APanelHome,
  },

  {
    path: "/APanelViewCourses",
    name: "APanelViewCourses",
    component: APanelViewCourses,
  },
  {
    path: "/LViewCoursePage/:courseID/:courseName",
    name: "LViewCoursePage",
    component: LViewCoursePage,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router