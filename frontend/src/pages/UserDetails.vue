<template>
  
  <section v-if="user" class="user-details">
    <StoryMenu
      v-if="isMenuOpen"
      @cancel="closeMenu"
      @logout="closeMenu"
      :user="user"
    />
    <section class="profil-header">
      <div class="img-contaner">
        <img class="profil-img" :src="user.imgUrl" alt="" />
      </div>
      <div class="main">
        <span class="name">{{ user.username }}</span>
        <span
          v-if="isLoggedInUser"
          class="svg-icon"
          v-html="$svg('options')"
          @click="openMenu"
      ></span>
        <div class="info">
          <span>{{ userStoriesLength }} posts</span>
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
        @click="getUserStories"
      ></span>
      <span>POSTS</span>
      <span v-if="isLoggedInUser"
        class="svg-icon"
        v-html="$svg('save')"
        @click="getSavedStories"
      ></span>
      <span v-if="isLoggedInUser">SAVED</span>
    </section>

    <section>
      <ul class="stories-list clean-list flex">
        <li v-for="story in stories" :key="story._id">
          <MiniStoryPreview :story="story" />
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
import MiniStoryPreview from "../cmps/MiniStoryPreview.vue"
import { userService } from "../services/user.service.js"
import StoryMenu from "../cmps/StoryMenu.vue"

export default {
  data() {
    return {
      stories: null,
      user: null,
      userStoriesLength:0,
      isMenuOpen:false
    };
  },

  created() {},
  methods: {
    
    onPlus() {
      this.$router.push("/newStory");
    },
    getUserStories() {
      const stories = this.$store.getters.stories;
      
      const userStories = stories.filter(
        (story) => story.by._id === this.user._id
      );
      
      this.stories = userStories;
      return userStories;
    },
    getSavedStories() {
      const stories = this.$store.getters.stories;
      const savedStoryIds = this.user.savedStoryIds;
      var savedStories = [];
      var story;
      if (savedStoryIds.length > 0) {
        savedStoryIds.forEach((storyId) => {
          story = stories.find((story) => story._id === storyId);
          savedStories.push(story);
        });
      }

      // console.log("savedStories", savedStories);
      this.stories = savedStories;
      return savedStories;
    },
    async loadUser() {
     
      try {
        const { userId } = this.$route.params;
        
        const user = await userService.getById(userId);
        this.user = user;
        this.userStoriesLength = this.getUserStories().length;
      } catch (err) {
        console.log(err);
      }
    },
    openMenu() {
      // console.log('openMenu')
      this.isMenuOpen = true;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  computed: {
    isLoggedInUser() {
      return (this.$store.getters.getLoggedInUser?._id === this.user?._id)
    },
 
  },
  components: {
    MiniStoryPreview,
    StoryMenu
  },
  watch: {
    "$route.params": {
      handler() {
        this.loadUser();
      },
      immediate: true,
    },
  },
};
</script>
