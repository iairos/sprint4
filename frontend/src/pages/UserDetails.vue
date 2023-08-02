<template>
  <section v-if="user" class="user-details">
    
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
    <section class="action">
      <span 
      class="svg-icon"
      v-html="$svg('postTable')"
      @click=""
      ></span>
      <span>POSTS</span>
    </section>
    <!-- <pre>{{stories}}</pre> -->
    <section class="stories-list">
      <ul class="clean-list">
            <li v-for="story in stories" :key="story._id">
                <!-- <MiniStoryPreview :story="story"/> -->
                <!-- <pre>{{ story }}</pre> -->
               
            </li>
        </ul>
    </section>
  </section>
</template>
<script>
import MiniStoryPreview from '../cmps/MiniStoryPreview.vue'

export default {
  data() {
    return {
      stories: null,
      
    };
  },
    
  created() {
    this.stories = this.getStories()
  },
  methods:{
    onPlus(){
      this.$router.push('/newStory')
    },
    getStories(){
      return this.$store.getters.storys
    }
  },
  computed: {
    user() {
      return this.$store.getters.getLoggedInUser
    },
  }
    
    
   
  
}
</script>
