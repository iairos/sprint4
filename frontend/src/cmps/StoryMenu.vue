<template>
  <ModalBg closeAction="closeModal" @closed="onCancel">
    <article class="story-menu">
      <div v-if="story">
        <h2 v-if="isOwner" @click="onDelete" class="red-txt">Delete</h2>
      </div>
      <div v-if="user">
          <h2  @click="onLogout" >Log Out</h2>
      </div>
  
      <!-- <h2 @click="onEdit">Edit</h2> -->
      <h2 @click="onCancel">Cancel</h2>
    </article>
  


  </ModalBg>      
</template>

<script>
export default {
  props: {
    story: { type: Object },
    user:{type: Object}
  },
  emits:['cancel','remove', 'logout'],
  methods: {
    onCancel() {
      this.$emit("cancel");
    },
    onDelete() {
      this.$emit("remove", this.story._id);
    },
    onLogout() {
      
      // console.log('logout')
      try{
            this.$store.dispatch({ type: 'logout'})
            // console.log('logout from user')
            this.$emit("logout");
        }
        catch{
            console.log('Could not logout')
        }
    },
  },
  computed: {
    isOwner() {
      const userId = this.$store.getters.getLoggedInUser._id
      return (this.story.by._id === userId) 
       
    },
  }
}
</script>

<style lang="scss"></style>
