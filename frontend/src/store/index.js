import { createStore } from 'vuex'


import { storyService } from '@/services/story.service.local.js'
import { utilService } from '../services/util.service.js'
const options = {
    strict: true,
    state() {
        return {
            storys: [],
            user: {
                    _id: "u105",
                    fullname: "Bob",
                	imgUrl: "https://media.istockphoto.com/id/1435745704/photo/portrait-of-smiling-mid-adult-businessman-standing-at-corporate-office.webp?b=1&s=170667a&w=0&k=20&c=JGtTfOROhAa32AWDQSZwHK0Un0zX5r4QeDf6nb7_6Nc="
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

        saveStory({ storys }, { updatedStory }) {  
            const idx = storys.findIndex(story => story._id === updatedStory._id)
            if (idx !== -1) storys.splice(idx, 1, updatedStory)
            else storys.push(updatedStory)
        },
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
        async createStory({commit, getters } , { storyToUpload }){

        },
        async commentStory({commit, getters } , { storyId,txt }){
            const loggedUser = getters.getLoggedInUser
            const user ={  
                _id: loggedUser._id,
                fullname:loggedUser.fullname,
                imgUrl: loggedUser.imgUrl
            }
            const comment = {
                id:utilService.makeId(),
                by:user,
                txt
            }
            const story = getters.storys.find(story => story._id === storyId)
            const storyToUpdate = JSON.parse(JSON.stringify(story))
            storyToUpdate.comments.push(comment)
            try{
                const updatedStory = await storyService.save(storyToUpdate) 
                
                commit({ type: 'saveStory', updatedStory })
                console.log('Story updated')
                return updatedStory
            }
            catch(err){
                console.log('Could not update story',err)
                throw new Error('Service is current not available')
            } 
        },
        async likeStory( {commit, getters } , { storyId }) {
            // console.log('context',context)
            const loggedUser = getters.getLoggedInUser
            const user ={  
                _id: loggedUser._id,
                fullname:loggedUser.fullname,
                imgUrl: loggedUser.imgUrl
            }
            const story = getters.storys.find(story => story._id === storyId)
            const storyToUpdate = JSON.parse(JSON.stringify(story))
            if(storyToUpdate.likedBy)
            storyToUpdate.likedBy.push(user)
            console.log('storyToUpdate',storyToUpdate)
            try{
                const updatedStory = await storyService.save(storyToUpdate) 
                
                commit({ type: 'saveStory', updatedStory })
                console.log('Story updated')
                return updatedStory
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
