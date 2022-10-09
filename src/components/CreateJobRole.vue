<template>
  <div class="popup">
    <div class="popup-inner">
      <svg @click="togglePopup()" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle popup-close" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
      <form>
        <h2 class="mb-2">Create a Job Role</h2>
        <div class="mb-2">
          <label>Job Role Name</label>
          <input class="form-control" v-model="jobroleName" placeholder="Enter Job Role Name">
          <div class="form-text">
            Please capitalize the first letter of each word
          </div>
        </div>
        <button @click="submitJobrole()" type="button" class="btn btn-success mt-2">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: ["togglePopup"],
  methods: {
    submitJobrole(){
      if (this.jobroleName.length > 30){
        alert("Please enter a job role name that is 30 characters or less")
      } else{
        this.addJobrole()
      }
    },
    addJobrole(){
      axios
        .post("http://127.0.0.1:8000/api/v1/jobrole/", {
          jobrole_name: this.jobroleName
        })
        .then(function(response){
          console.log(response)
          alert("Role has been successfully added!");
          window.location.reload()
        })
        .catch(function(error){
          if (error.response) {
          alert(error.response.data.detail);
        }
        })
    }
  }
}
</script>

<style>
.popup{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.popup-inner{
  background: #FFFFFF;
  padding: 30px 50px 30px 50px;
  border-radius: 5px;
}

.popup-close{
  position: relative;
  left: 170px;
  bottom: 25px;
}
</style>