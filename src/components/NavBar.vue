<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#ff6600" class="bi bi-book-fill ms-3" viewBox="0 0 16 16">
        <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
      </svg><a class="navbar-brand m-2" href="#"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'LHomePage'}">LJPS</router-link></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'LHomePage'}">Back to LJPS</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Back to LMS</a>
          </li>
          <li v-if="stafftype == 'Admin'" class="nav-item">
            <a class="nav-link" href="#"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'APanelHome'}">Admin Panel</router-link></a>
          </li>
        </ul>
        <div class="nav-item">
        <a class="nav-link me-4" style="color:#6a0dad;"><router-link style="text-decoration: none; color: inherit;" :to="{name: 'LoginPage'} "><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#6a0dad" class="bi bi-person-circle me-2 mb-1" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>{{staffname}}</router-link></a>
      </div>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  computed: {
    staffname() {
      return sessionStorage.getItem("staffName")
    },
    stafftype(){
      return sessionStorage.getItem("staffType")
    },
  }
}
</script>