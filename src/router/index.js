import { createRouter, createWebHistory } from "vue-router";
import LHomePage from '../views/LHomePage.vue'
import LViewSkills from '../views/LViewSkills.vue'
import LoginPage from '../views/LoginPage.vue'
import LViewCoursePage from "../views/LViewCoursePage.vue";
import APanelHome from '../views/APanelHome.vue'
import APanelViewSkills from '../views/APanelViewSkills.vue'
import APanelViewRoles from '../views/APanelViewRoles.vue'
import APanelViewCourses from '../views/APanelViewCourses.vue'
import LLearningJourney from '../views/LLearningJourney.vue'


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
    props: true,
  },
  {
    path: "/LLearningJourney",
    name: "LLearningJourney",
    component: LLearningJourney
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router