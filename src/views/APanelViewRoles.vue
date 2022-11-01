<template>
  <NavBar/>
  <BackMiniNav message="Admin Panel"/>
  <div class="container">
    <h2 class="mt-2">View Job Roles</h2>
    <div class="card" style="width: 13rem;">
      <div class="card-body">
        <b>Legend (skills): </b> 
        <span class="text-success">Active</span> 
        <span class="text-danger ms-1">Deleted</span>
      </div>
    </div>
    <div class = "row">
      <div class = "col" style = "text-align: right;">
        <button @click="() => togglePopup('buttonTrigger')" type="button" class="btn btn-outline-primary">Create New Job Role</button>
        <CreateJobRole v-if="popupTriggers.buttonTrigger" :togglePopup="() => togglePopup('buttonTrigger')"/>
      </div>
    </div>
    <div class="row"  v-for="role in roles"  :key=role.id style = "margin-bottom:10px;">
      <div class="col-4">
        <div class="card shadow-sm">
          <div class="card-body" style = "padding-bottom:5px;">
            <div class = "d-flex justify-content-between "> <h5 class="card-title">{{role.jobrole_name}}</h5> </div>
            <p class = "d-flex justify-content-between align-items-center">
                Job Role ID: {{role.id}}
              <small class="text-muted"><button v-if="role.deleted == true" type="button" class="btn btn-sm btn-outline-danger disabled">Deleted</button> <button v-else disabled type="button" class="btn btn-sm btn-outline-success">Active</button></small>
            </p> 
            <br>
            <h6>Assign Skills</h6>
            <form @submit.prevent = "onSubmit(role.id)" >
              <select class="form-select" aria-label="Default select example" v-model = "skillchoices" multiple >
                  <option disabled>Select Skills Here</option>
                  <option v-for="skill in skills"   v-bind:key = skill.id v-bind:value= skill.id> {{skill.skill_name}} </option>
                </select>
            
              <p class = "d-flex justify-content-between" style = "padding-top:10px">
                <input type="submit" class="btn btn-outline-primary btn-sm">
                <small class="text-muted"><div v-if="!role.deleted" @click="deleteJobRole(role.id)" style="cursor: default;" class="text-danger">Delete Job Role</div></small>
                <input type="submit" class="btn btn-outline-primary btn-sm"> <small @click="editJob([role.id, role.jobrole_name])" class="text-muted" v-if="role.deleted != true">Edit</small>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div class = "col-4">
          <h5> Skills Assigned <button v-if="!role.deleted" @click="deleteSkills([role.id, role.jobrole_name])" type="button" class="btn btn-sm btn-warning ms-2 mb-1">Delete Skills</button></h5>
          <p v-if = "role.skills.length != 0"><span v-for="skill in role.skills" v-bind:key = skill.id> 
               <span v-if="skill.deleted == false"  style = "color:green">{{skill.skill_name}} <br></span>
               <span v-else style = "color:red">{{skill.skill_name}} <br> </span> 
            </span>
          </p>
          <p v-else>
             No skills assigned for this job role currently.
          </p>
      </div>
    </div>    
  </div>
  
</template>
  
<script>
import {ref} from 'vue';
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue'
import CreateJobRole from '../components/CreateJobRole.vue';
import axios from 'axios'

export default {
  components: {
    NavBar,
    BackMiniNav,
    CreateJobRole
  },
  setup(){
    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const togglePopup = (trigger) =>{
      popupTriggers.value[trigger] = !popupTriggers.value[trigger]
    }
    return {
      CreateJobRole,
      popupTriggers,
      togglePopup
    }
  },
  data(){
    return{
      roles: null,
      skills: null,
      skillchoices:["Empty"]
    }
  },
created() {
  sessionStorage.setItem("previousPageTitle", "View Job Roles")
},
  methods:{
    deleteJobRole(roleID){
      axios
        .delete(`http://127.0.0.1:8000/api/v1/jobrole/${roleID}`)
        .then(() => {
          alert("Job Role has been successfully soft-deleted!")
          window.location.reload()
        })
    },
    onSubmit(roleid){
      var specifiedJob = this.roles.find(x   => x.id === roleid)
      if(specifiedJob.deleted == true){
        alert("This job role is inactive, you cannot assign skills to inactive job roles. ")
      }
      else{
      const target_copy = Object.assign({}, this.skillchoices);
      if(target_copy[0] == "Empty"){
        alert("Please select something")
      }
      else{
        var arrayOfSkills = [];
        for(var i =0; i < this.skillchoices.length; i++){
          arrayOfSkills.push(target_copy[i])
        }
        console.log("Course ID: " + roleid)
        console.log(arrayOfSkills)
         axios
          .post("http://127.0.0.1:8000/api/v1/jobrole/"+ roleid + "/new_skills/" , arrayOfSkills) 
          .then(function(response){
            var data = response.data
            if(data[0].length == 0 & data[1].length == 0){
              if(alert("Skills has been successfully added")){
                return
              }
              else{
                window.location.reload(); 
              }
            }
            else{
              if(data[1].length == arrayOfSkills.length){
               if(alert("Skill(s): " + data[1].join(", ") + " cannot be added as they have already been previously added to the job role.")){
                return
               }
               else{
                window.location.reload(); 
               }
              }
              else{
                if(alert("Skill(s): " + data[1].join(", ") + " cannot be added as they have already been previously added to the job role. However, the remaining skill(s) have been successfully added.")){
                  return
                }
                else{
                  window.location.reload(); 
                }
              }
            }
          })
      }
      this.skillchoices = [];
    }},
    deleteSkills(roleDetails){
      // console.log(roleDetails)
      this.$router.push({name:'ADeleteSkillsFromRoles', params: {roleID: roleDetails[0], roleName: roleDetails[1]}}); 
    },

    editJob(jobDetails){
      sessionStorage.setItem("jobroleID", jobDetails[0])
      sessionStorage.setItem("jobRoleName", jobDetails[1])
      this.$router.push({name:'AEditJobRolesfromJob', params: {jobID: jobDetails[0], jobName: jobDetails[1]}});
    }

  },
  mounted() {
  sessionStorage.removeItem("jobroleID")
  sessionStorage.removeItem("jobRoleName")
  axios
    .get('http://127.0.0.1:8000/api/v1/jobrole/')
    .then((response) => {this.roles = response.data;
      axios
        .get("http://127.0.0.1:8000/api/v1/skill/available/")
        .then((response) => {this.skills = response.data;
          this.roles.forEach(role => {
              axios
              .get("http://127.0.0.1:8000/api/v1/jobrole/" + role.id +"/skills/")
              .then((response) => {
                var jobSkills = response.data;
                var specifiedJob = this.roles.find(x   => x.id === role.id)
                specifiedJob.skills = jobSkills;
              })
            })})
      })

}
}
</script>
  
<style>
  </style>