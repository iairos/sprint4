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
        <router-link to="/details/story._id" >comments {{ story.comments.length }}</router-link>
        <!-- <button @click="goToDetail">details</button> -->

    </article>
</template>

<script>
export default {
    props: {
        story: { type: Object, required: true },
    },
    // methods: {
    // goToDetail() {
    //   this.$router.push(`/story/${this.story._id}`)
    // },
}
</script>

<style lang="scss">

</style>