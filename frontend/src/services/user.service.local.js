import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
import usersList from '../../data/users.json' assert { type: 'json' }

_createUsers()

export const userService = {
  query,
	getById,
	remove,
	save,
	getEmptyUser,
  getLoggedinUser,
 
}

function getLoggedinUser() {
  return usersList[0]
}


async function query() {
	return await storageService.query(USER_KEY)
}

async function getById(userId) {
	return await storageService.get(USER_KEY, userId)
}

async function remove(userId) {
	return await storageService.remove(USER_KEY, userId)
}

async function save(user) {
	if (user._id) {
		
		return await storageService.put(USER_KEY, user)
	} else {
		return await storageService.post(USER_KEY, user)
	}
}


function getEmptyUser(username) {
	return {
    username,
    password: "abc",
    fullname: "New User",
    imgUrl: "https://media.istockphoto.com/id/1479478251/photo/user-profile-avatar-3d-icon.jpg?s=612x612&w=0&k=20&c=AwjHZf2_R9Q3cxZupUC4iR9vIKPXc_z2WcBJaqmiNVE="
	};
  }

function _createUsers() {
	let users = utilService.loadFromStorage(USER_KEY)
	if (!users || !users.length) {
		users = usersList
		utilService.saveToStorage(USER_KEY, users)
	}
	// return users[0]
}

	
