<template>
    <section class="story-index">
        <StoryList @remove="removeStory" :storys="storys"/>
    </section>
</template>

<script>
import StoryList from '@/cmps/StoryList.vue'

export default {
    created() {
        this.$store.dispatch({ type: 'loadStorys' })
            .then(() => console.log('storys loaded'))
            .catch(err => console.log(err))
    },
    methods: {
        removeStory(storyId){
            this.$store.dispatch({ type: 'removeStory', storyId })
                .then(console.log('Story removed'))
        }
    },
    computed: {
        storys(){ return this.$store.getters.storys }
    },
    components: {
        StoryList,
    }
}
</script>

<style lang="scss">

</style>