<template>
    <ANavBar/>
    <MiniNav message="Welcome Admin"/>
    <div class="container">
      <h2>View Job Roles</h2>
      <div class = "row">
        <div class = "col" style = "text-align: right;">
          <button type="button" class="btn btn-outline-primary" >Create new Role</button>
        </div>
      </div>
      <div class="row"  v-for="role in roles"  :key=role.id style = "margin-bottom:10px;">
        <div class="col-4">
          <div class="card shadow-sm">
            <div class="card-body" style = "padding-bottom:5px;">
              <h5 class="card-title">{{role.title}}</h5>
              <p class = "d-flex justify-content-between align-items-center">
                  Role ID: {{role.id}}
                <small class="text-muted"><button v-if="role.status == 'Inactive'" type="button" class="btn btn-sm btn-outline-danger disabled">{{role.status}}</button></small>
              </p> 
              <br>
              <h6>Assign Skills</h6>
              <form @submit.prevent = "onSubmit(role.id)" >
                <select class="form-select" aria-label="Default select example" v-model = "skillchoices" multiple >
                    <option disabled>Select Skills Here</option>
                    <option v-for="skill in skills" v-bind:key = skill.id v-bind:value= skill.id> {{skill.title}} </option>
                  </select>
              
                <p class = "d-flex justify-content-between" style = "padding-top:10px">
                  <input type="submit" class="btn btn-outline-primary btn-sm">
                  <a v-bind:href = role.url>Edit</a>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div class = "col-4">
            <h5> Skills Assigned: </h5>
            <p v-if = "role.skills!=null">{{role.skills.join(", ")}}</p>
        </div>
      </div>    
    </div>
  
  </template>
  
  <script>
  import ANavBar from '../components/ANavBar.vue';
  import MiniNav from '../components/MiniNav.vue'
  export default {
    components: {
      ANavBar,
      MiniNav
    },
    data(){
      return{
        roles: [
          {title: 'Data Analyst', id: 1, details: 'loren', status:'Inactive' , url:'http://www.google.com', skills: ["Python", "Tableau"]},
          {title: 'Software Developer', id: 2, details: 'lorenz'},
          {title: 'Human Resource', id: 3, details: 'lorenz'},
          {title: 'Business Analyst', id: 4, details: 'lorenz'},
        ],
        skills:[
          {title: 'Tableau' , id: 1},
          {title: 'Javascript' , id: 2}
        ],
        skillchoices:["Empty"]
      }
    },

    methods:{
      onSubmit(roleid){
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
        }
        this.skillchoices = [];
      },
    }
  }
  </script>
  
  <style>
  </style>