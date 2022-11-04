<template>
  <NavBar/>
  <BackMiniNav message="Viewing Courses"/>
  <div class="container">
    <h2 class="mt-2">Edit {{jobRoleName}} Job Role</h2>
      <form>
        <div class="mb-2">
          <label>Job Role</label>
          <input class="form-control" v-model="editedJobName" placeholder="Enter Job Name">
          <div class="form-text">
            Please capitalize the first letter of each word.
          </div>
        </div>
        <button @click="editJob()" type="button" class="btn btn-success mt-2">Submit</button>
      </form>
  </div>
</template>
  
<script>
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import axios from 'axios'

export default {
  components: {
    NavBar,
    BackMiniNav,
  },
  props: ['jobroleID', 'jobroleName'],
  data(){
    return{
      editedJobName: "",
      allJobs: [],
      jobRoleName : "",
    }
  },
  created() {
    axios
    .get("http://127.0.0.1:8000/api/v1/jobrole/")
    .then((response) => {
      response.data.forEach(ele => this.allJobs.push(ele.jobrole_name))
    })
  },
  methods:{
      editJob(){
        if(this.editedJobName.length == 0){
          alert("Edited Job name cannot be empty, please try again.")
        }
        else if(this.editedJobName.length > 30){
          alert("The maximum number of characters for new job name is 30. Please try again.")
        }

        else{
          var jobID = sessionStorage.getItem("jobroleID")
          if(!this.allJobs.includes(this.editedJobName)){
          axios
          .put(`http://127.0.0.1:8000/api/v1/jobrole/` + jobID, {
            jobrole_name: this.editedJobName
          })
          .then(function(response){
            console.log(response)
            alert("Job has been successfully edited!");
            history.back()
          })
      } else{
        alert("Job with this name already exists")
      }
        }
    },
  },
  mounted(){
    this.jobRoleName = sessionStorage.getItem("jobRoleName")
  }
}
</script>

<style>
</style>