<template>
  <NavBar/>
  <MiniNav><h1>Welcome, {{staffname}}</h1></MiniNav>
    <div class="album">
    <div class="container">
      <h2 class="mt-2">Browse all roles</h2>
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
import NavBar from '../components/NavBar.vue';
import MiniNav from '../components/MiniNav.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    NavBar,
    MiniNav,
  },
  props: ['roleType'],
  data(){
    return{
      roles: null
    }
  },
  computed: {
    // stafftype(){
    //   return sessionStorage.getItem("staffType")
    // },
    staffname(){
      return sessionStorage.getItem("staffName")
    }
  },
  methods: {
    sendData(roleDetails) {
      if(roleDetails[1] != 'true'){
        sessionStorage.setItem("jobroleID", roleDetails[0])
        this.$router.push({name:'LViewSkills', params: {roleID: roleDetails[0], rolename: roleDetails[2]}}); 
      }
    },
  },
  mounted() {
    if(sessionStorage.getItem("jobroleID") != null){
      sessionStorage.removeItem("jobroleID")
    }
    axios
    .get('http://127.0.0.1:8000/api/v1/jobrole/available/')
    .then(response => (this.roles = response.data))

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