<template>
  <NavBar />
  <BackMiniNav message="Skills" />
  <div class="container">
    <div class="row">

      <div class="col">
        <h2 class="my-3">{{this.courseID}}: {{this.courseName}}
          <div class="dropdown ms-2" style="display:inline-block;">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
              data-bs-toggle="dropdown" aria-expanded="false">Save to Existing Learning Journeys</button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-for="learningjourney in this.staffLearningJourneys" :key="learningjourney">
                <a class="dropdown-item" href="#"
                  @click="putCourseToLJ(learningjourney,learningjourney.id, this.courseID)">
                  <MiniSaveButton v-show="isActive(learningjourney,this.courseID)" /> Learning Journey
                  {{this.staffLearningJourneys.indexOf(learningjourney)+1}} -
                  {{learningjourney.jobrole.jobrole_name}}
                </a>
              </li>
            </ul>
          </div>
        </h2>
      </div>

      <CreateLearningJourney />
    </div>

    <div class="row">
      <div class="col">
        <CompletionStatusButton />
      </div>
    </div>

    <div class="row">
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
      <button v-for="skill in this.courseDetails.skills" :key=skill.id :class=indicateStatus(skill.deleted) v-show=toShow(skill.deleted) type="button" style="width:150px; height: 65px;">
        {{skill.skill_name}}
      </button>
      <!-- <button v-for="skill in allAvailableSkills" :key=skill.id>{{skill}}</button> -->
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import MiniSaveButton from '../components/MiniSaveButton.vue';
import CreateLearningJourney from '../components/CreateLearningJourney.vue';
import CompletionStatusButton from '../components/CompletionStatusButton.vue'
import axios from 'axios';

export default {
  components: {
    NavBar,
    BackMiniNav,
    MiniSaveButton,
    CreateLearningJourney,
    CompletionStatusButton
},
  props: ['courseID', 'courseName'],
  data() {
    return {
      courseDetails: [],
      staffLearningJourneys: null,
      responseMessage: null,
      active: null,
      allCoursesFromJobRole: [],
    }
  },
  created() {
    sessionStorage.setItem("previousPageTitle", "Course")
  },
  methods: {
    toShow(isDeleted) {
      if (sessionStorage.getItem("staffType") == "Learner" && isDeleted) {
        return false
      }
      return true
    },
    indicateStatus(isDeleted) {
      if (isDeleted) {
        return "btn btn-outline-danger me-3 my-2"
      } else {
        return "btn btn-outline-success me-3 my-2"
      }
    },
    isActive(lj, cID) {
      // var coursesForThisLJ = [];
      for (let i = 0; i < lj.courses.length; i++) {
        // coursesForThisLJ.push(lj.courses[i])
        if (lj.courses[i].id == cID) {
          return true
        }
      }
      return false
    },
    putCourseToLJ(lj, ljID, cID) {
      // console.log("learning journey id", ljID)
      // console.log("course id", cID)

      // this.active = !this.active;

      // check if course is already in learning journey
      if (this.isActive(lj, cID)) {
        // course is in learning journey
        // double check if user wants to delete course
        if (confirm("Please CONFIRM that you would like to delete this course from your learning journey.")) {
          axios
            .delete(`http://127.0.0.1:8000/api/v1/learningjourney/${ljID}/delete_course/${cID}`)
            .then((response) => {
              alert("Course is successfully DELETED from this learning journey!")

              // checks if this course is the LAST course in learning journey, if it is --> remove entire learning journey
              if (response.data.courses.length == 0) {
                axios
                  .delete(`http://127.0.0.1:8000/api/v1/learningjourney/${ljID}`)
                  .then(() => {
                    alert("Learning Journey for " + lj.jobrole.jobrole_name + " has been deleted")
                    window.location.reload();
                  })
              }
            })
        }

      } else {
        // course is not in learning journey
        axios
          .get(`http://127.0.0.1:8000/api/v1/jobrole/${lj.jobrole.id}`)
          .then((response) => {
            for (let i = 0; i < response.data.skills.length; i++) {
              for (let j = 0; j < response.data.skills[i].courses.length; j++) {
                this.allCoursesFromJobRole.push(response.data.skills[i].courses[j].id)
              }
            }
            console.log(this.allCoursesFromJobRole)
            if (this.allCoursesFromJobRole.includes(cID)) {
              // add this course to this learning journey
              axios
                .post(`http://127.0.0.1:8000/api/v1/learningjourney/${ljID}/new_course/?course_id=${cID}`)
                .then(function () {
                  alert("Course is successfully ADDED to learning journey!");
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
                      .then((response) => { console.log(response.data) })
                  }
                })
            } else {
              alert("This course cannot be added to the learning journey")
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
          .then((response) => {
            this.staffLearningJourneys = response.data;
          })
      })
  }
}
</script>