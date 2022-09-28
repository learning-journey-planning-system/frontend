<template>
  <div class="container">
    <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'HomePage'} "><h1 class="goBack"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrow-left-circle mb-2" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
  </svg> Job Roles</h1></router-link></a>
    
      <!-- rmb to add back button -->
    <div class="d-flex flex-column flex-shrink-0 p-3" style="width: 280px;">
      <h2 class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        <span class="fs-4">Replace with Job Role Selected</span>
      </h2>
      <p>Browse skills and courses</p>
      <ul class="nav flex-column" v-for="skill in skills" :key=skill.id>
        <li class="nav-item mb-3">
          <button type="button" class="skillButton btn btn-outline-secondary">{{skill.title}}</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return{
      skills: [
        {title: 'Data Analysis', id: 1, details: 'loren'},
        {title: 'Python', id: 2, details: 'lorenz'},
        {title: 'Java', id: 3, details: 'lorenz'},
        {title: 'Communication', id: 4, details: 'lorenz'},
        {title: 'Tableau', id: 5, details: 'lorenz'},
      ]
    }
  }
}
</script>

<style>
.skillButton{
  min-width: 170px;
  max-width: 170px;
}
</style>