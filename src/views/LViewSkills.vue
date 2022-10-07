<template>
  <LNavBar/>
  <BackMiniNav message="Job Roles"/>
  <div class="container">
    <div class="d-flex flex-column flex-shrink-0 p-3" style="width: 280px;">
      <h2 class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <!-- <span class="fs-4" id="displayRoleName">{{jobroleskill.jobrole.jobrole_name}}</span> -->
        <span class="fs-4">Role name here</span>
      </h2>
      <p>Browse skills and courses</p>
      <ul class="nav flex-column" v-for="jobroleskill in jobroleskills" :key=jobroleskill>
        <li class="nav-item mb-3" v-if="jobroleskill.jobrole_id == roleID">
          <button @click="loadCourses" type="button" class="skillButton btn btn-outline-secondary">{{jobroleskill.skill.skill_name}}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LNavBar from '../components/LNavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import axios from 'axios';

export default {
  components: {
    LNavBar,
    BackMiniNav,
  },
  props: ['roleID'],
  data(){
    return{
      jobroleskills: null,
      roleName: String
      // roles: [
      //   {title: 'Data Analyst', id: 1, status: 'Active',
      //   skills: ['Data Analysis', 'Python']},
      //   {title: 'Data Scientist', id: 2, status: 'Active',
      //   skills:['Data Analysis', 'Python', 'Pytorch', 'TensorFlow']},
      //   {title: 'Data Engineer', id: 3, status: 'Inactive',
      //   skills:['Communication', 'Tableau']},
      //   {title: 'Machine Learning Engineer', id: 4, status: 'Active',
      //   skills:['Java', 'Tableau', 'Matplotlib']},
      // ],
      // icon: `<a class="nav-link"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'LHomePage'} "><h1><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-circle mb-2 me-2" viewBox="0 0 16 16">
      //     <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg>Job Roles</h1></router-link></a>`
    }
  },
  created(){
    // this.skills = this.roles[this.roleID-1].skills
    // this.roleName = this.roles[this.roleID-1].title
  },
  methods: {
    loadCourses(){
      console.log("button can be clicked")
    },
    getRoleName() {
      this.jobroleskills.forEach(jobroleskill => {
        if (jobroleskill.jobrole_id==this.roleID) {
          this.roleName = jobroleskill.jobrole.jobrole_name;
        }
      });
    }
  },
  mounted() {
    axios
      .get('http://localhost:8080/api/v1/jobroleskill/')
      .then(response => (this.jobroleskills = response.data))
  }
}
</script>

<style>
.skillButton{
  min-width: 170px;
  max-width: 170px;
}
</style>