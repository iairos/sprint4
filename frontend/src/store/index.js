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
        // setUser(state, { user }) {
        //     state.user = 
        // },
        removeStory({ storys }, { storyId }) {
            const idx = storys.findIndex(story => story._id === storyId)
            storys.splice(idx, 1)
        },
        likeStory({ storys, user }, { storyId }) {
            console.log('user',user)
            const miniUser ={  
                _id: user._id,
                fullname:    user.fullname,
                imgUrl: user.imgUrl
            }
            const storyToUpdate = storys.find(story => story._id === storyId)
            storyToUpdate.likedBy.push(miniUser)
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
        async likeStory({ commit }, { storyId, user }) {
            // try{
                // await storyService.likeStory(storyId, user) 
                commit({ type: 'likeStory', storyId })
                console.log('update story')
            // }
            // catch(err){
            //     console.log('Could not update story')
            // }
            
        }
    },
    getters: {
        storys({ storys }) { return storys },
        user({user}) {return user}

    },
}

export default createStore(options)
