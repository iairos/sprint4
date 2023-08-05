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
      const stories =this.$store.getters.storys
      // console.log('stories',stories)
      const userStories = stories.filter(story => story.by._id === this.user._id)
      // console.log('userStories',userStories)
      return userStories
    }
  },
  computed: {
    user() {
      return this.$store.getters.getLoggedInUser
    },
  },
  components: {
    MiniStoryPreview,
    }
    
    
   
  
}
</script>
