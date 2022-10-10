<template>
  <div class="bg-light">
    <div class="container">
      <div class="row">
        <div class="col">
          <slot/>
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
  name: 'MiniNav',
  props: ['message'],
  created(){
    sessionStorage.setItem("previousPageTitle", this.message) // always gonna be "Job Roles"
  },
  methods: {
    goToLearningJourneyPage() {
      this.$router.push({ name: 'LLearningJourney' });
    }
  }
}
</script>