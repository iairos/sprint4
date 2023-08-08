import { storyService } from '@/services/story.service.js'
import { userService } from '../services/user.service.js'
import { utilService } from '../services/util.service.js'

export const storyStore = {
    state() {
        return {
            stories: [],
        }
    },
    mutations: {
        resetStories(state){
            console.log('restestories')
            state.stories = []
        },
        setStories(state, { stories }) {
            state.stories = stories
        },
        removeStory({ stories }, { storyId }) {
            const idx = stories.findIndex(story => story._id === storyId)
            stories.splice(idx, 1)
        },
        saveStory({ stories }, { savedStory }) {  
            const idx = stories.findIndex(story => story._id === savedStory._id)
            if (idx !== -1) stories.splice(idx, 1, savedStory)  
            else stories.unshift(savedStory)
        },
    },
    actions: {
        async loadStories({ commit }) {
            try{        
                const stories = await storyService.query()
                commit({ type: 'setStories', stories })              
                }           
            catch (err) {
                console.log('Could not get stories')
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
                likedBy:[],
                loc: {
                    lat: 11.11,
                    lng: 22.22,
                    name: "Tel Aviv"
                  }
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
                txt,
                likedBy:[]
            }
            const story = getters.stories.find(story => story._id === storyId)
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
            // get logged in user from getters
            const loggedUser = getters.getLoggedInUser

            // Create a small user object
            const user ={  
                _id: loggedUser._id,
                fullname:loggedUser.fullname,
                imgUrl: loggedUser.imgUrl
            }
            // Search Story
            const story = getters.stories.find(story => story._id === storyId)

            // Deep copy the story
            const storyToUpdate = JSON.parse(JSON.stringify(story))

            
            if(storyToUpdate.likedBy){
                const idx = storyToUpdate.likedBy.findIndex(user => user._id===loggedUser._id)
                // if user not found push to array
                if (idx ===-1) storyToUpdate.likedBy.push(user)
                // else remove from array
                else storyToUpdate.likedBy.splice(idx,1)
            }
            console.log('story before save',storyToUpdate)
            //save to DB 
            try{
                const savedStory = await storyService.save(storyToUpdate) 
                console.log('story after save', savedStory)
                commit({ type: 'saveStory',  savedStory })
                console.log('Story updated')
                return savedStory
            }
            // if Could not save, throw error msg.
            catch(err){
                console.log('Could not update story')
                throw new Error('Service is current not available')
            }  
        },
        async likeComment( {commit, getters } , { storyId , commentId}) {
            
            const loggedUser = getters.getLoggedInUser
            const user ={  
                _id: loggedUser._id,
                fullname:loggedUser.fullname,
                imgUrl: loggedUser.imgUrl
            }
            const story = getters.stories.find(story => story._id === storyId)
            const storyToUpdate = JSON.parse(JSON.stringify(story))
            // console.log('storyToUpdate',storyToUpdate)
            if(storyToUpdate.comments){
                const commentIdx = storyToUpdate.comments
                    .findIndex(comment => comment.id===commentId)
                // console.log('commentIdx',commentIdx)    
                if (commentIdx>-1){
                    const likedBy = storyToUpdate.comments[commentIdx].likedBy
                    // console.log('likedBy',likedBy)  
                    const idx = likedBy.findIndex(user => user._id===loggedUser._id)
                    if (idx ===-1) likedBy.push(user)
                    else likedBy.splice(idx,1)
                }
            }
            
            // console.log('storyToUpdate',storyToUpdate)
            try{
                // console.log('storyToUpdate', storyToUpdate);
                const savedStory = await storyService.save(storyToUpdate) 
                
                console.log('Story updated')
                commit({ type: 'saveStory',  savedStory })
                return savedStory
            }
            catch(err){
                console.log('Could not update story')
            }  
        }
    },
    getters: {
        stories({ stories }) { return stories },
    },
}

