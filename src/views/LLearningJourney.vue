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
          <div :id="'panelsStayOpen-collapse'+learningjourney.id" class="accordion-collapse collapse show">
            <div class="accordion-body">
              <h4>{{learningjourney.jobrole.jobrole_name}}</h4>
              <button v-for="skillName in allStaffSkills" :key="skillName" class="btn btn-outline-success me-3 my-2" type="button" style="width:150px; height: 65px;">{{skillName}}</button>
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
  computed: {
    allStaffSkills() {
      var allCourses = null;
      // var allSkills = null;
      var allSkillsName = [];
      // console.log("in method",this.staffLearningJourneys.length)
      for (let i = 0; i < this.staffLearningJourneys.length; i++) {
        // console.log('in all LJ of staff')
        allCourses = this.staffLearningJourneys[i].courses
        // console.log("all courses", allCourses)
        for (let j = 0; j < allCourses.length; j++) {
          // console.log("looking at one course")
          // allSkills = allCourses[j].skills
          // console.log("length of this course", allSkills)
          for (let k = 0; k < allCourses[j].skills.length; k++) {
            // console.log("looping through all skills")
            console.log(allCourses[j].skills[k])
            allSkillsName.push(allCourses[j].skills[k].skill_name)
          }
        }
      }
      allSkillsName = [...new Set(allSkillsName)]
      // console.log(allSkillsNameArray)
      // console.log("set the array", [...new Set(allSkillsNameArray)])
      return allSkillsName
    }
  },
  methods:{
    show(thisthing){
      console.log(typeof(String(thisthing)))
    }
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/staff/${sessionStorage.getItem('staffID')}/learningjourneys`)
      .then(response => (
        console.log(response.data),
        this.staffLearningJourneys = response.data))
  }
  }
</script>
