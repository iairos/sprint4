<template>
  <article class="new-story">
    <h2>Create new post</h2>
    <span
      class="svg-icon"
      v-html="$svg('newPost')"
      @click="like(story._id)"
    ></span>
    <h3>Drag photos and videos here</h3>
   

    <!-- <ImgUploader @uploaded="onUploaded" /> -->
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
</script>

<style lang="scss"></style>
