<template>
  <NavBar />
  <BackMiniNav></BackMiniNav>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2 class="fs-2 p-3">My Learning Journeys</h2>
      </div>
      <div class="col align-self-center" style="text-align: right;">
        <button @click="deleteAllLearningJourneys()" type="button" class="btn btn-danger btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill mb-1 me-1" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></svg>Delete <strong>ALL</strong> Learning Journeys</button>
      </div>
    </div>
    <div class="row">
      <!-- accordion starts here -->
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item" v-for="learningjourney in this.staffLearningJourneys" :key="learningjourney">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse'+learningjourney.id" aria-expanded="true" :aria-controls="'panelsStayOpen-collapse'+learningjourney.id">
              <strong>Learning Journey {{this.staffLearningJourneys.indexOf(learningjourney)+1}}</strong>
            </button>
          </h2>
          <div :id="'panelsStayOpen-collapse'+learningjourney.id" class="accordion-collapse collapse">
            <div class="accordion-body">
              <div class="container">
                <h4 class="mt-1 mb-4">
                  {{learningjourney.jobrole.jobrole_name}}
                  <a href="" class="link-primary" @click="sendRoleData([learningjourney.jobrole.id, learningjourney.jobrole.deleted, learningjourney.jobrole.jobrole_name])">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>
                  </a>
                </h4>
                <!-- display all skills for this learning journey -->
                <button v-for="skill in allSkills(learningjourney)" :key="skill" :class=indicateStatus(skill.deleted) v-show=toShow(skill.deleted) type="button" style="width:150px; height: 65px;">{{skill.skill_name}}</button>

                <!-- display all courses for this learning journey -->
                  <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-3 mt-3">
                    <div class="col" v-for="course in allCourses(learningjourney)" :key="course.id" >
                      <div @click="sendData([course.id, course.course_status, course.course_name])" class="card shadow-sm text-dark bg-light" style="width: 18rem; height: 14rem;">
                        <div class="card-body">
                          <h5 class="card-title mb-4">{{ course.course_name }}</h5>
                          <p>Type: {{ course.course_type }}</p>
                          <p>Category: {{ course.course_category }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- <div class="row mb-3" v-for="learningjourney in this.staffLearningJourneys" :key="learningjourney">
    </div> -->

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
  data(){
    return {
      staffLearningJourneys: null,
    }
  },
  methods:{
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
    sendData(courseDetails) {
      if (courseDetails[1] != 'Inactive') {
        this.$router.push({ name: 'LViewCoursePage', params: { courseID: courseDetails[0], courseName: courseDetails[2] } });
      }
    },
    allSkills(lj){
      var skillsForThisLJ = [];
      for (let i = 0; i < lj.courses.length; i++) {
        for (let j = 0; j < lj.courses[i].skills.length; j++) {
          skillsForThisLJ.push(lj.courses[i].skills[j])
        }
      }
      return skillsForThisLJ
    },
    allCourses(lj) {
      var coursesForThisLJ = [];
      for (let i = 0; i < lj.courses.length; i++) {
        coursesForThisLJ.push(lj.courses[i])
      }
      return coursesForThisLJ
    },
    sendRoleData(roleDetails) {
      if (roleDetails[1] != 'true') {
        this.$router.push({ name: 'LViewSkills', params: { roleID: roleDetails[0], rolename: roleDetails[2] } });
      }
    },
    deleteAllLearningJourneys(){
      if (confirm("All learning journey progress will be PERMANENTLY DELETED\nDo you still wish to proceed?")) {
        for (let i = 0; i < this.staffLearningJourneys.length; i++) {
          axios
            .delete(`http://127.0.0.1:8000/api/v1/learningjourney/${this.staffLearningJourneys[i].id}`)
        }
        window.location.reload();
        alert("All learning journeys are successfully deleted!")
      }
    }
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/staff/${sessionStorage.getItem('staffID')}/learningjourneys`)
      .then((response) => {
        this.staffLearningJourneys = response.data;
        console.log(this.staffLearningJourneys)
      })
  }
  }
</script>
