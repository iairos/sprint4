<template>
    <section class="story-index flex justify-center">
        <StoryList 
        @remove="removeStory" 
        @like="likeStory"
        @onCommentStory="onCommentStory" 
        :storys="storys"/>
        <RouterView />
    </section>
</template>

<script>
import StoryList from '@/cmps/StoryList.vue'

export default {
    created() {
        this.loadStorys()
        
    },
    methods: {
        loadStorys(){
            try{
                this.$store.dispatch({ type: 'loadStorys' })
                // console.log('storys loaded')
            }
            catch(err){
                // console.log(err)
                console.log('cannot load storys')
            }
        },
        removeStory(storyId){
            try{
                this.$store.dispatch({ type: 'removeStory', storyId })
                console.log('Story removed')
            }
            catch{
                console.log('Could not remove Story')
            }
            
        },
        likeStory(storyId){
            try{
                this.$store.dispatch({ type: 'likeStory', storyId })
                // console.log('like from index storyId',storyId)
            }
            catch{
                console.log('Could not like Story')
            }
            
        },
        async onCommentStory(storyId,txt){
            try{

                const updatedStory = await this.$store.dispatch({type:'commentStory',storyId,txt})
                console.log('success comment',updatedStory)
            }
            catch(err){
                console.log(err)
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