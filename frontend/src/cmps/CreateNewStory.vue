<template>
   <ModalBg>  
  <article class="new-story">
    <div class="stage1" v-if="stage === 1">  
      <div class="header">
        <h2>Create new post</h2>
      </div>   
      <div class="main">
        <span class="drag-icon" v-html="$svg('newPost')"></span>
        <h3>Drag photos and videos here</h3>
        <label for="upload-file" class="select-btn"> Select from computer </label>
        <input type="file" @change="onFileChange" id="upload-file" hidden />
      </div>
    </div>
    <div class="stage2" v-if="stage===2">
        <div class="header" v-if="mode==='create'">
          <span
              class="svg-icon btn"
              v-html="$svg('leftArrow')"
              @click="onBack"
            ></span>
          <h2>Create new post</h2>
          <button @click="onAddStory" class="share-btn">Share</button>
        </div> 
        <div class="header" v-if="mode==='edit'">
          <span
              Cancel
              @click="onCancel"
            ></span>
          <h2>Edit Info</h2>
          <button @click="onAddStory" class="share-btn">Done</button>
        </div> 
        <section class="flex">

          <div class="img-prev">
            <img v-if="url" :src="url" alt="" />
            <!-- <span>123</span> -->
          </div>
          <div class="main">
            <div class="user-title">
              <img class="user-img" :src="loggedInUser.imgUrl" alt="" />
              <span class="name">{{ loggedInUser.fullname }}</span>
            </div>
                <input v-model="imgToUpload.txt" placeholder="Write a caption"/>
          </div>
        </section>
    </div>
   

  </article>
</ModalBg>  
</template>

<script>
import { storyService } from "../services/story.service.local.js";

export default {
  data() {
    return {
      stage: 1,
      mode:'create',
      imgToUpload: {
        txt: "",
        imgsUrl: [],
      },
      file: null,
      url: null,
    };
  },
  methods: {
    async onFileChange(event) {
      this.file = event.target.files[0];
      this.url = URL.createObjectURL(this.file);
      this.stage = 2;
      
    },
    async uploadImage(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });
    },
    async onAddStory() {
      if (this.file) {
        try {
          this.imgToUpload.imgsUrl.push(await this.uploadImage(this.file));
          const storyToUpload = JSON.parse(JSON.stringify(this.imgToUpload));
          const savedStory = await this.$store.dispatch({
            type: "AddStory",
            storyToUpload,
          });
          console.log("story saved", savedStory);
          this.url = null;
          this.imgToUpload.txt = "";
          this.$router.push("/");
        } catch (err) {
          console.log(err);
        }
      }
    },
    onBack(){
      this.stage= 1
      this.imgToUpload.txt= ""
      this.imgToUpload.imgsUrl =  []
      this.file= null
      this.url= null

    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },
  }
};
</script>
<style scoped lang="scss">
// .choose-img {
// grid-row: 2;
// grid-column: 2;
// place-self: center;
// }
</style>
