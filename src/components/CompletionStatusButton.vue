<template>

  <button type="button" class="btn btn-primary mb-3 btn-sm">{{completionStatus}}</button>
  
</template>

<script>
import axios from 'axios'


export default {
  name: 'CompletionStatusButton',
  data(){
    return {
      completionStatus: ''
    }
  },
  mounted() {
    var staffId = sessionStorage.getItem("staffID");
    var courseId = sessionStorage.getItem("courseID");
    axios
      .get(`http://127.0.0.1:8000/api/v1/staff/${staffId}/courses/${courseId}/completion_status`)
      .then((response) => {
        this.completionStatus = response.data.msg
      })
  }
}
</script>
