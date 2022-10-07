<template>
  <LNavBar />
  <BackMiniNav message="Skills" />
  <div class="container">
    <h2 class="d-flex align-items-center p-3 mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
      <span class="fs-4">{{this.courseName}}</span>
    </h2>
  </div>
  
</template>

<script>
import LNavBar from '../components/LNavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';

export default {
  components: {
    LNavBar,
    BackMiniNav
  },
  props: ['courseID','courseName'],
  data(){
    return {
    }
  },
  methods: {
  }
}
</script>
