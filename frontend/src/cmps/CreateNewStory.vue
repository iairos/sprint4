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
<form class="choose-img" @submit.prevent="onAddStory">
  <input v-model="imgToUpload.txt"/>
  <input type="file" @change="onFileChange"/>
<button>create</button>
<div class="img-prev">
<img v-if="url" :src="url" alt="">
</div>
</form>

</template>

<script>
import { storyService } from '../services/story.service.local.js';


export default{
  data(){
    return{
      imgToUpload:{
        txt:'',
        imgUrl:null,
      },
      file:null,
      url:null

    }
  },
  methods:{
   async onFileChange(event){
    this.file = event.target.files[0];
    this.url = URL.createObjectURL(this.file)
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
          this.imgToUpload.imgUrl = await this.uploadImage(this.file)
         const newImg = JSON.parse(JSON.stringify(this.imgToUpload))
          console.log(newImg)
          this.url = null
          this.imgToUpload.txt = ''
        }
        catch (err){
          console.log(err)
        }
      
    }
  }
  }
}
</script>
<style scoped lang="scss">
.choose-img{
  grid-row: 2;
  grid-column: 2;
  place-self: center;
}
</style>
