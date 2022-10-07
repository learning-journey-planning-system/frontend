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
    <div class="container mt-4" style="margin-left: 240px;">
      <div class="row" style="text-align: center;" >
        <div class="col-lg-3">
          <div class="card" style="width: 18rem;">
            <router-link style="text-decoration: none; color: inherit;" :to="{name: 'AViewRoles'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person mt-3" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
            </svg>
            <div class="card-body">
              <h5 class="card-title">View Job Roles</h5>
            </div></router-link>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card" style="width: 18rem;">
            <router-link style="text-decoration: none; color: inherit;" :to="{name: 'AViewSkills'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-lightning mt-3" viewBox="0 0 16 16">
              <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z"/>
            </svg>
            <div class="card-body">
              <h5 class="card-title">View Skills</h5>
            </div></router-link>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card" style="width: 18rem;">
            <router-link style="text-decoration: none; color: inherit;" :to="{name: 'AViewCourses'}">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-file-earmark-text mt-3" viewBox="0 0 16 16">
              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
            </svg>
            <div class="card-body">
              <h5 class="card-title">View Courses</h5>
            </div></router-link>
          </div>
        </div>
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