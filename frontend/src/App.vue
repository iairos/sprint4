<script>
import StoryNav from '@/cmps/StoryNav.vue';
export default {

    created(){
        this.$store.dispatch({ type: 'loadUser' })
    },
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
        <!-- <div @click="goHome" :class="{'screen-open':$route.name==='storyDetails' || $route.name==='newStory'}" class="screen"></div> -->
    </section>
</template>

<style scoped lang="scss">
.main-layout{
    display: flex;
    height: 100vh;
//   grid-template-columns: 1fr 4fr 2fr;
//   margin: 0 auto;
}
</style>