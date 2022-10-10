<template>
  <NavBar/>
  <BackMiniNav message="Admin Panel"/>
  <div class="container">
    <h2 class="mt-2">View Courses</h2>
    <div class = "row">
      <div class = "col" style = "text-align: right;">
        <button type="button" class="btn btn-outline-primary" >Create new Role</button>
      </div>
    </div>
    <br>
    <div class="row"  v-for="course in courses"  :key=course.id style = "margin-bottom:10px;">
      <div class="col-4">
        <div class="card shadow-sm">
          <div class="card-body" style = "padding-bottom:5px;">
            <div class="card-title"><b>Course ID:   {{course.id}} </b><br> <b>Name: </b> {{course.course_name}} <br> <b> Description: </b> {{course.course_desc}} <br> <b>Status:  </b> 
              <span v-if="course.course_status == 'Active'" style = "color:green"> {{course.course_status}} </span> <span v-else style = "color:red"> {{course.course_status}}</span> <br> <b>Type: </b> {{course.course_type}}   <br> <b> Category: </b> {{course.course_category}}</div>
            <br>
            <h6>Assign Skills</h6>
            <form @submit.prevent = "onSubmit(course.id)" >
              <select class="form-select" aria-label="Default select example" v-model = "skillchoices" multiple >
                  <option disabled>Select Skills Here</option>
                  <option v-for="skill in skills" v-bind:key = skill.id v-bind:value= skill.id> {{skill.skill_name}} </option>
                </select>
            
              <p class = "d-flex justify-content-between" style = "padding-top:10px">
                <input type="submit" class="btn btn-outline-primary btn-sm">
                <a v-bind:href = course.url>Edit</a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div class = "col-4">
          <h5> Skills Assigned: </h5>
          <p v-if = "course.skills!=null">{{course.skills.join(", ")}}</p>
      </div>
    </div>    
  </div>
</template>
  
  <script>
import NavBar from '../components/NavBar.vue';
import BackMiniNav from '../components/BackMiniNav.vue';
import axios from 'axios'

export default {
  components: {
    NavBar,
    BackMiniNav
  },
  data(){
    return{
      courses: null,
      skills: null,
      skillchoices: ["Empty"],
    }
  },

  methods:{
    onSubmit(courseid){
      const target_copy = Object.assign({}, this.skillchoices);
      if(target_copy[0] == "Empty"){
        alert("Please select something")
      }
      else{
        var arrayOfSkills = [];
        for(var i =0; i < this.skillchoices.length; i++){
          arrayOfSkills.push(target_copy[i])
        }
        console.log("Course ID: " + courseid)
        console.log(arrayOfSkills)
      }
      this.skillchoices = [];
    },
  },

  mounted(){
    axios
      .get('http://127.0.0.1:8000/api/v1/course/')
      .then((response) => {this.courses = response.data;
        axios
          .get("http://127.0.0.1:8000/api/v1/skill/")
          .then((response) => {this.skills = response.data;})
        })
  }
}
</script>

<style>
</style>