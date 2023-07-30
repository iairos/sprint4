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

        saveStory({ storys }, { savedStory }) {  
            const idx = storys.findIndex(story => story._id === savedStory._id)
            if (idx !== -1) storys.splice(idx, 1, savedStory)
           
            else storys.unshift(savedStory)
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
        async AddStory({commit, getters } , { storyToUpload }){
            const loggedUser = getters.getLoggedInUser
            const story = {
                txt:storyToUpload.txt,
                imgsUrl:storyToUpload.imgsUrl,
                by:loggedUser,
                comments:[],
                likedBy:[]
            }
            const storyToAdd = JSON.parse(JSON.stringify(story))
            try{
                const savedStory = await storyService.save(storyToAdd)
                commit({ type: 'saveStory', savedStory })
                console.log('Story saved')
                return savedStory

            }
            catch(err){
                console.log(err,'problem on saving story')
                throw new Error('ups something went wrong, try again later')
            }

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
                const savedStory = await storyService.save(storyToUpdate) 
                
                commit({ type: 'saveStory',  savedStory })
                console.log('Story updated')
                return savedStory
            }
            catch(err){
                console.log('Could not update story',err)
                throw new Error('Service is current not available')
            } 
        },
        async likeStory( {commit, getters } , { storyId }) {
            
            const loggedUser = getters.getLoggedInUser
            const user ={  
                _id: loggedUser._id,
                fullname:loggedUser.fullname,
                imgUrl: loggedUser.imgUrl
            }
            const story = getters.storys.find(story => story._id === storyId)
            const storyToUpdate = JSON.parse(JSON.stringify(story))
            if(storyToUpdate.likedBy){
                const idx = storyToUpdate.likedBy.findIndex(user => user._id===loggedUser._id)
                if (idx ===-1) storyToUpdate.likedBy.push(user)
                else storyToUpdate.likedBy.splice(idx,1)
            }
            
            console.log('storyToUpdate',storyToUpdate)
            try{
                const savedStory = await storyService.save(storyToUpdate) 
                
                commit({ type: 'saveStory',  savedStory })
                console.log('Story updated')
                return savedStory
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
