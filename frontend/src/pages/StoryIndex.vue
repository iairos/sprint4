<template>
    <section class="story-index">
        <div class="flex justify-center">
            <StoryList 
            v-if="stories"
            @remove="removeStory" 
            @like="likeStory"
            @onCommentStory="onCommentStory" 
            :stories="stories"/>
            
            <!-- <div class="suggestions">

            </div> -->
        </div>
        <RouterView />
    </section>
</template>

<script>
import StoryList from '@/cmps/StoryList.vue'

export default {
     created() {
         this.loadStories()
     
        
    },
    methods: {
        loadStories(){
            try{
                this.$store.dispatch({ type: 'loadStorys' })
                // console.log('storys loaded')
                
            }
            catch(err){
                // console.log(err)
                console.log('cannot load storys')
            }
        },
        loadUser(){
             this.$store.dispatch({ type: 'loadUser' })
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
        stories(){ return this.$store.getters.storys }
    },
    components: {
    StoryList,
}
}
</script>

<style lang="scss">

</style>