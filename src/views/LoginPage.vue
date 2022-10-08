<template>
  <main class="form-signin">
    <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
    <!-- leaving this section here just in case -->
    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
      <button @click="isLearner()" class="btn btn-primary userButton">Learner</button>
      <button @click="isAdmin()" class="btn btn-success userButton">Admin</button>
    </div>
    <!-- this section creates users based on Staff API -->
    <div v-for="staff in staffs" :key=staff.id class="d-grid gap-2 d-md-flex justify-content-md-center">
      <div v-if="staff.role_id==2">
        <button @click="isLearner(staff.staff_fname, staff.id)" class="btn btn-primary userButton">{{staff.staff_fname}}</button>
      </div>
      <div v-else-if="staff.role_id==1">
        <button @click="isAdmin(staff.staff_fname, staff.id)" class="btn btn-success userButton">{{staff.staff_fname}}</button>
      </div>
    </div>
  </main>


</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginPage',
  data(){
    return {
      staffs: null
    }
  },
  methods: {
    isLearner(user_name, user_id) {
      this.$router.push({ name: 'LHomePage', params: { userName: user_name, userID: user_id } })
    },
    isAdmin(user_name, user_id) {
      this.$router.push({ name: 'AHomePage', params: { userName: user_name, userID: user_id } });
    }
  },
  mounted() {
    axios
      .get('http://127.0.0.1:8000/api/v1/staff/')
      .then(response => (
        console.log(response.data),
        this.staffs = response.data))
  }
}
</script>

<style scoped>
body {
  align-items: center;
  margin-top: 160px;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding-top: 180px;
  margin: auto;
}

.userButton {
  min-width: 100px;
  max-width: 100px;
}
</style>