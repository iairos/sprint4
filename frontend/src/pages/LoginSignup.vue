<template>
  
  <!-- <div class="login">  -->
    <div class="main">  
    <span class="logo"
    v-html="$svg('logo')"
    ></span>
    <button @click="demoUser">Login with demo user</button>
    <div v-if="!loggedinUser">
      <h2>Login</h2>
      <form @submit.prevent="doLogin">
        <input type="text" v-model="loginCred.username" placeholder="User name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        />
        <button >Login</button>
      </form>
      <form @submit.prevent="doSignup">
        <h2>Signup</h2>
        <input type="text" v-model="signupCred.fullname" placeholder="Your full name" />
        <input type="text" v-model="signupCred.username" placeholder="Username" />
        <input type="password" v-model="signupCred.password" placeholder="Password" />
        
        <button>Signup</button>
      </form>
    </div>
    <hr />
   
  </div> 
  <!-- </div> -->
</template>

<script>

// import ImgUploader from '../cmps/ImgUploader.vue'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: 'user1', password: '123' },
      signupCred: { username: '', password: '', fullname: '', imgUrl : '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    isLoading() {
      return this.$store.getters.usersIsLoading
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    // this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (!this.signupCred.fullname || !this.signupCred.password || !this.signupCred.username) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$router.push('/')

    },
    async demoUser(){
      const demoLoginCred= { username: 'juliaiboberts', password: 'abc' }
      try {
        await this.$store.dispatch({ type: "login", userCred: demoLoginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
      
    }


  },
  components: {
   
  }
}
</script>