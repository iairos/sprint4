<template>
<section v-if="story" class="story-details">
    <img class="detail-img" :src="story.imgUrl" alt="">

    <article class="detail-title flex">
        <img class="user-img" :src="story.by.imgUrl" alt="">
        <div>    
            <span class="name">{{ story.by.fullname }}</span>
        </div>
    </article>
    <section class="flex column detail-comments" >
        <article class="flex" v-if="story.comments" v-for="comment in story.comments " >
            <img class="user-img" :src="comment.by.imgUrl" alt="">
            <span class="name">{{ comment?.by.fullname }}</span>
            <span class="txt">  {{ comment?.txt }}</span>
        </article>
    </section>
        <article class="actions" >
        <section class="action-btns">
            <span class="svg-icon btn" v-html="$svg('heart')" ></span>
            <span class="svg-icon btn" v-html="$svg('comment')"></span>
        </section>
    </article>
    <article class="detail-comment">
        <form @submit.prevent="onComment">
            <p style="white-space: pre-line;">{{ commentTxt }}</p>
            <textarea v-model="commentTxt" placeholder="Add a comment..."></textarea>
            <button>Post</button>
        </form>
    </article>

</section>
       
</template>

<script>
import { storyService} from '../services/story.service.local.js'
export default {
    data(){
        return{
            story:null,
            commentTxt:''
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