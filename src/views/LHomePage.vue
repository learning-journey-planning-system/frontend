<template>
  <LNavBar/>
  <MiniNav message="Welcome Learner"/>
    <div class="album">
    <div class="container">
      <h2>Browse all roles</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="role in roles" :key=role.id>
          <div @click="sendData([role.id, role.deleted, role.jobrole_name])" class="card shadow-sm" style="height: 6rem;">
            <div style="cursor: default;" class="card-body">
              <h5 class="card-title">{{role.jobrole_name}}</h5>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button disabled v-if="role.deleted == 'true'" type="button" class="btn btn-sm btn-outline-danger">{{role.deleted}}</button>
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
import LNavBar from '../components/LNavBar.vue';
import MiniNav from '../components/MiniNav.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    LNavBar,
    MiniNav,
  },
  props: ['roleType'],
  data(){
    return{
      roles: null
    }
  },
  methods: {
    sendData(roleDetails) {
      if(roleDetails[1] != 'true'){
        this.$router.push({name:'LViewSkills', params: {roleID: roleDetails[0], rolename: roleDetails[2]}}); 
      }
    },
  },
  mounted() {
    axios
      .get('http://localhost:8080/api/v1/jobrole/available/') // to resolve CORS error -> will be mapped to http://127.0.0.1:8000/api/v1/jobrole/ cos we using a proxy to mask client's domain (localhost:8080)
      .then(response => (this.roles = response.data)) // returns LIST of roles (as OBJECTS)
  }
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