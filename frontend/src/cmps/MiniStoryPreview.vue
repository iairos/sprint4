<template>
  
  <article class="mini-story-preview"> 
    <img class="img" :src="story.imgsUrl[0]" alt="" />
    <div class="action">
      <span    
        class="svg-icon btn"
        v-html="$svg('heart')"
      ></span>
      <span
        class="svg-icon btn"
        v-html="$svg('comment')"
      ></span>
        
</div>
</article>
     
</template>


<script>


export default {
  props: {
    story: { type: Object, required: true },
  },
  
  created() {
    
  },
  methods: {
   
  },
  computed: {
    
  },

};
</script>

<style lang="scss">

</style>
