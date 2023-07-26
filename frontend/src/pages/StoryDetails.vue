<template>
<section class="story-details">
<img src="" alt="">
<div>
    <article>
        <img src="" alt="">
        <h3></h3>
    </article>
    <article>
        <img src="" alt="">
        <h3></h3>
        <p></p>

    </article>
    <article>
        <section class="action-btns">
            <button></button>
            <button></button>
            <h3></h3>
        </section>
    </article>
    <article>
        <form @submit.prevent="onComment">
            <p style="white-space: pre-line;">{{ commentTxt }}</p>
            <textarea v-model="commentTxt" placeholder="Add a comment..."></textarea>
            <button>Post</button>
        </form>
    </article>
</div>
</section>
       
</template>

<script>
import { storyService} from '../services/story.service.local.js'
export default {
    data(){
        return{
            story:null
        }
    },
  async created(){
    await this.loadStory()
    },
methods:{
async loadStory(){
    try{
        const {storyId} = this.$route.params
        const story = await storyService.getById(storyId)
        this.story = story
    }
    catch{
        console.log('Could Not load story')
    }
}
},
}
</script>

<style lang="scss">

</style>