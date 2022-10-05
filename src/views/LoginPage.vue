<template>
    <main class="form-signin">
        <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
        <div class="d-grid gap-2 d-md-flex justify-content-md-center">
          <button @click="isLearner()" class="btn btn-primary userButton">Learner</button>
          <button @click="isAdmin()" class="btn btn-success userButton">Admin</button>
        </div>
    </main>
  
</template>

<script>
export default {
  name: 'LoginPage',
  methods: {
    isLearner() {
      this.$router.push({name:'LHomePage'}); 
    },
    isAdmin() {
      this.$router.push({name:'AHomePage'}); 
    },
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

.userButton{
  min-width: 100px;
  max-width: 100px;
}
</style>