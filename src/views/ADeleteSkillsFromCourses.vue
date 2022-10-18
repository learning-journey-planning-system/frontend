<template>
  <NavBar/>
  <BackMiniNav message="Viewing Courses"/>
  <div class="container">
    <h2 class="mt-2">Delete Skills from {{courseName}}</h2>
    <br>
      <div class="col-4">
        <div class="card shadow-sm">
          <div class="card-body" style = "padding-bottom:5px;">
            <h6>Select Skills</h6>
            <form @submit.prevent = "onSubmit()" >
              <select class="form-select" aria-label="Default select example" v-model = "selectedSkill" multiple>
                  <option disabled>Select Skills Here</option>
                  <option v-for="skill in availSkills" :key = skill.id :value = skill.id> {{skill.skill_name}} </option>
                </select>
              <span class="text-muted">Hold shift to select multiple skills</span>
              <p class = "d-flex justify-content-between" style = "padding-top:10px">
                <input type="submit" class="btn btn-outline-primary btn-sm">
              </p>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>
  
<script>
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import axios from 'axios'

export default {
  components: {
    NavBar,
    BackMiniNav,
  },
  props: ['courseID', 'courseName'],
  data(){
    return{
      skills: null,
      selectedSkill: null,
    }
  },
  created() {
    // sessionStorage.setItem("previousPageTitle", "View Courses")
  },
  methods:{
    onSubmit(){
      if(this.selectedSkill == null){
        alert("Please select something")
      } else{
        let promises = [];
        let users = [];
        for (let i = 0; i < this.selectedSkill.length; i++) {
          promises.push(
            axios.delete(`http://127.0.0.1:8000/api/v1/course/${this.courseID}/delete_skill/${this.selectedSkill[i]}`).then(response => {
              users.push(response);
            })
          )
        }
        Promise.all(promises).then(alert("Skill has been successfully deleted!"));
        window.location.reload()
      }
    },
  },
  mounted(){
    axios
      .get(`http://127.0.0.1:8000/api/v1/course/${this.courseID}/all_skills/`)
      .then(response => (this.skills = response.data))
  },
  computed: {
    availSkills() {
      let availSkills = []
      for (const ele in this.skills){
        if (!this.skills[ele].deleted){
          availSkills.push(this.skills[ele])
        }
      }
      return availSkills
    },
  }
}
</script>

<style>
</style>