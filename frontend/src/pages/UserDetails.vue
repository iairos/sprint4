<template>
  <section v-if="user" class="user-details">
    <!-- <pre>{{ user }}</pre> -->
    <section class="profil-header">
        <div class="img-contaner">
          <img class="profil-img" :src="user.imgUrl" alt="" />
        </div>
        <div class="main">
            <span class="name">{{ user.username }}</span>
        <div class="info">
          <span>{{ user.savedStoryIds.length }} posts</span>
          <span>{{ user.followers.length }} followers</span>
          <span>{{ user.following.length }} following</span>
        </div>
        <span class="fullname">{{ user.fullname }}</span>
    </div>
    </section>
    <section class="add">
      <span 
      class="svg-icon"
      v-html="$svg('plus')"
      @click="onPlus"
      ></span>
    </section>
  </section>
</template>
<script>

export default {
  async created() {
    
  },
  methods:{
    onPlus(){
      this.$router.push('/newStory')
    }
  },
  computed: {
    user() {
      return this.$store.getters.getLoggedInUser
    },
   
  },
}
</script>
