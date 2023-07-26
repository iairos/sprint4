<template>
    <section class="story-index">
        <StoryList @remove="removeStory" @like="likeStory" :storys="storys"/>
        <RouterView />
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
            try{
                this.$store.dispatch({ type: 'removeStory', storyId })
                console.log('Story removed')
            }
            catch{
                console.log('cannot remove Story')
            }
            // this.$store.dispatch({ type: 'removeStory', storyId })
            //     .then(console.log('Story removed'))
        },
        likeStory(storyId){
            try{
                this.$store.dispatch({ type: 'likeStory', storyId })
                console.log('like from index storyId',storyId)
            }
            catch{
                console.log('cannot like Story')
            }
            
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