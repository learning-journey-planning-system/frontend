<template>
  <NavBar />
  <BackMiniNav message="Skills" />
  <div class="container">
    <div class="row">
      <h2 class="my-3">{{this.courseID}}: {{this.courseName}}
        <div class="dropdown ms-2" style="display:inline-block;">
          <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
            data-bs-toggle="dropdown" aria-expanded="false">Save</button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li v-for="learningjourney in this.staffLearningJourneys" :key="learningjourney">
              <a class="dropdown-item" href="#" @click="putCourseToLJ(learningjourney,learningjourney.id, this.courseID)">
                <MiniSaveButton v-show="isActive(learningjourney,this.courseID)"/> Learning Journey {{this.staffLearningJourneys.indexOf(learningjourney)+1}} -
                {{learningjourney.jobrole.jobrole_name}}
              </a>
            </li>
          </ul>
        </div>
      </h2>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house"
          viewBox="0 0 16 16">
          <path fill-rule="evenodd"
            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
          <path fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
        </svg>
        {{this.courseDetails.course_type}}
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark"
          viewBox="0 0 16 16">
          <path
            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
        </svg>
        {{this.courseDetails.course_category}}
      </p>
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text"
          viewBox="0 0 16 16">
          <path
            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
          <path
            d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
        </svg>
        {{this.courseDetails.course_desc}}
      </p>
    </div>
    <div class="row">
      <h4 class="my-3">Skills you will gain</h4>
    </div>
    <div class="row ps-2">
      <button v-for="skill in courseDetails.skills" :key=skill.id class="btn btn-outline-success me-3 my-2"
        type="button" style="width:150px; height: 65px;">{{skill.skill_name}}</button>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import MiniSaveButton from '../components/MiniSaveButton.vue'
import axios from 'axios';

export default {
  components: {
    NavBar,
    BackMiniNav,
    MiniSaveButton
  },
  props: ['courseID', 'courseName'],
  data() {
    return {
      courseDetails: [],
      staffLearningJourneys: null,
      responseMessage: null,
      allSkillsFromJobRole: null,
      allCoursesFromJobRole: []
    }
  },
  created() {
    sessionStorage.setItem("previousPageTitle", "Course")
  },
  methods: {
    isActive(lj,cID) {
      // var coursesForThisLJ = [];
      for (let i = 0; i < lj.courses.length; i++) {
        // coursesForThisLJ.push(lj.courses[i])
        if (lj.courses[i].id == cID) {
          return true
        }
      }
      return false
    },
    putCourseToLJ(lj,ljID, cID) {
      // console.log("learning journey id", ljID)
      // console.log("course id", cID)

      // check if course is already in learning journey
      if (this.isActive(lj,cID)) {
        // course is in learning journey --> delete course
        axios
          .delete(`http://127.0.0.1:8000/api/v1/learningjourney/${ljID}/delete_course/${cID}`)
          .then(function(){
            console.log("stage 1");
            alert("Course has been removed successfully from learning journey!");
            window.location.reload();
          })

      } else {
        // course is not in learning journey

        // check if course is applicable to learning journey - get all skills from jobrole_id
        axios
          .get(`http://127.0.0.1:8000/api/v1/jobrole/${lj.jobrole.id}/skills/`)
          .then((response) => {
            console.log("stage 2");
            this.allSkillsFromJobRole = response.data;
            // for each skill,
            for (let i = 0; i < this.allSkillsFromJobRole.length; i++) {
              var skillId = this.allSkillsFromJobRole[i].id
              axios
                .get(`http://127.0.0.1:8000/api/v1/skill/${skillId}/courses/`)
                .then((response) => {
                  for (let j = 0; j < response.data.length; j++) {
                    // push course id into allCoursesFromJobRole (whatever is being pushed is NOT soft deleted)
                    this.allCoursesFromJobRole.push(response.data[j].id)
                    }
                  console.log("stage 2a",this.allCoursesFromJobRole)
                  })
                }
            // check if course is applicable to learning journey - check if THIS COURSE user is trying to add is IN allCoursesFromJobRole
            console.log(this.allCoursesFromJobRole)
            if (this.allCoursesFromJobRole.includes(cID)) {
              // add this course to this learning journey
              axios
                .post(`http://127.0.0.1:8000/api/v1/learningjourney/${ljID}/new_course/?course_id=${cID}`, {

                })
                .then(function () {
                  console.log("stage 3");
                  alert("Course has been successfully added to learning journey!");
                  window.location.reload();
                  axios
                    .get(`http://127.0.0.1:8000/api/v1/learningjourney/${ljID}`)
                    .then((response) => { console.log(response.data) })
                })
                .catch(function (error) {
                  if (error.response) {
                    alert(error.response.data.detail);
                    axios
                      .get(`http://127.0.0.1:8000/api/v1/learningjourney/${ljID}`)
                      .then((response) => {
                        console.log("stage 4");
                        console.log(response.data) })
                  }
                })
            } else {
              console.log("stage 5");
              alert("This course cannot be added into this learning journey")
            }
            })
      }
    }
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/course/${this.courseID}`)
      .then((response) => {
        this.courseDetails = response.data;
        axios
          .get(`http://127.0.0.1:8000/api/v1/staff/${sessionStorage.getItem('staffID')}/learningjourneys`)
          .then(response => { this.staffLearningJourneys = response.data })
      })
  }
}
</script>
