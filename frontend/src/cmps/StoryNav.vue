<template>
        <section class="story-nav">


                <div  class="logo flex" @click="$router.push('/')">
                    <span class="svg-icon" v-html="$svg('logo')" ></span>
                </div>
                <div  v-for="btn, idx in btns" class="nav-btn" :class="{active: btn.isActive}" @click="onChangeRoute(idx, btn.path)">
                    <span class="svg-icon" v-html="$svg(btn.svg)" ></span>
                    <span>{{ btn.title }}</span>
                </div>
                <!-- <div  class="nav-btn" @click="$router.push('/')">
                    <span class="svg-icon" v-html="$svg('home')" ></span>
                    <span>Home</span>
                </div>
                <div  class="nav-btn">
                    <span class="svg-icon search-icon" v-html="$svg('search')" @click="$router.push('/')"></span>
                    <span>Search</span>
                </div>
                <div  class="nav-btn" @click="$router.push('/newStory')">
                    <span class="svg-icon" v-html="$svg('create')" ></span>
                    <span>Create</span>
                </div> -->
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
    export default {
        data(){
            return {
                btns: [
                    {
                        id: 1,
                        isActive: true,
                        title: 'Home',
                        path: '/',
                        svg: 'home'
                    },
                    {
                        id: 2,
                        isActive: false,
                        title: 'Search',
                        path: '/',
                        svg: 'search'
                    },
                    {
                        id: 3,
                        isActive: false,
                        title: 'Create',
                        path: '/newStory',
                        svg: 'create'
                    },
                ]
            }
        },
        methods: {
            onChangeRoute(idx, path){
                this.btns.forEach(btn => btn.isActive = false)
                this.btns[idx].isActive = true
                this.$router.push(path)
            }
        }
    }
</script>

<style lang="scss">

</style>