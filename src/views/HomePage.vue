<template>
  <NavBar/>
    <div class="album py-5">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div class="col" v-for="role in roles" :key=role.id>
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">{{role.title}}</h5>
              <p class="card-text"></p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small class="text-muted">9 mins</small>
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
        {title: 'Data Analyst', id: 1, status: 'Inactive'},
        {title: 'Data Scientist', id: 2, status: 'Active'},
        {title: 'Data Engineer', id: 3, status: 'Active'},
        {title: 'Machine Learning Engineer', id: 4, details: 'Active'},
      ]
    }
  }
}

</script>