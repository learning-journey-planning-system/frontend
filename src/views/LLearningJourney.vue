<template>
  <NavBar />
  <BackMiniNav></BackMiniNav>
  <div class="container">
    <div class="row"><h2 class="fs-2 p-3">My Learning Journeys</h2></div>
    <div class="row">
      <!-- accordion starts here -->
      <div class="accordion" id="accordionPanelsStayOpenExample">
        <div class="accordion-item" v-for="learningjourney in this.staffLearningJourneys" :key="learningjourney">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#panelsStayOpen-collapse'+learningjourney.id" aria-expanded="true" :aria-controls="'panelsStayOpen-collapse'+learningjourney.id">
              <strong>Learning Journey {{this.staffLearningJourneys.indexOf(learningjourney)+1}}</strong>
            </button>
          </h2>
          <div :id="'panelsStayOpen-collapse'+learningjourney.id" class="accordion-collapse collapse">
            <div class="accordion-body">
              <div class="container">
                <h4 class="mt-1 mb-4">{{learningjourney.jobrole.jobrole_name}}</h4>
                <!-- display all skills for this learning journey -->
                <button v-for="skillName in allSkills(learningjourney)" :key="skillName" class="btn btn-outline-success me-3 my-2" type="button" style="width:150px; height: 65px;">{{skillName}}</button>

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
    show(thisthing){
      console.log(typeof(String(thisthing)))
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
          skillsForThisLJ.push(lj.courses[i].skills[j].skill_name)
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
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/staff/${sessionStorage.getItem('staffID')}/learningjourneys`)
      .then(response => (this.staffLearningJourneys = response.data))
  }
  }
</script>
