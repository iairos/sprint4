<template>
  <StoryMenu v-if="isMenuOpen"
             @cancel="closeMenu"
             @remove="removeStory"
             :story="story"/> 
  <article class="story-preview">
    <!-- <pre>{{story}}</pre> -->
    <div class="user-title">
      <img class="user-img" :src="story.by.imgUrl" alt="" />
      <span class="name">{{ story.by.fullname }}</span>
      <span
        class="svg-icon btn"
        v-html="$svg('threePoints')"
        @click="openMenu()"
      ></span>
    </div>
    <img class="img" :src="story.imgsUrl[0]" alt="" />
    <div class="action-btns">
      <span
        v-if="!isLike"     
        class="svg-icon btn"
        v-html="$svg('heart')"
        @click="like(story._id)"
      ></span>
      <span
        v-if="isLike"
        class="svg-icon btn"
        v-html="$svg('redHeart')"
        @click="like(story._id)"
      ></span>
      <span
        class="svg-icon btn"
        @click="goToDetail"
        v-html="$svg('comment')"
      ></span>
    </div>
    <span class="likes" v-if="story.likedBy.length>1">{{ story.likedBy.length }} likes</span>
    <span class="likes" v-if="story.likedBy.length===1">{{ story.likedBy.length }} like</span>
    <!-- <span class="likes" >{{ story.likedBy.length }} likes</span> -->
    

   
    <div class="txt flex">
      <span class="name">{{ story.by.fullname }} </span>
      <span class="txt-msg">{{ story.txt }}</span>
    </div>
    <span  v-if="story.comments.length>1" @click="goToDetail" class="comments-btn">
      View all {{ story.comments.length }} comments
    </span>
    <div class="comments flex">
      <span class="name">{{ story.comments[0]?.by.fullname }} </span>
      <span class="txt-msg"> {{ story.comments[0]?.txt }}</span>
    </div>

    <!-- <router-link  to="/details/story._id" > comments {{ story.comments.length }}</router-link> -->
    <form @submit.prevent="onCommentStory(story._id, txt)" >
      <textarea v-model="txt" placeholder="Add a comment..."></textarea>
      <button class="post-btn" v-if="txt">Post</button>
    </form>
  </article>
  
</template>


<script>
import StoryMenu from '@/cmps/StoryMenu.vue'

export default {
  data() {
    return {
      txt: "",
      isMenuOpen:false
    };
  },
  props: {
    story: { type: Object, required: true },
  },
  emits:['onCommentStory','like','remove'],
  created() {
    
  },
  methods: {
    goToDetail() {
      this.$router.push(`/details/${this.story._id}`);
    },
    like(storyId) {
      this.$emit("like", storyId);
    },
    onCommentStory(storyId, txt) {
      this.$emit("onCommentStory", storyId, txt);
      this.txt = "";
    },
    openMenu(){
      this.isMenuOpen = true
    },
    closeMenu(){
      this.isMenuOpen = false
    },
    removeStory(storyId){
          // console.log('prev',storyId)
     
            this.$emit('remove', storyId)
        },
   
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },
    isLike() {
      if (this.story.likedBy) {
        const idx = this.story.likedBy.findIndex(
          (user) => user._id === this.loggedInUser._id
        );
        return idx > -1;
      }
    },
  },
  components: {
    StoryMenu,
    // Menu
  },
};
</script>

<style lang="scss">

</style>
