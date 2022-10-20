<template>
  <div class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col">
          <h4>
            <a @click="$router.go(-1)"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle mb-2 me-2" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/></svg></a>
            <!-- <span v-if="typeof(this.message)!='undefined'" >Back to {{message}}</span>
            <span v-else>Back to {{newMessage}}</span> -->
            <!-- <span>Back</span> -->
          </h4>
        </div>
        <div class="col">
          <button @click="goToLearningJourneyPage()" type="button" class="btn btn-sm btn-outline-primary float-end">View My Learning Journeys</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackMiniNav',
  props: ['message'],
  // created(){
  //   if (typeof(this.message)!='undefined') {
  //     sessionStorage.setItem('previousPageTitle', this.message)
  //   }
  // },
  computed: {
    newMessage(){
      return sessionStorage.getItem('previousPageTitle')
    }
  },
  methods: {
    goToLearningJourneyPage(){
      this.$router.push({ name: 'LLearningJourney' });
    }
  },

}
</script>