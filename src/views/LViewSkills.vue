<template>
  <NavBar/>
  <BackMiniNav message="Job Roles"/>
  <div class="container">
    <!-- role name and caption -->
    <div class="row">
      <div class="d-flex flex-column flex-shrink-0 p-3">
        <h2 class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
          <span class="fs-2">{{this.rolename}}</span>
        </h2>
        <p>Browse skills & courses <br><i><span style = "font-size:12px"> Note : Skills that are labelled green are skills you have already acquired </span> </i> </p>
    </div>
    <!-- skill side bar and courses section -->
    <div class="row">
      <!-- skill side bar -->
      <div class="col-3">
        <ul class="nav flex-column" v-for="jobroleskill in jobroleskills" :key=jobroleskill.id>
          <li class="nav-item mb-3" v-if="acquiredskills.includes(jobroleskill.skill_name) == false">
            <button @click="loadCourses(jobroleskill.id)" type="button" class="skillButton btn btn-outline-secondary">{{jobroleskill.skill_name}}</button>
          </li>
          <li class="nav-item mb-3"  v-else>
            <button @click="loadCourses(jobroleskill.id)" type="button" class="skillButton btn btn-success">{{jobroleskill.skill_name}}</button>
          </li>
        </ul>
      </div>
      <!-- courses section -->
      <div class="col-9">
        <div class="row justify-content-around">
          <div @click="sendData([course.id, course.course_status, course.course_name])" v-for="course in courses" :key="course.id" class="card shadow-sm text-dark bg-light mb-4" style="width: 18rem; height: 14rem;">
            <div class="card-body">
              <h5 class="card-title mb-4">{{ course.course_name }}</h5>
              <p>Type: {{ course.course_type }}</p>
              <p>Category: {{ course.course_category }}</p>
              <CompletionStatusButton />
              <!-- <div class="d-flex justify-content-between align-items-center"> -->
                <!-- <a :href="'#'+course.id" @click.stop="addCourseToLJ()" :class=dynamicButton>{{saveStatus}}</a> -->
                    <!-- <button @click="addCourseToLJ()" type="button" :class="dynamicButton">{{saveStatus}}</button> -->
                <!-- </div> -->
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import CompletionStatusButton from '../components/CompletionStatusButton.vue'
import axios from 'axios';

export default {
  components: {
    NavBar,
    BackMiniNav,
    CompletionStatusButton
  },
  props: ['roleID','rolename'],
  data(){
    return{
      jobroleskills: null,
      roleName: String,
      courses: null,
      skillID: String,
      acquiredskills : [],
      // dynamicButton: "btn btn-success",
      // saveStatus: "Save"
    }
  },
  created() {
    sessionStorage.setItem("previousPageTitle", "Skills")
  },
  computed: {
    // return course card ID

  },
  methods: {
    loadCourses(skillID){
      axios
        .get(`http://127.0.0.1:8000/api/v1/skill/${skillID}/courses/`)
        .then(response => (this.courses = response.data))
    },
    sendData(courseDetails) {
      if (courseDetails[1] != 'Inactive') {
        this.$router.push({ name:'LViewCoursePage', params: {courseID: courseDetails[0], courseName: courseDetails[2]} });
        sessionStorage.setItem("courseID", courseDetails[0])
      }
    },
    // addCourseToLJ(neil){
    //   // axios
    //   console.log(neil)
    //   // change button
    //   if(this.saveStatus == "Save"){
    //     this.dynamicButton = "btn btn-danger";
    //     this.saveStatus = "Unsave"
    //   }else{
    //     this.dynamicButton = "btn btn-success";
    //     this.saveStatus = "Save"
    //   }
    // }
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/jobrole/${this.roleID}/available_skills/`)
      .then(response => (this.jobroleskills = response.data))

      var staffID = sessionStorage.getItem("staffID")
      var jobroleID = sessionStorage.getItem("jobroleID")

      axios
        .get("http://127.0.0.1:8000/api/v1/staff/" + staffID + "/jobrole/" + jobroleID + "/acquired_skills")
        .then(response =>{
          for(var x of response.data){
            this.acquiredskills.push(x.skill_name)
          }
          console.log(this.jobroleskills)
          console.log(this.acquiredskills)
        })

  }
}
</script>

<style>
.skillButton{
  min-width: 170px;
  max-width: 170px;
}
</style>