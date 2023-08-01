<template>
  <!-- <div @click="goHome" class="modal-bg"> -->
    <ModalBg>  
  <div  class="detail-wrap">
  <section v-if="story" class="story-details">
<div>
  <img class="detail-img" :src="story.imgsUrl[0]" alt="" />
</div>
    <div class="info-wrap">
      <StoryMenu v-if="isMenuOpen"
                 @cancel="closeMenu"
                 @remove="removeStory"
                 :story="story"/> 
    <!-- <article class="detail-title flex"> -->
      <article class="user-title header">
        <img class="user-img" :src="story.by.imgUrl" alt="" />
        <span class="name title">{{ story.by.fullname }}</span>
        <span
        class="svg-icon btn"
        v-html="$svg('threePoints')"
        @click="openMenu()"
      ></span>
    </article>

    <section class="flex column detail-comments">
      <div class="user-title">
        <img class="user-img" :src="story.by.imgsUrl" alt="" />
        <span class="name">{{ story.by.fullname }}</span>
        <pre>{{ story.txt }}</pre>
      </div>
      <article
        class="user-title"
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
        <div class="btn-wrapper">
        <span
          v-if="!isLike"
          class="svg-icon btn like"
          v-html="$svg('heart')"
          @click="onLikeStory(story._id)"
        ></span>
        <span
          v-if="isLike"
          class="svg-icon btn like"
          v-html="$svg('redHeart')"
          @click="onLikeStory(story._id)"
        ></span>
        <span class="svg-icon btn" v-html="$svg('comment')"></span>
      </div>
      <span class="svg-icon btn save" v-html="$svg('save')"></span>

      </section>
      <span class="likes" v-if="story.likedBy.length>1">{{ story.likedBy.length }} likes</span>
      <span class="likes" v-if="story.likedBy.length===1">{{ story.likedBy.length }} like</span>
    </article>
    <article class="detail-comment">
      <form @submit.prevent="onCommentStory(story._id, txt)">
        <textarea v-model="txt" v-textarea placeholder="Add a comment..." rows="1"></textarea>
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
import StoryMenu from "@/cmps/StoryMenu.vue"
import { storyService } from "../services/story.service.local.js"
export default {
    data() {
        return {
            story: null,
            commentTxt: "",
            txt: "",
            isMenuOpen:false,
        };
    },
    async created() {
        await this.loadStory();
    },
    methods: {
        goHome() {
            this.$router.push('/');
        },
        async loadStory() {
            try {
                const { storyId } = this.$route.params;
                const story = await storyService.getById(storyId);
                this.story = story;
            }
            catch (err) {
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
            }
            catch {
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
            }
            catch {
                console.log("Could not like Story");
            }
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
                const idx = this.story.likedBy.findIndex((user) => user._id === this.loggedInUser._id);
                return idx > -1;
            }
        },
        isDisabled() {
            if (!this.txt) {
                return true;
            }
        }
    },
    components: { StoryMenu },
};
</script>

<style lang="scss"></style>
