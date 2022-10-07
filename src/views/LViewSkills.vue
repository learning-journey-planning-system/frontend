<template>
  <LNavBar/>
  <BackMiniNav message="Job Roles"/>
  <div class="container">
    <!-- role name and caption -->
    <div class="row">
      <div class="d-flex flex-column flex-shrink-0 p-3" style="width: 280px;">
        <h2 class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span class="fs-4">{{this.rolename}}</span>
        </h2>
        <p>Browse skills and courses</p>
    </div>
    <!-- skill side bar and courses section -->
    <div class="row">
      <!-- skill side bar -->
      <div class="col">
        <ul class="nav flex-column" v-for="jobroleskill in jobroleskills" :key=jobroleskill.id>
          <li class="nav-item mb-3">
            <button @click="loadCourses(jobroleskill.id)" type="button" class="skillButton btn btn-outline-secondary">{{jobroleskill.skill_name}}</button>
          </li>
        </ul>
      </div>
      <!-- courses section -->
      <div class="col" v-for="course in courses" :key="course.id">
        <div @click="sendData([course.course_ID, course.course_status])" class="card shadow-sm text-dark bg-light mb-3" style="width: 18rem; height: 12rem;">
          <div class="card-body">
            <h5 class="card-title mb-4">{{ course.course_name }}</h5>
            <p>Type: {{ course.course_type }}</p>
            <p>Category: {{ course.course_category }}</p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <!-- <button v-if="course.course_status == 'Inactive'" type="button"
                  class="btn btn-sm btn-outline-danger">{{course.course_status}}</button> -->
                  <button @click="addCourseToLJ()" type="button" :class="dynamicButton">{{saveStatus}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
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
      roleName: String,
      courses: null,
      skillID: String,
      dynamicButton: "btn btn-sm btn-outline-success",
      saveStatus: "Save"
    }
  },
  methods: {
    loadCourses(skillID){
      axios
        .get(`http://127.0.0.1:8000/api/v1/skill/${skillID}/courses/`)
        .then(response => (this.courses = response.data))
        console.log(this.courses)
    },
    sendData(courseDetails) {
      console.log('in sendData')
      if (courseDetails[1] != 'Inactive') {
        this.$router.push({ name:'LViewCoursePage', params: { courseID: courseDetails[0] } });
        console.log('in for loop')
      }
    },
    addCourseToLJ(){
      // axios

      // change button
      if(this.dynamicButton == "btn btn-sm btn-outline-success"){
        this.dynamicButton = "btn btn-sm btn-outline-danger";
        this.saveStatus = "Unsave"
      }else{
        this.dynamicButton = "btn btn-sm btn-outline-success";
        this.saveStatus = "Save"
      }
    }
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/jobrole/${this.roleID}/skills/`)
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