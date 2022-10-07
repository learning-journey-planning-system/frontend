<template>
  <ANavBar/>
  <BackMiniNav message="Admin Panel"/>
  <div class="container">
    <h2>View Skills</h2>
    <div class = "row">
      <div class = "col" style = "text-align: right;">
        <button type="button" class="btn btn-outline-primary" >Create New Skill</button>
      </div>
    </div>
    <br>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col" v-for="skill in skills"  :key=skill.id>
        <div @click="sendData([skill.id, skill.status])" class="card shadow-sm" style="height: 7rem;">
          <div class="card-body" style = "padding-bottom:5px;">
            <h5 class="card-title">{{skill.skill_name}}</h5>
            <div class="d-flex justify-content-between align-items-center">
                Skill ID: {{skill.id}}
              <small class="text-muted"><button v-if="skill.deleted == true" type="button" class="btn btn-sm btn-outline-danger disabled">Deleted</button></small>
            </div>
            <a v-bind:href = skill.url>Edit</a>
            <br>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>
  
  <script>
  import ANavBar from '../components/ANavBar.vue';
  import BackMiniNav from '../components/BackMiniNav.vue';
  import axios from 'axios'

  export default {
    components: {
      ANavBar,
      BackMiniNav,
    },
    data(){
      return{
        skills: null,
      }
    },

    mounted(){
      axios
          .get("http://127.0.0.1:8000/api/v1/skill/")
          .then((response) => {this.skills = response.data;})
    }
  }
  </script>
  
  <style>
  .skillButton{
    min-width: 170px;
    max-width: 170px;
  }
  </style>