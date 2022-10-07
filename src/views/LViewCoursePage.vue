<template>
  <LNavBar />
  <BackMiniNav message="Job Role Name here!!!" />
  <div class="container">

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
  props: ['courseID']
}
</script>
