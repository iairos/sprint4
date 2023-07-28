<template>
    <section class="story-list">
        <ul class="clean-list">
            <li v-for="story in storys" :key="story._id">
                <StoryPreview 
                @like="likeStory"
                @onCommentStory="onCommentStory"
                 :story="story"/>
                <section class="actions">
                    <button @click="removeStory(story._id)">x</button>
                </section>
            </li>
        </ul>
    </section>
</template>

<script>
import StoryPreview from '@/cmps/StoryPreview.vue'
export default {
    props: {
        storys: { type: Array, required: true }
    },
    methods: {
        removeStory(storyId){
            this.$emit('remove', storyId)
        },
        likeStory(storyId){
            
            this.$emit('like', storyId)
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