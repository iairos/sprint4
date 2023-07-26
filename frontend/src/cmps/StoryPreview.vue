<template>
    <article class="story-preview">
        <!-- <pre>{{story}}</pre> -->
        <section class="title">
            <img class="user-img square-ratio" :src="story.by.imgUrl" alt="">
            <span class="name fs14">{{ story.by.fullname }}</span>
        </section>
        <img class="story-img" :src="story.imgUrl" alt="">
        <span class="svg-icon" v-html="$svg('heart')"></span>
        <span class="svg-icon" v-html="$svg('comment')"></span>
        <h3>{{ story.likedBy.length }} likes</h3>
        <span class="fs14">{{ story.by.fullname }} </span>
        <span>{{ story.txt }}</span>
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
    }
}

}

</script>

<style lang="scss">

</style>