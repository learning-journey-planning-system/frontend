<template>
    <ANavBar/>
    <div class="bg-light">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Admin Panel</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class = "row">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="#"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'AViewRoles'}">View Job Roles</router-link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'AViewSkills'}">View Skills</router-link></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">View Courses</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
</template>
  
  <script>
  import ANavBar from '../components/ANavBar.vue';

  export default {
    components: {
      ANavBar,
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
        skillchoices:[]
      }
    },

    methods:{
      onSubmit(roleid){
        console.log(roleid)
      },
    }
  }
  </script>
  
  <style>
  </style>