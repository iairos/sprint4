import { createStore } from 'vuex'


import { storyService } from '@/services/story.service.local.js'

const options = {
    strict: true,
    state() {
        return {
            count: 100,
            storys: [],
        }
    },
    mutations: {
        setStorys(state, { storys }) {
            state.storys = storys
        },
        removeStory({ storys }, { storyId }) {
            const idx = storys.findIndex(story => story._id === storyId)
            storys.splice(idx, 1)
        }
    },
    actions: {
        async loadStorys({ commit }) {
            try{
                
                const storys = await storyService.query()
                commit({ type: 'setStorys', storys })
                console.log('checking')
                console.log('storys',storys)
                }
            
            catch (err) {
                console.log('Could not get storys')
                    // TODO: throw error to display user
            }
        },
        removeStory({ commit }, { storyId }) {
            storyService.remove(storyId) 
                .then(() => commit({ type: 'removeStory', storyId }))
        }
    },
    getters: {
        storys({ storys }) { return storys }
    },
}

export default createStore(options)
