<template>
  <LNavBar/>
  <BackMiniNav message="Job Roles"/>
  <div class="container">
    <div class="d-flex flex-column flex-shrink-0 p-3" style="width: 280px;">
      <h2 class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span class="fs-4">{{this.rolename}}</span>
      </h2>
      <p>Browse skills and courses</p>
      <ul class="nav flex-column" v-for="jobroleskill in jobroleskills" :key=jobroleskill.id>
        <li class="nav-item mb-3">
          <button @click="loadCourses" type="button" class="skillButton btn btn-outline-secondary">{{jobroleskill.skill_name}}</button>
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
  props: ['roleID','rolename'],
  data(){
    return{
      jobroleskills: null,
      roleName: String
    }
  },
  methods: {
    loadCourses(){
      console.log("button can be clicked")
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8080/api/v1/jobrole/${this.roleID}/skills/`)
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