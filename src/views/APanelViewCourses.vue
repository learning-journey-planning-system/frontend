<template>
  <NavBar/>
  <BackMiniNav message="Admin Panel"/>
  <div class="container">
    <h2 class="mt-2">View Courses</h2>
    <div class="card" style="width: 13rem;">
      <div class="card-body">
        <b>Legend: </b> 
        <span class="text-success">Active Skill</span> 
        <span class="text-danger ms-1">Deleted Skill</span>
      </div>
    </div>
    <br>
    <div class="row"  v-for="course in courses"  :key=course.id style = "margin-bottom:10px;">
      <div class="col-4">
        <div class="card shadow-sm">
          <div class="card-body" style = "padding-bottom:5px;">
            <div class="card-title"><h5>{{course.course_name}}</h5><b>Course ID: {{course.id}} </b><br> <b> Description: </b> {{course.course_desc}} <br> <b>Status:  </b> 
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
              </p>
            </form>
            
          </div>
        </div>
      </div>
      <div class = "col-4">
          <h5> Skills Assigned <button v-if="course.course_status == 'Active'" @click="deleteSkills([course.id, course.course_name])" type="button" class="btn btn-sm btn-warning ms-2 mb-1">Delete Skills</button></h5> 
          <p v-if = "course.skills.length != 0"><span v-for="skill in course.skills" v-bind:key = skill.id> 
               <span v-if="skill.deleted == false"  style = "color:green">{{skill.skill_name}} <br></span>
               <span v-else style = "color:red">{{skill.skill_name}} <br> </span> 
            </span>
          </p>
          <p v-else>
             No skills assigned for this course currently.
          </p>
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
    BackMiniNav,
  },
  data(){
    return{
      courses: null,
      skills: null,
      skillchoices: ["Empty"],
    }
  },
  created() {
    sessionStorage.setItem("previousPageTitle", "View Courses")
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
        for(i = 0; i < arrayOfSkills.length ; i ++){
          axios
          .post("http://127.0.0.1:8000/api/v1/course/"+ courseid + "/new_skill/?skill_id=" + arrayOfSkills[i])
          .then(function(response){
            console.log(response.data)
            alert("Skill has been successfully added!");
          })
          .catch(function(error){
            if(error.response){
              alert(error.response.data.detail);
            }
          })
        }
        window.location.reload()
      }
      this.skillchoices = [];
    },
    deleteSkills(courseDetails){
      // console.log(courseID)
      this.$router.push({name:'ADeleteSkillsFromCourses', params: {courseID: courseDetails[0], courseName: courseDetails[1]}});  
    }
  },

  mounted(){
    axios
      .get('http://127.0.0.1:8000/api/v1/course/')
      .then((response) => {this.courses = response.data;
        axios
          .get("http://127.0.0.1:8000/api/v1/skill/available/")
          .then((response) => {this.skills = response.data;
            this.courses.forEach(course => {
              axios
              .get("http://127.0.0.1:8000/api/v1/course/" + course.id + "/")
              .then((response) => {
                var courseSkills = response.data.skills;
                var specifiedcourse = this.courses.find(x   => x.id === course.id)
                specifiedcourse.skills = courseSkills;
              })
            })
          })
        })
  }
}
</script>

<style>
</style>