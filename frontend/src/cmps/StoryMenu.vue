<template>
  <!-- <ModalBg> -->
  <article class="story-menu">
    <h2 @click="onDelete" class="red-txt">Delete</h2>
    <!-- <h2 @click="onEdit">Edit</h2> -->
    <h2 @click="onCancel">Cancel</h2>
  </article>
  <!-- </ModalBg>       -->
</template>

<script>
export default {
  props: {
    story: { type: Object, required: true },
  },

  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onDelete() {
        // console.log('menu',this.story._id)
      this.$emit("remove", this.story._id);
    },
  },
};
</script>

<style lang="scss"></style>
