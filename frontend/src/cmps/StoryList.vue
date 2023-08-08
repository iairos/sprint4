<template>
    <section class="story-list">
        <ul class="clean-list">
            <li v-for="story in stories" :key="story._id">
                <StoryPreview 
                @like="likeStory"
                @remove="removeStory"
                @save="saveStory"
                @onCommentStory="onCommentStory"
                 :story="story"/>
                <!-- <section class="actions">
                    <button @click="removeStory(story._id)">x</button>
                </section> -->
            </li>
        </ul>
    </section>
</template>

<script>
import StoryPreview from '@/cmps/StoryPreview.vue'
export default {
    props: {
        stories: { type: Array, required: true }
    },
    methods: {
        removeStory(storyId){
            // console.log('list',storyId)
            this.$emit('remove', storyId)
        },
        likeStory(storyId){
            
            this.$emit('like', storyId)
        },
        saveStory(storyId){
            // console.log('storyId',storyId)
            this.$emit('save', storyId)
        },
        onCommentStory(storyId,txt){
            this.$emit('onCommentStory', storyId,txt)
        }
    },
    components: {
        StoryPreview,
    }
}
</script>

<style lang="scss">

</style>