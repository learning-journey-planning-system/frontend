<template>
  <NavBar />
  <BackMiniNav></BackMiniNav>
  <div class="container">
    <div class="row"><h2 class="fs-2 p-3">My Learning Journeys</h2></div>
    <div class="row">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle text-start" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" style="width: 100%;">
          Dropdown button
        </button>
        <ul class="dropdown-menu p-3" aria-labelledby="dropdownMenuButton1" style="width: 98%;">
          <div class="container">
            <div class="row ps-2">
              <!-- <button v-for="skill in courseDetails.skills" :key=skill.id class="btn btn-outline-success me-3 my-2" type="button" style="width:150px; height: 65px;">{{skill.skill_name}}</button> -->
            </div>
          </div>
        </ul>
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
  data(){
    return {
      staffLearningJourneys: null,
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
