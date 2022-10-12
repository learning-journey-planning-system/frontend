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
              <strong>Learning Journey 1</strong>
            </button>
          </h2>
          <div :id="'panelsStayOpen-collapse'+learningjourney.id" class="accordion-collapse collapse show">
            <div class="accordion-body">
              <button class="btn btn-outline-success me-3 my-2" type="button" style="width:150px; height: 65px;">business development 1</button>
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
