<template>
    <main class="form-signin">
      <form>
        <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
        <div class="form-floating">
          <input type="text" class="form-control" v-model="userInput" placeholder="UserID">
          <label for="userInput">User ID</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" v-model="passwordInput" placeholder="Password">
          <label for="PasswordInput">Password</label>
        </div>
        
        <button @click="signIn()" class="w-100 btn btn-lg btn-primary">Sign in</button>

      </form>
    </main>
  
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      userInput: "",
      passwordInput: "",
      isAdmin: false,
      userID:""
    };
  },
  methods: {
    signIn() {
      if (this.userInput.includes("user")){
        this.$router.push('/LHomePage'); 
      }
    }
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
  /* padding: 15px; */
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>