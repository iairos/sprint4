<script>
import StoryNav from '@/cmps/StoryNav.vue'
// import { userService } from '@/services/user.service.js'
import LoginSignUp from '@/Pages/LoginSignUp.vue';

export default {

    async created(){
        const user = await this.$store.dispatch({ type: 'loadUser' })
        this.$store.dispatch({ type: 'loadStories' })
        // userService.login({username:'jeniferbabiston', password:'abc'})        
    },
    components: {
        StoryNav,
        LoginSignUp
        
        
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