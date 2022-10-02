<template>
  <TheNavbar />
  <SkillCard  SkillName = "Javascript" deleted="false" SkillID = "1" SkillURL = "http://www.google.com"></SkillCard>
</template>

<script>
import TheNavbar from './components/TheNavbar.vue';
import SkillCard from './components/SkillCard.vue';


export default {
  name: 'App',
  components: {
    TheNavbar,
    SkillCard,
}
}
</script>