import { createStore } from 'vuex'


import { storyService } from '@/services/story.service.local.js'

const options = {
    strict: true,
    state() {
        return {
            count: 100,
            storys: [],
            user: {
                			_id: "u105",
                			fullname: "Bob",
                			imgUrl: "http://some-img"
                		  },
        }
    },
    mutations: {
        setStorys(state, { storys }) {
            state.storys = storys
        },
        
        removeStory({ storys }, { storyId }) {
            const idx = storys.findIndex(story => story._id === storyId)
            storys.splice(idx, 1)
        },
        likeStory({ storys }, { updatedStory }) {
          
            const idx = storys.findIndex(story => story._id === storyId)
            storys.splice(idx, 1, updatedStory)
        }
    },
    actions: {
        async loadStorys({ commit }) {
            try{        
                const storys = await storyService.query()
                commit({ type: 'setStorys', storys })              
                }           
            catch (err) {
                console.log('Could not get storys')
                    // TODO: throw error to display user
            }
        },
        async removeStory({ commit }, { storyId }) {
            try{
                await storyService.remove(storyId) 
                commit({ type: 'removeStory', storyId })

            }
            catch(err){
                console.log('Could not remove story')
            }

        },

        async likeStory1({ commit }, { storyId, }) {
                commit({ type: 'likeStory', storyId })
                console.log('Story updated')
              
        },
        async likeStory( {commit, getters } , { storyId }) {
            // console.log('context',context)
            const user = getters.getLoggedInUser
            const miniUser ={  
                _id: user._id,
                fullname:    user.fullname,
                imgUrl: user.imgUrl
            }
            const story = getters.storys.find(story => story._id === storyId)
            const storyToUpdate = JSON.parse(JSON.stringify(story))
            storyToUpdate.likedBy.push(miniUser)
            try{
                const updatedStory = await storyService.save(storyToUpdate) 
                commit({ type: 'likeStory', updatedStory })
                console.log('Story updated')
            }
            catch(err){
                console.log('Could not update story')
            }  
        }
    },
    getters: {
        storys({ storys }) { return storys },
        getLoggedInUser({user}) {return user}

    },
}

export default createStore(options)
