<template>
    <article class="story-preview">
        <!-- <pre>{{story}}</pre> -->
        <div class="title flex">
            <img class="user-img" :src="story.by.imgUrl" alt="">
            <span class="name">{{ story.by.fullname }}</span>
        </div>
        <img class="img" :src="story.imgUrl" alt="">
        <div class="act action-btns">
            <span class="svg-icon btn" v-html="$svg('heart')" @click="like(story._id)"></span>
            <span class="svg-icon btn"  @click="goToDetail" v-html="$svg('comment')"></span>
        </div>
        <h3 class="likes">{{ story.likedBy.length }} likes</h3>
        <div class="txt flex">
            <span class="name">{{ story.by.fullname }} </span>
            <span class="txt-msg">{{ story.txt }}</span>
        </div>
        <div class="comments flex">
            <span class="name">{{ story.comments[0]?.by.fullname }}   </span>
            <span class="txt-msg">  {{ story.comments[0]?.txt }}</span>
        </div>

       <button v-if="story.comments.length>1" @click="goToDetail" >View all {{ story.comments.length }} comments</button>
        <!-- <router-link  to="/details/story._id" > comments {{ story.comments.length }}</router-link> -->
        <form @submit.prevent="onCommentStory(story._id,txt)">
            <textarea v-model="txt" placeholder="Add a comment..."></textarea>
            <button v-if="txt">Post</button>
        </form>
    </article>
</template>

<script>
export default {
    data(){
        return{
            txt:'',
        }
    },
    props: {
        story: { type: Object, required: true },
    },
    methods: {
    goToDetail() {
      this.$router.push(`/details/${this.story._id}`)
    },
    like(storyId) {
      this.$emit('like', storyId)
    },
    onCommentStory(storyId,txt){
        this.$emit('onCommentStory',storyId,txt)
        this.txt = ''
    }
}


}

</script>

<style lang="scss">

</style>