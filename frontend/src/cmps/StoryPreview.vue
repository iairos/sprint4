<template>
    <article class="story-preview">
        <!-- <pre>{{story}}</pre> -->
        <div class="title">
            <img class="user-img" :src="story.by.imgUrl" alt="">
            <span class="name">{{ story.by.fullname }}</span>
        </div>
        <img class="img" :src="story.imgUrl" alt="">
        <div class="act">
            <span class="svg-icon btn" v-html="$svg('heart')" @click="like(story._id)"></span>
            <span class="svg-icon btn"  @click="goToDetail" v-html="$svg('comment')"></span>
        </div>
        <h3 class="likes">{{ story.likedBy.length }} likes</h3>
        <div class="txt">
            <span class="name">{{ story.by.fullname }} </span>
            <span class="txt-msg">{{ story.txt }}</span>
        </div>
        <div class="comments">
            <span class="name">{{ story.comments[0]?.by.fullname }}   </span>
            <span class="txt-msg">  {{ story.comments[0]?.txt }}</span>
        </div>

       <button v-if="story.comments.length>1" @click="goToDetail" >View all {{ story.comments.length }} comments</button>
        <!-- <router-link  to="/details/story._id" > comments {{ story.comments.length }}</router-link> -->

    </article>
</template>

<script>
export default {
    props: {
        story: { type: Object, required: true },
    },
    methods: {
    goToDetail() {
      this.$router.push(`/details/${this.story._id}`)
    },
    like(storyId) {
      this.$emit('like', storyId)
    }
}


}

</script>

<style lang="scss">

</style>