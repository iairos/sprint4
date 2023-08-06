<template>
  <!-- <div @click="goHome" class="modal-bg"> -->
  <ModalBg>
    <div class="detail-wrap">
      <section v-if="story" class="story-details" @click="isPopped = false">
        <div>
          <img class="detail-img" :src="story.imgsUrl[0]" alt="" />
        </div>
        <div class="info-wrap">
          <StoryMenu
            v-if="isMenuOpen"
            @cancel="closeMenu"
            @remove="removeStory"
            :story="story"
          />
          <!-- <article class="detail-title flex"> -->
          <article class="user-title header">
            <img class="user-img" :src="story.by.imgUrl" alt="" />
            <div class="nameAndLoc">
              <span class="name title">{{ story.by.fullname }}</span>
              <span class="location">{{ story.loc.name }}</span>
            </div>
            <span
              class="svg-icon btn"
              v-html="$svg('threePoints')"
              @click="openMenu()"
            ></span>
          </article>

          <section class="flex column detail-comments">
            <div class="user-title">
              <img class="user-img" :src="story.by.imgUrl" alt="" />
              <span class="name">{{ story.by.fullname }}</span>
              <pre>{{ story.txt }}</pre>
            </div>
            <article
              class="user-title"
              v-if="story.comments"
              v-for="comment in story.comments"
            >
              <div class="flex">
                <img class="user-img" :src="comment.by.imgUrl" alt="" />
                <div class="nameAndLike">
                  <span class="name">{{ comment?.by.fullname }}</span>
                  <span class="like">{{ comment?.likedBy.length }} likes</span>
                </div>
                <pre style="" class="txt">{{ comment?.txt }}</pre>
              </div>
              <span
                v-if="!isCommentLike(comment.likedBy)"
                class="svg-icon btn"
                v-html="$svg('heart')"
                @click="onLikeComment(story._id, comment.id)"
              ></span>
              <span
                v-if="isCommentLike(comment.likedBy)"
                class="svg-icon btn"
                v-html="$svg('redHeart')"
                @click="onLikeComment(story._id, comment.id)"
              ></span>
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
            <div>
              <span class="likes" v-if="story.likedBy.length > 1"
                >{{ story.likedBy.length }} likes</span
              >
              <span class="likes" v-if="story.likedBy.length === 1"
                >{{ story.likedBy.length }} like</span
              >
            </div>
          </article>
          <article class="detail-comment">
            <form @submit.prevent="onCommentStory(story._id, txt)">
              <emoji-picker v-if="isPopped" @click.stop @emoji-click="addEmoji"></emoji-picker>
              <span class="svg-icon btn" v-html="$svg('Emoji')" @click.stop="isPopped = !isPopped"></span>
              <textarea
                v-model="txt"
                v-textarea
                placeholder="Add a comment..."
                rows="1"
              ></textarea>
              <button :disabled="isDisabled" class="post-btn">Post</button>
            </form>
          </article>
        </div>
      </section>
    </div>
  </ModalBg>
</template>

<script>
import StoryMenu from "@/cmps/StoryMenu.vue";
import { storyService } from "../services/story.service.local.js";
export default {
  data() {
    return {
      story: null,
      commentTxt: "",
      txt: "",
      isMenuOpen: false,
      isPopped:false
    };
  },
  async created() {
    await this.loadStory();
  },
  methods: {
    addEmoji(ev){
      console.log(ev.detail)
      this.txt += ev.detail.emoji.unicode
    },
    goHome() {
      this.$router.push("/");
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
    async onLikeComment(storyId, commentId) {
      console.log("storyId", storyId);
      console.log("commentId", commentId);
      try {
        const updatedStory = await this.$store.dispatch({
          type: "likeComment",
          storyId,
          commentId,
        });
        this.story = updatedStory;
      } catch {
        console.log("Could not like comment");
      }
    },
    openMenu() {
      this.isMenuOpen = true;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    removeStory(storyId) {
      // console.log('prev',storyId)

      this.$emit("remove", storyId);
    },
    isCommentLike(likedBy) {
      // console.log('likedBy',likedBy)
      // console.log('user',this.loggedInUser._id)
      if (!likedBy) return false;
      const idx = likedBy.findIndex(
        (user) => user._id === this.loggedInUser._id
      );
      return idx > -1;
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
    isDisabled() {
      if (!this.txt) {
        return true;
      }
    },
  },
  components: { StoryMenu },
};
</script>

<style lang="scss"></style>
