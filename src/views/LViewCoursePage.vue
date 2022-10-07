<template>
  <LNavBar />
  <BackMiniNav message="Skills" />
  <div class="container">
    <h2 class="d-flex align-items-center p-3 mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <span class="fs-4">{{this.courseName}}</span>
    </h2>
    <p>{{this.courseDetails.course_type}}</p>
    <p>{{this.courseDetails.course_category}}</p>
    <p>{{this.courseDetails.course_desc}}</p>
    <h2>Skills you will gain</h2>
    <ul v-for="skill in courseDetails.skills" :key=skill.id>
      <li>{{skill.skill_name}}</li>
    </ul>
  </div>
</template>

<script>
import LNavBar from '../components/LNavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import axios from 'axios';

export default {
  components: {
    LNavBar,
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
