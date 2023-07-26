<template>
    <article class="story-preview">
        <!-- <pre>{{story}}</pre> -->
        <div class="prev-title">
            <img class="user-img" :src="story.by.imgUrl" alt="">
            <span class="name">{{ story.by.fullname }}</span>
        </div>
        <img class="prev-img" :src="story.imgUrl" alt="">
        <div class="prev-act">
            <span class="svg-icon" v-html="$svg('heart')" @click="like(story._id)"></span>
            <span class="svg-icon" v-html="$svg('comment')"></span>
        </div>
        <h3 class="prev-likes">{{ story.likedBy.length }} likes</h3>
        <div class="prev-txt">
            <span class="name">{{ story.by.fullname }} </span>
            <span class="txt">{{ story.txt }}</span>
        </div>
        <div class="prev-comments">
            <span class="name">{{ story.comments[0]?.by.fullname }}   </span>
            <span class="txt">  {{ story.comments[0]?.txt }}</span>
        </div>

       <button @click="goToDetail" >comments {{ story.comments.length }}</button>
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