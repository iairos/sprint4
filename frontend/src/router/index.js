import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../pages/HomeView.vue'
import StoryIndex from '../pages/StoryIndex.vue'
import StoryDetails from '../pages/StoryDetails.vue'
import CreateNewStory from '../cmps/CreateNewStory.vue'
import UserDetails from '../Pages/UserDetails.vue'
import LoginSignUp from '../Pages/LoginSignUp.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/',
      name: 'Home',
      component: StoryIndex,
      children: [
        {
          path: 'details/:storyId',
          name:'storyDetails',
          component: StoryDetails,
        },
        {
          path: 'newStory',
          name: 'newStory',
          component: CreateNewStory,
          
      
        },

    ]
    },
    {
      path: '/userProfile/:userId',
      name: 'Profile',
      component: UserDetails,
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: LoginSignUp,
    // },

    // path: '/userProfile',
    
   
  ]
})

export default router
