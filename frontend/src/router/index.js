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
          name:'story details',
          component: StoryDetails
        }

    ]
    },
   
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue')
    }
  ]
})

export default router
