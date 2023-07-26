<template>
    <article class="story-preview">
        <pre>{{story}}</pre>
        <img class="user-img" :src="story.by.imgUrl" alt="">
        <img class="story-img" :src="story.imgUrl" alt="">
        <span class="svg-icon" v-html="$svg('home')"></span>
        <!-- <router-link >comments {{ story.comments.length }}</router-link> -->
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