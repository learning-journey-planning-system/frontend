<template>
  <NavBar/>
    <div class="bg-light">
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Welcome Learner</h1>
          </div>
          <div class="col">
            <button type="button" class="btn btn-sm btn-outline-primary float-end">View My Learning Journeys</button>
          </div>
        </div>
      </div>
    </div>
    <div class="album">
    <div class="container">
        <h2>Browse all roles</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="role in roles" :key=role.id>
          <div @click="sendData([role.id, role.status, role.title])" class="card shadow-sm" style="height: 6rem;">
            <div style="cursor: default;" class="card-body">
              <h5 class="card-title">{{role.title}}</h5>
              <!-- <router-link style="text-decoration: none; color: inherit;" :to="'/SkillPage/' + role.id"></router-link> -->
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button v-if="role.status == 'Inactive'" type="button" class="btn btn-sm btn-outline-danger">{{role.status}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import NavBar from '../components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  props: ['roleType'],
  data(){
    return{
      roles: [
        {title: 'Data Analyst', id: 1, status: 'Active',
        skills: ['Data Analysis', 'Python']},
        {title: 'Data Scientist', id: 2, status: 'Active',
        skills:['Data Analysis']},
        {title: 'Data Engineer', id: 3, status: 'Inactive',
        skills:['Communication', 'Tableau']},
        {title: 'Machine Learning Engineer', id: 4, status: 'Active',
        skills:['Java']},
      ]
    }
  },
  methods: {
    sendData(roleDetails) {
      if(roleDetails[1] != 'Inactive'){
        this.$router.push({name:'SkillPage', params: {roleID: roleDetails[0]}}); 
      }
    },
  },  
}

</script>

<style>
.btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary:visited {
    border-color: #6a0dad !important;
    color: #6a0dad
}
.btn-outline-primary:hover, .btn-outline-primary:visited {
    background-color: #6a0dad !important;
}
</style>