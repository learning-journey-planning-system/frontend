<template>
  <NavBar/>
    <div class="album">
    <div class="container">
      <h1>Roles</h1>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="role in roles" :key=role.id>
          <div @click="sendData([role.id, role.status])" class="card shadow-sm" style="height: 6rem;">
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