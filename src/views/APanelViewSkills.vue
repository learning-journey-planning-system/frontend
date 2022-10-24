<template>
  <NavBar/>
  <BackMiniNav message="Admin Panel"/>
  <div class="container">
    <h2 class="mt-2">View Skills</h2>
    <div class = "row">
      <div class = "col" style = "text-align: right;">
        <button @click="() => togglePopup('buttonTrigger')" type="button" class="btn btn-outline-primary">Create New Skill</button>
        <CreateSkill v-if="popupTriggers.buttonTrigger" :togglePopup="() => togglePopup('buttonTrigger')"/>
      </div>
    </div>
    <br>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col" v-for="skill in skills"  :key=skill.id>
        <div class="card shadow-sm" style="height: 8rem;">
          <div class="card-body" style = "padding-bottom:5px;">
            <h5 class="card-title">{{skill.skill_name}}</h5>
            <div class="d-flex justify-content-between align-items-center">
                Skill ID: {{skill.id}}
              <small class="text-muted"><button v-if="skill.deleted == true" type="button" class="btn btn-sm btn-outline-danger disabled">Deleted</button> <button v-else disabled type="button" class="btn btn-sm btn-outline-success">Active</button></small>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3 me-1 ">
            <small @click="editSkills([skill.id, skill.skill_name])" class="text-muted" v-if="skill.deleted != true">Edit</small>
              <small class="text-muted"><div v-if="skill.deleted != true" @click="deleteSkill(skill.id)" style="cursor: default;" class="text-danger">Delete</div></small>
            </div>
            <br>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>
  
<script>
import {ref} from 'vue';
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import CreateSkill from '../components/CreateSkill.vue';
import axios from 'axios'

export default {
  components: {
    NavBar,
    BackMiniNav,
    CreateSkill,
  },
  setup(){
    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const togglePopup = (trigger) =>{
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }
    return {
      CreateSkill,
      popupTriggers,
      togglePopup,
    }
  },
  data(){
    return{
      skills: null,
    }
  },
  created() {
    sessionStorage.setItem("previousPageTitle", "View Skills")
  },
  mounted(){
    axios
        .get("http://127.0.0.1:8000/api/v1/skill/")
        .then((response) => {
          this.skills = response.data;
        })
  },
  methods: {
    deleteSkill(skillID){
      axios
        .delete(`http://127.0.0.1:8000/api/v1/skill/${skillID}`)
        .then(() => {
          alert("Skill has been successfully soft-deleted!")
          window.location.reload()
        })
    },
    editSkills(skillDetails){
      this.$router.push({name:'AEditSkillsfromSkills', params: {skillID: skillDetails[0], skillName: skillDetails[1]}});
    }
  }
}
</script>
  
<style>
  .skillButton{
    min-width: 170px;
    max-width: 170px;
  }
  </style>