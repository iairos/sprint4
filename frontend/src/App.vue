<script>
import StoryNav from '@/cmps/StoryNav.vue';
export default {
    components: {

        StoryNav,
    },
    methods:{
        goHome(){
            this.$router.push('/')
        }
    }
}
</script>

<template>
    <section class="main-layout">
        <StoryNav/>
        <RouterView />
        <div @click="goHome" :class="{'screen-open':$route.name==='storyDetails' || $route.name==='newStory'}" class="screen"></div>
    </section>
</template>

<style scoped lang="scss">
.main-layout{
    display: grid;
  grid-template-columns: 1fr 4fr 2fr;
  margin: 0 auto;
}
</style>