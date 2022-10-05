<template>
    <NavBar/>
    <div class="container">
        <br>
      
      <h1>View Job Roles</h1>
      <div class = "row">
        <div class = "col" style = "text-align: right;">
          <button type="button" class="btn btn-outline-primary" >Create new Role</button>
        </div>
      </div>
      <br>
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
              <select class="form-select" aria-label="Default select example" id = "assignskills" multiple>
                  <option disabled>Select Skills Here</option>
                  <option v-for="skill in skills" v-bind:key = skill.id v-bind:value= skill.id> {{skill.title}} </option>
                </select>
                <br>
                <button type="button" class="btn btn-outline-primary btn-sm">Confirm</button>
                <br>
              <a v-bind:href = role.url>Edit</a>
              <br>
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
  import NavBar from '../components/NavBar.vue';
  export default {
    components: {
      NavBar,
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
        ]
      }
    }
  }
  </script>
  
  <style>
  </style>