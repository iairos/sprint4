<template>
  
  <section v-if="user" class="user-details">
    <StoryMenu
      v-if="isMenuOpen"
      @cancel="closeMenu"
      @logout="closeMenu"
      :user="user"
    />
<<<<<<< HEAD
  <div class="user-wrap">
  <section v-if="user" class="user-details">
=======
>>>>>>> a94109ff140d85b731f192e30f6dfcf4005fe87a
    <section class="profil-header">
      <div class="img-container">
        <img class="profil-img" :src="user.imgUrl" alt="" />
      </div>
      <div class="main">
        <div class="main-header">

          <span class="name">{{ user.username }}</span>
          <span
          v-if="isLoggedInUser"
          class="svg-icon"
          v-html="$svg('options')"
          @click="openMenu"
          ></span>
        </div>
        <div class="info">
          <div><span class="bold">{{ userStoriesLength }}</span> posts</div>
          <div><span class="bold">{{ user.followers?.length }}</span> followers</div>
          <div><span class="bold">{{ user.following?.length }}</span> following</div>
        </div>
        <span class="fullname bold">{{ user.fullname }}</span>
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
      <!-- <article v-for="btn in btns">
        <span v-if="btn.available"
        class="svg-icon"
        v-html="$svg(btn.svg)"
        @click="btn.func"
      ></span>
      <span v-if="btn.available">{{ btn.title }}</span>

      </article> -->
    </section>

    <section>
      <ul class="stories-list clean-list flex">
        <li v-for="story in stories" :key="story._id">
          <MiniStoryPreview :story="story" />
        </li>
      </ul>
    </section>
  </section>
</div>
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
      isMenuOpen:false,
      // btns:[
      //   {
      //     id: 1,
      //     available:true,
      //     isActive: true,
      //     title: "Posts",
      //     svg: "postTable",
      //     func:this.getUserStories
      //   },
      //   {
      //     id: 2,
      //     available:isLoggedInUser,
      //     isActive: false,
      //     title: "Saved",
      //     svg: "save",
      //     func:this.getSavedStories
      //   },
      // ]
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
        console.log(this.user)
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
