<template>
  <NavBar/>
  <BackMiniNav message="Viewing Courses"/>
  <div class="container">
    <h2 class="mt-2">Edit {{skillName}} Skill</h2>
      <form>
        <div class="mb-2">
          <label>Skill Name</label>
          <input class="form-control" v-model="editedSkillName" placeholder="Enter Skill Name">
          <div class="form-text">
            Please capitalize the first letter of each word
          </div>
        </div>
        <button @click="submitSkill()" type="button" class="btn btn-success mt-2">Submit</button>
      </form>
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
  props: ['skillID', 'skillName'],
  data(){
    return{
      editedSkillName: null,
      allSkills: []
    }
  },
  created() {
    axios
    .get("http://127.0.0.1:8000/api/v1/skill/")
    .then((response) => {
      response.data.forEach(ele => this.allSkills.push(ele.skill_name))
    })
  },
  methods:{
    submitSkill(){
      if (this.editedSkillName.length > 30){
        alert("Please enter a skill name that is 30 characters or less")
      }
      else{
        this.editSkills()
      }
    },
      editSkills(){
        if(!this.allSkills.includes(this.editedSkillName)){
          axios
          .put(`http://127.0.0.1:8000/api/v1/skill/${this.skillID}`, {
            skill_name: this.editedSkillName
          })
          .then(function(response){
            console.log(response)
            alert("Skill has been successfully edited!");
            history.back()
          })
      } else{
        alert("Skill with this skill name already exists")
      }
    },
  }
}
</script>

<style>
</style>