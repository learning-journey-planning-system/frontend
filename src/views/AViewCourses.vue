<template>
    <NavBar/>
    <div class="container">
        <br>
      
      <h1>View Courses</h1>
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
              <h5 class="card-title">Course ID: {{course.id}} <br> Name: {{course.title}} <br> Description: {{course.description}} <br> Status: {{course.status}} <br> Type: {{course.type}}   <br> Category: {{course.category}}</h5>
              <br>
              <h6>Assign Skills</h6>
              <form @submit.prevent = "onSubmit(course.id)" >
                <select class="form-select" aria-label="Default select example" v-model = "skillchoices" multiple >
                    <option disabled>Select Skills Here</option>
                    <option v-for="skill in skills" v-bind:key = skill.id v-bind:value= skill.id> {{skill.title}} </option>
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
  export default {
    components: {
      NavBar,
    },
    data(){
      return{
        courses: [
          {title: 'Web Application Development', id: 1, details: 'loren', status:'Inactive' , url:'http://www.google.com', skills: ["Python", "Tableau"]},
          {title: 'Software Developer', id: 2, details: 'lorenz'},
          {title: 'Human Resource', id: 3, details: 'lorenz'},
          {title: 'Business Analyst', id: 4, details: 'lorenz'},
        ],
        skills:[
          {title: 'Tableau' , id: 1},
          {title: 'Javascript' , id: 5}
        ],
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
    }
  }
  </script>
  
  <style>
  </style>