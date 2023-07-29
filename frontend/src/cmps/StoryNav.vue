<template>
        <section class="story-nav">
            <div  class="nav-btn logo" @click="$router.push('/')">
                <span class=""></span>
                <span class="svg-icon" v-html="$svg('logo')" ></span>
            </div>
            <div  class="nav-btn" @click="$router.push('/')">
                <span class="svg-icon" v-html="$svg('home')" ></span>
                <span>Home</span>
            </div>
            <div  class="nav-btn">
                <span class="svg-icon" v-html="$svg('search')" @click="$router.push('/')"></span>
                <span>Search</span>
            </div>
            <div  class="nav-btn" @click="$router.push('/newStory')">
                <span class="svg-icon" v-html="$svg('create')" ></span>
                <span>Create</span>
            </div>
            <!-- <div  class="nav-btn">
                <span class=""></span>
                <span>Explore</span>
            </div>
            <div  class="nav-btn">
                <span class=""></span>
                <span>Messages</span>
            </div>
            <div  class="nav-btn">
                <span class=""></span>
                <span>Notifications</span>
            </div>
            <div  class="nav-btn">
                <span class=""></span>
                <span>Profile</span>
            </div>
            <div  class="nav-btn more">
                <span class=""></span>
                <span>More</span>
            </div> -->
           
        </section>
</template>
   
   
   
   
   
<script>
    export default {}
</script>

<style lang="scss">

</style>