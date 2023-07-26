<template>
    <article class="story-preview">
        <!-- <pre>{{story}}</pre> -->
        <img class="user-img" :src="story.by.imgUrl" alt="">
        <h3>{{ story.by.fullname }} likes</h3>
        <img class="story-img" :src="story.imgUrl" alt="">
        <span class="svg-icon" v-html="$svg('home')"></span>
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