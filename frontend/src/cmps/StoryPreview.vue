<template>
  <article class="story-preview" @click="isPopped = false">
              
    <StoryMenu v-if="isMenuOpen"
               @cancel="closeMenu"
               @remove="removeStory"
               :story="story"/> 
             
    <!-- <pre>{{story}}</pre> -->
    <div class="user-title header">
      <img class="user-img" :src="story.by.imgUrl" alt="" @click="onUserProfile"/>
      <div>
        <span class="name title">{{ story.by.fullname }}</span>
        <span class="location">{{ story.loc?.name }}</span>
      </div>
        <span
        class="svg-icon btn"
        v-html="$svg('threePoints')"
        @click="openMenu()"
        ></span>
    </div>
    <img class="img" :src="story.imgsUrl[0]" alt="" />
    <section class="prev-info flex column">

    <div class="action-btns">
      <div class="btn-wrapper flex">
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
        <span class="svg-icon btn save" v-html="$svg('save')"></span>
    </div>
    <span class="likes" v-if="story.likedBy.length>1">{{ story.likedBy.length }} likes</span>
    <span class="likes" v-if="story.likedBy.length===1">{{ story.likedBy.length }} like</span>
    <!-- <span class="likes" >{{ story.likedBy.length }} likes</span> -->
    

   
    <div class="user-title">
      <span class="name">{{ story.by.fullname }} </span>
      <pre style="" class="txt">{{ story.txt }}</pre>
    </div>
    <span  v-if="story.comments.length>1" @click="goToDetail" class="comments-btn">
      View all {{ story.comments.length }} comments
    </span>
    <div class="comments flex">
      <span class="name">{{ story.comments[0]?.by.fullname }} </span>
      <pre style="" class="txt">{{ story.comments[0]?.txt }}</pre>
    </div>

    <!-- <router-link  to="/details/story._id" > comments {{ story.comments.length }}</router-link> -->
    <form @submit.prevent="onCommentStory(story._id, txt)" >
      <textarea v-model="txt" v-textarea placeholder="Add a comment..."></textarea>
      <button class="post-btn" v-if="txt">Post</button>
      <span class="svg-icon btn" v-html="$svg('smallEmoji')" @click.stop="isPopped = !isPopped">
      </span>
      <emoji-picker v-if="isPopped" @click.stop @emoji-click="addEmoji"></emoji-picker>
    </form>

  </section>

  </article>
  
</template>


<script>
import StoryMenu from '@/cmps/StoryMenu.vue'
export default {
  data() {
    return {
      txt: "",
      isMenuOpen:false,
      isPopped:false
    };
  },
  props: {
    story: { type: Object, required: true },
  },
  emits:['onCommentStory','like','remove'],
  created() {
    
  },
  methods: {
    addEmoji(ev){
      console.log(ev.detail)
      this.txt += ev.detail.emoji.unicode
    },
    goToDetail() {
      this.$router.push(`/details/${this.story._id}`);
    },
    onUserProfile() {
      this.$router.push(`/userProfile/${this.story.by._id}`);
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
            try{
                this.$store.dispatch({ type: 'removeStory', storyId })
                console.log('Story removed')
            }
            catch{
                console.log('Could not remove Story')
            }
            
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
