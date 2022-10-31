<template>

  <button v-show=showButton(notRegistered,completionStatus) type="button" class="btn btn-secondary mb-3 btn-sm">
  <svg style="margin-bottom: 2px; margin-right: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/></svg>
    Not Registered
  </button>

  <button v-show=showButton(registrationRejected,completionStatus) type="button" class="btn btn-danger mb-3 btn-sm">
    <svg style="margin-bottom: 2px; margin-right: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
    Registration Rejected
  </button>

  <button v-show=showButton(registrationWaitlist,completionStatus) type="button" class="btn btn-warning mb-3 btn-sm">
    <svg style="margin-bottom: 2px; margin-right: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hourglass-split" viewBox="0 0 16 16"><path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z"/></svg>
    Registration Waitlist
  </button>

  <button v-show=showButton(ongoing,completionStatus) type="button" class="btn btn-primary mb-3 btn-sm">
    <svg style="margin-bottom: 2px; margin-right: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16"><path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/><path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/></svg>
    Ongoing
  </button>

  <button v-show=showButton(completed,completionStatus) type="button" class="btn btn-success mb-3 btn-sm">
    <svg style="margin-bottom: 2px; margin-right: 2px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/></svg>
    Completed
  </button>
  
</template>

<script>
import axios from 'axios'

// Completion Status
// (1) Not Registered
// (2) Registration Rejected
// (3) Registration Waitlist
// (4) Ongoing
// (5) Completed

export default {
  name: 'CompletionStatusButton',
  props:['courseID'],
  data(){
    return {
      completionStatus: '',
      notRegistered: "Not Registered",
      registrationRejected: "Registration Rejected",
      registrationWaitlist: "Registration Waitlist",
      ongoing: "Ongoing",
      completed: "Completed",
    }
  },
  created() {
    var staffID = sessionStorage.getItem("staffID");
    // console.log('courseid from this page', this.courseID)
    if (!this.courseID) {
      var courseId = sessionStorage.getItem("courseID");
      axios
        .get(`http://127.0.0.1:8000/api/v1/staff/${staffID}/courses/${courseId}/completion_status`)
        .then((response) => {
          this.completionStatus = response.data.msg
        })
    } else {
      axios
        .get(`http://127.0.0.1:8000/api/v1/staff/${staffID}/courses/${this.courseID}/completion_status`)
        .then((response) => {
          this.completionStatus = response.data.msg
        })
    }
  },
  methods: {
    showButton(status,apiStatus) {
      if (status == apiStatus) {
        return true
      } else {
        return false
      }
    },

  }
}
</script>
