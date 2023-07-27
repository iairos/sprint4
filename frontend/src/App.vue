<script>
import AppHeader from '@/cmps/AppHeader.vue'
export default {
    components: {
        AppHeader,
    }
}
</script>

<template>
    <AppHeader />
    <RouterView />
    <div :class="{'screen-open':$route.name==='storyDetails'}" class="screen"></div>
</template>
