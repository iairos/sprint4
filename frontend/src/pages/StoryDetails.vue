<template>
  <!-- <div @click="goHome" class="modal-bg"> -->
    <ModalBg>  
  <div  class="detail-wrap">
  <section v-if="story" class="story-details">
<div>
  <img class="detail-img" :src="story.imgsUrl[0]" alt="" />
</div>
    <div class="info-wrap">
    <article class="detail-title flex">
      <img class="user-img" :src="story.by.imgUrl" alt="" />

      <span class="name">{{ story.by.fullname }}</span>
    </article>

    <section class="flex column detail-comments">
      <div class="flex">
        <img class="user-img" :src="story.by.imgsUrl" alt="" />
        <span class="name">{{ story.by.fullname }}</span>
        <pre>{{ story.txt }}</pre>
      </div>
      <article
        class="flex"
        v-if="story.comments"
        v-for="comment in story.comments"
      >
        <img class="user-img" :src="comment.by.imgUrl" alt="" />
        <span class="name">{{ comment?.by.fullname }}</span>
        <pre style="" class="txt">{{ comment?.txt }}</pre>
      </article>
    </section>
    <article class="actions">
      <section class="action-btns">
        <span
          v-if="!isLike"
          class="svg-icon btn"
          v-html="$svg('heart')"
          @click="onLikeStory(story._id)"
        ></span>
        <span
          v-if="isLike"
          class="svg-icon btn"
          v-html="$svg('redHeart')"
          @click="onLikeStory(story._id)"
        ></span>

        <span class="svg-icon btn" v-html="$svg('comment')"></span>
      </section>
      <span> {{ story.likedBy.length }} likes</span>
    </article>
    <article class="detail-comment">
      <form @submit.prevent="onCommentStory(story._id, txt)">
        <textarea v-model="txt" placeholder="Add a comment..."></textarea>
        <button :disabled="isDisabled" class="post-btn">Post</button>
      </form>
    </article>
    </div>
  </section>
</div>
</ModalBg>
<!-- </div> -->
</template>

<script>
import { storyService } from "../services/story.service.local.js";
export default {
  data() {
    return {
      story: null,
      commentTxt: "",
      txt: "",
      // isDisabled:true
      // isLike: false,
    };
  },
  async created() {
    await this.loadStory();
  },
  methods: {
    goHome(){
            this.$router.push('/')
        },
    async loadStory() {
      try {
        const { storyId } = this.$route.params;
        const story = await storyService.getById(storyId);
        this.story = story;
      } catch (err) {
        console.log(err);
      }
    },
    async onCommentStory(storyId, txt) {
      try {
        const updatedStory = await this.$store.dispatch({
          type: "commentStory",
          storyId,
          txt,
        });
        this.story = updatedStory;
        this.txt = "";
      } catch {
        console.log("Could not comment Story");
      }
    },
    async onLikeStory(storyId) {
      try {
        // this.isLike = !this.isLike
        const updatedStory = await this.$store.dispatch({
          type: "likeStory",
          storyId,
        });
        // console.log('like from index storyId',storyId)
        this.story = updatedStory;
      } catch {
        console.log("Could not like Story");
      }
    },
    // setIsLike(){
    //   const loggedInUser = this.loggedInUser
    //   // console.log('user',user)
    //   if(this.story.likedBy){
    //     const idx = this.story.likedBy.findIndex(user => user._id===loggedInUser._id)
    //     // console.log('idx',idx)
    //     if (idx >-1) this.isLike = true
    //   }
    // }
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
    // disabledBtn(){
      
    //   if(!this.txt){
    //     return this.isDisabled
    //   }
    // }
    isDisabled(){
      if(!this.txt){
        return true
      }
    }
  }
};
</script>

<style lang="scss"></style>
