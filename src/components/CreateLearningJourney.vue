<template>
  <div class="col-3 align-self-center" style="text-align: right;">
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Add to New Learning Journey
    </button>

    <!-- Modal -->
    <form @submit.prevent="submitForm()">
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Create a new learning journey</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="text-align: left;">
              <!-- form select -->
              <h5>Select a Job Role:</h5>
              <select class="form-select" size="8" v-model="selected">
                <option v-for="jobRole in this.allAvailableJobRolesForCourses" :key="jobRole" :value=jobRole.id>{{jobRole.jobrole_name}}</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" class="btn btn-primary">Save Course</button>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- Modal Ends-->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateLearningJourney',
  data(){
    return {
      allAvailableJobRoles: [],
      allAvailableJobRolesForCourses: [],
      staffLearningJourneys: null,
      staffExistingJobRolesInLJs: [],
      selected: ''
    }
  },
  methods: {
    submitForm(){
      // console.log("job role id here: ",this.selected);
      axios
        .post("http://127.0.0.1:8000/api/v1/learningjourney/", {
          staff_id: sessionStorage.getItem('staffID'),
          jobrole_id: this.selected
        })
        .then(function (response) {
          var ljID = response.data.id;
          var cID = sessionStorage.getItem("courseID")
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
          // window.location.reload()
        })
        .catch(function (error) {
          if (error.response) {
            alert(error.response.data.detail);
          }
        })
    },
    isCourseApplicableForJobRole(cID, jobRole){
      // var allCoursesFromJobRole = [];
      console.log("course id: ", cID);
      console.log("job role: ", jobRole)
      var activeSkillsForCourse = [];
      var activeSkillsForJobRole = [];

      // 1. for cID, get skills related to it, store into activeSkillsForCourse
      axios
        .get(`http://127.0.0.1:8000/api/v1/course/${cID}/all_skills/`)
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            activeSkillsForCourse.push(response.data[i].id)
          }
          // 2. for jobRoleId, get skills related to it, store into activeSkillsForJobRole
          axios
            .get(`http://127.0.0.1:8000/api/v1/jobrole/${jobRole.id}/available_skills/`)
            .then((response) => {
              for (let i = 0; i < response.data.length; i++) {
                activeSkillsForJobRole.push(response.data[i].id)
              }
              const intersection = activeSkillsForCourse.filter(element => activeSkillsForJobRole.includes(element));
              if (intersection.length>0) {
                // course is applicable for job role
                this.allAvailableJobRolesForCourses.push(jobRole)
              } else {
                console.log('false')
              }
            })
        })
    }
  },
  mounted: function(){
    axios
      .get(`http://127.0.0.1:8000/api/v1/staff/${sessionStorage.getItem('staffID')}/learningjourneys`)
      .then((response) => {
        this.staffLearningJourneys = response.data;
        for (let i = 0; i < this.staffLearningJourneys.length; i++) {
          this.staffExistingJobRolesInLJs.push(this.staffLearningJourneys[i].jobrole_id)
        }
        // console.log("job roles in learning journeys: ", this.staffExistingJobRolesInLJs)
        axios
          .get("http://127.0.0.1:8000/api/v1/jobrole/available/")
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              if (!this.staffExistingJobRolesInLJs.includes(response.data[i].id)) {
                this.allAvailableJobRoles.push(response.data[i]);

              }
            }
            // console.log("original available job roles NOT in user's learning journeys",this.allAvailableJobRoles)
            for (let i = 0; i < this.allAvailableJobRoles.length; i++) {
              this.isCourseApplicableForJobRole(sessionStorage.getItem("courseID"),this.allAvailableJobRoles[i])

            }

          })
          // console.log("all job roles that this user can pick from: ",this.allAvailableJobRoles)
      })
  }


}
</script>
