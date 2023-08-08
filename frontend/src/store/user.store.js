// import { userService } from '../services/user.service.local'
import { userService } from '../services/user.service'

export const userStore = {
    state: {
        user: null,
        loggedinUser:null
    },
    getters: {
        getLoggedInUser({user}) {return user}
    },
    mutations: {
        setUser(state, { user }) {
            // console.log('state',state)
            state.user = user
        },
        resetUser(state){
            // console.log('deleteUser')
            state.user= null
        },
        setLoggedinUser(state, { user }) {
            // Yaron: needed this workaround as score not reactive from birth
            state.user = (user)? {...user} : null
        },
    },
    actions: {
        async logout({ commit }) {
            try{        
                 const user = await userService.logout()
                 console.log('user logout', user)
                 commit({ type: 'resetUser' })    
                 commit({type: 'resetStories'})
                        
                //  commit({ type: 'setUser' })              
                }           
            catch (err) {
                console.log('Could not logout')
                    // TODO: throw error to display user
            }
            // this.$router.push(`/login`); 
        },
        async loadUser({ commit }){
            const user = await userService.login({username:'jeniferbabiston', password:'abc'})
            console.log('user service login',user)
            commit({ type: 'setUser', user })
        },
        async addStoryToUserLIst( {commit, getters } , { storyId }) {
            const loggedUser = getters.getLoggedInUser
            const user = JSON.parse(JSON.stringify(loggedUser))
            // Search Story
            // console.log('user',user)
            const idx = user.savedStoryIds.findIndex(savedStoryId => savedStoryId === storyId)
            
            if (idx ===-1) user.savedStoryIds.push(storyId)
            else user.savedStoryIds.splice(idx,1)
            
            // console.log('user',user)
            //save to DB 
            try{
                const savedUser = await userService.update(user)  
                commit({ type: 'setUser',  user: savedUser })
                console.log('Story saved in user saved stories list')
                return savedUser
            }
            // if Could not save, throw error msg.
            catch(err){
                console.log('Could not add story to user saved stories list')
                throw new Error('Service is current not available')
            }  
        },
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in login', err)
                throw err
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({ type: 'setLoggedinUser', user })
                return user
            } catch (err) {
                console.log('userStore: Error in signup', err)
                throw err
            }

        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setLoggedinUser', user: null })
            } catch (err) {
                console.log('userStore: Error in logout', err)
                throw err
            }
        },
        // async loadUsers({ commit }) {
        //     commit({type: 'setIsLoading', isLoading: true})
        //     try {
        //         const users = await userService.getUsers()
        //         commit({ type: 'setUsers', users })
        //         commit({type: 'setIsLoading', isLoading: false})
        //     } catch (err) {
        //         console.log('userStore: Error in loadUsers', err)
        //         throw err
        //     }
        // },        
    }
}