import { createStore } from 'vuex'

import { storyService } from '@/services/story.service.js'
// import { storyService } from '@/services/story.service.local.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'
import { userStore } from './user.store.js'
import { storyStore } from './story.store.js'

export const options = {
    strict: true,
    modules: {
        userStore,
        storyStore,
      },
}

export default createStore(options)
