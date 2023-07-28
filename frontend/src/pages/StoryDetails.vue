<template>
<section v-if="story" class="story-details">
    <img class="detail-img" :src="story.imgUrl" alt="">

    <article class="detail-title flex">
        <img class="user-img" :src="story.by.imgUrl" alt="">
    
            <span class="name">{{ story.by.fullname }}</span>

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
            <span class="svg-icon btn" v-html="$svg('heart')" @click="onLikeStory(story._id)" ></span>
            <span class="svg-icon btn" v-html="$svg('comment')"></span>
        </section>
        <span>   {{ story.likedBy.length }} likes</span>
    </article>
    <article class="detail-comment">
        <form @submit.prevent="onCommentStory(story._id,txt)">
            <textarea v-model="txt" placeholder="Add a comment..."></textarea>
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
            commentTxt:'',
            txt:'',
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
        catch(err){
            console.log(err)
        }
    },
    async  onCommentStory(storyId,txt){
        try{
            const updatedStory =  await this.$store.dispatch({ type: 'commentStory', storyId,txt })
            this.story = updatedStory
            this.txt = ''
        }
        catch{
            console.log('Could not comment Story')
  
        }
  
    },
    async onLikeStory(storyId){
                try{
                const updatedStory =  await this.$store.dispatch({ type: 'likeStory', storyId })
                    // console.log('like from index storyId',storyId)
                    this.story = updatedStory
                }
                catch{
                    console.log('Could not like Story')
                }
                
            }
    },
computed:{
    
}
}
</script>

<style lang="scss">

</style>