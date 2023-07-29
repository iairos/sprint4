<!-- <template>
  <article class="new-story">
    <h2>Create new post</h2>
    <span
      class="svg-icon"
      v-html="$svg('newPost')"
      @click="like(story._id)"
    ></span>
    <h3>Drag photos and videos here</h3>
   

    <ImgUploader @uploaded="onUploaded" />
    <button class="btn">Select from computer</button>
  </article>
</template>

<script>
import ImgUploader from "./ImgUploader.vue";
export default {
  data() {
    return {
      
    };
  },
  computed: {
     
        },
  props: {},
  methods: {},
  components: {
    ImgUploader,
  },
};
</script> -->
<template>
<form @submit.prevent="onAddStory">
  <input v-model="storyToUpload.txt"/>
  <input type="file" @change="onFileChange"/>
<button>create</button>
</form>

</template>

<script>
import { storyService } from '../services/story.service.local.js';


export default{
  data(){
    return{
      storyToUpload:storyService.getEmptyStory(),
      file:null
    }
  },
  methods:{
   async onFileChange(event){
    this.file = event.target.files[0];
    },
    async uploadImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (event) => resolve(event.target.result)
        reader.onerror = (error) => reject(error)
        reader.readAsDataURL(file)
      })
    },
 async onAddStory(){
      if(this.file){
        try{
          this.storyToUpload.imgUrl = await this.uploadImage(this.file)
          console.log(this.storyToUpload)
        }
        catch (err){
          console.log(err)
        }
      
    }
  }
  }
}
</script>
<style lang="scss"></style>
