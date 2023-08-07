<template>
  <ModalBg closeAction="closeModal" @closed="onCancel">
  <article class="story-menu">
    <h2 v-if="isOwner" @click="onDelete" class="red-txt">Delete</h2>
    <!-- <h2 @click="onEdit">Edit</h2> -->
    <h2 @click="onCancel">Cancel</h2>
  </article>
  </ModalBg>      
</template>

<script>
export default {
  props: {
    story: { type: Object, required: true },
  },
  emits:['cancel','remove'],
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onDelete() {
      this.$emit("remove", this.story._id);
    },
  },
  computed: {
    isOwner() {
      const userId = this.$store.getters.getLoggedInUser._id
      // console.log('userId',userId)
      // console.log('story by id',this.story.by._id )
      return (this.story.by._id === userId) 
       
    },
  }
}
</script>

<style lang="scss"></style>
