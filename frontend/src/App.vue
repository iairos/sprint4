<script>
import AppHeader from '@/cmps/AppHeader.vue'
export default {
    components: {
        AppHeader,
    },
    methods:{
        goHome(){
            this.$router.push('/')
        }
    }
}
</script>

<template>
    <AppHeader />
    <RouterView />
    <div @click="goHome" :class="{'screen-open':$route.name==='storyDetails'}" class="screen"></div>
</template>
