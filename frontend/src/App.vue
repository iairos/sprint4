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
        <div @click="goHome" :class="{'screen-open':$route.name==='storyDetails'}" class="screen"></div>
    </section>
</template>

<style scoped lang="scss">

</style>