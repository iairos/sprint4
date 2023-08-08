<template>
    <section class="story-index" @scroll="sayHi" ref="puki">
        <header id="nav-test" :class="{'mobile-nav':isCustomNav,test:isUpAnimation}" ></header>
        <div class="flex justify-center">
            <StoryList 
            v-if="stories"
            @remove="removeStory" 
            @like="likeStory"
            @save="addStoryToUserLIst"
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
    data(){
        return{
            A: false,
            B: 0,
            C: 5,
            heightArea: 0, // Initialize with appropriate value
            isCustomNav: true, // Initial class condition
            isUpAnimation: false // Initial class condition

        }
    },
    mounted() {
        this.heightArea = document.querySelector('header').offsetHeight;
        window.addEventListener('scroll', this.handleScroll);
        setInterval(this.checkScroll, 250);
        console.log(this.heightArea)
        console.log(window.scrollY);
  },
  beforeDestroy() {
    this.window.removeEventListener('scroll', this.handleScroll);
  },

     created() {
        //  this.loadStories()
     
        
    },
    methods: {
        sayHi(ev){
            // this.handleScroll()
        },
        loadStories(){
            try{
                this.$store.dispatch({ type: 'loadStories' })
                // console.log('stories loaded')
                
            }
            catch(err){
                // console.log(err)
                console.log('cannot load stories')
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
        addStoryToUserLIst(storyId){
            try{
                this.$store.dispatch({ type: 'addStoryToUserLIst', storyId })               
            }
            catch{
                console.log('Could not save Story')
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
        },
        handleScroll() {
            console.log('hi')
      this.A = true;
    },
    checkScroll() {
      if (this.A) {
        this.hasScrolled();
        this.A = false;
      }
    },
    hasScrolled() {
      const D = window.scrollY;
      console.log(D)
      if (Math.abs(this.B - D) <= this.C) return;

      if (D > this.B && D > this.heightArea) {
        this.isCustomNav = false;
        this.isUpAnimation = true;
      } else {
        if (D + window.innerHeight < document.body.clientHeight) {
          this.isUpAnimation = false;
          this.isCustomNav = true;
        }
      }

      this.B = D;
    }

    },

    computed: {
        stories(){ return this.$store.getters.stories }
    },
    components: {
    StoryList,
}
}
</script>

<style lang="scss">

</style>