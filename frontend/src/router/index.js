import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../pages/HomeView.vue'
import StoryIndex from '../pages/StoryIndex.vue'
import StoryDetails from '../pages/StoryDetails.vue'

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
        }

    ]
    },
   
  ]
})

export default router
