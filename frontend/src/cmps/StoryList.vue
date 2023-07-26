<template>
    <section class="story-list">
        <ul>
            <li v-for="story in storys" :key="story._id">
                <StoryPreview @like="likeStory" :story="story"/>
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
        }
    },
    components: {
        StoryPreview,
    }
}
</script>

<style lang="scss">

</style>