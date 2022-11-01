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
import ADeleteSkillsFromCourses from '../views/ADeleteSkillsFromCourses.vue'
import ADeleteSkillsFromRoles from '../views/ADeleteSkillsFromRoles.vue'
import AEditSkillsfromSkills from '../views/AEditSkillsfromSkills.vue'
import AEditJobRolesfromJob from '../views/AEditJobRolesfromJob.vue'


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
  {
    path: "/ADeleteSkillsFromCourses/:courseID/:courseName",
    name: "ADeleteSkillsFromCourses",
    component: ADeleteSkillsFromCourses,
    props: true
  },
  {
    path: "/ADeleteSkillsFromRoles/:roleID/:roleName",
    name: "ADeleteSkillsFromRoles",
    component: ADeleteSkillsFromRoles,
    props: true
  },
  {
    path: "/AEditSkillsfromSkills/:skillID/:skillName",
    name: "AEditSkillsfromSkills",
    component: AEditSkillsfromSkills,
    props: true
  },


  {
    path: "/AEditJobRolesfromJob/:jobID/:jobName",
    name: "AEditJobRolesfromJob",
    component: AEditJobRolesfromJob,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router