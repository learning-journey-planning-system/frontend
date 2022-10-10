<template>
  <NavBar />
  <BackMiniNav message="Skills" />
  <div class="container">
    <div class="row">
      <h2 class="d-flex align-items-center p-3 mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span class="fs-4">{{this.courseID}}: {{this.courseName}}</span>
      </h2>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" /><path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" /></svg>
        {{this.courseDetails.course_type}}
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16"><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" /></svg>
        {{this.courseDetails.course_category}}
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" /><path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" /></svg>
        {{this.courseDetails.course_desc}}
      </p>
    </div>
    <div class="row">
      <h2 class="d-flex align-items-center p-3 mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span class="fs-4">Skills you will gain</span>
      </h2>
      <div class="col col-12 col-md-1 mb-2 me-3 " v-for="skill in courseDetails.skills" :key=skill.id>
        <button class="btn btn-outline-success me-2" type="button">{{skill.skill_name}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import axios from 'axios';

export default {
  components: {
    NavBar,
    BackMiniNav
  },
  props: ['courseID','courseName'],
  data(){
    return {
      courseDetails: []
    }
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/course/${this.courseID}`)
      .then(response => (
        console.log(response.data),
        this.courseDetails = response.data))
  }
}
</script>
