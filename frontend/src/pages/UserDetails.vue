<template>
  <section v-if="user" class="user-details">
    
    <section class="profil-header">
        <div class="img-contaner">
          <img class="profil-img" :src="user.imgUrl" alt="" />
        </div>
        <div class="main">
            <span class="name">{{ user.username }}</span>
        <div class="info">
          <span>{{ user.savedStoryIds?.length }} posts</span>
          <span>{{ user.followers?.length }} followers</span>
          <span>{{ user.following?.length }} following</span>
        </div>
        <span class="fullname">{{ user.fullname }}</span>
    </div>
    </section>
    <!-- <section class="add">
      <span 
      class="svg-icon"
      v-html="$svg('plus')"
      @click="onPlus"
      ></span>
    </section> -->
    <section class="action">
      <span 
      class="svg-icon"
      v-html="$svg('postTable')"
      @click=""
      ></span>
      <span>POSTS</span>
    </section>
   
    <section>
      <ul class="stories-list clean-list flex">
            <li v-for="story in stories" :key="story._id">
              
              <MiniStoryPreview :story="story"/>
               
    
               
            </li>
        </ul>
    </section>
  </section>
</template>
<script>
import MiniStoryPreview from '../cmps/MiniStoryPreview.vue'
import { userService } from "../services/user.service.js"

export default {
  data() {
    return {
      stories: null,
      user:null
      
    };
  },
    
  created() {
    // this.stories = this.getStories()
    
  },
  methods:{
    onPlus(){
      this.$router.push('/newStory')
    },
    getStories(){
      const stories =this.$store.getters.storys
      // console.log('stories',stories)
      const userStories = stories.filter(story => story.by._id === this.user._id)
      console.log('userStories',userStories)
      return userStories
    },
    async loadUser() {
      // console.log('loadUser')
      try {
        const { userId } = this.$route.params;
        console.log('userId', userId)
        const user = await userService.getById(userId);
        this.user = user;
        console.log('user',user)
        this.stories = this.getStories()
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    // loggedInUser() {
    //   return this.$store.getters.getLoggedInUser
    // },
  },
  components: {
    MiniStoryPreview,
    },
    watch: {
    '$route.params': {
      handler() {
        this.loadUser()
      },
      immediate: true,
    },
  },
    
   
  
}
</script>
