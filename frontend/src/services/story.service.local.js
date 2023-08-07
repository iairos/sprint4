import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const STORY_KEY = 'storyDB'
// const USER_KEY = 'userDB'

import storyList from '../../data/stories.json' assert { type: 'json' }

_createStories()


export const storyService = {
	query,
	getById,
	remove,
	save,
	getEmptyStory,
	
}


async function query() {
	return await storageService.query(STORY_KEY)
}

async function getById(storyId) {
	return await storageService.get(STORY_KEY, storyId)
}

async function remove(storyId) {
	return await storageService.remove(STORY_KEY, storyId)
}

async function save(story) {
	if (story._id) {
		
		return await storageService.put(STORY_KEY, story)
	} else {
		return await storageService.post(STORY_KEY, story)
	}
}


function getEmptyStory(txt,imgUrl) {
	return {
	  txt,
	  imgUrl,
	  by: {
		_id: "101",
		imgUrl:
		  "https://resources.premierleague.com/premierleague/photos/players/250x250/p235674.png",
		fullname: "alibaba",
	  },
	};
  }

function _createStories() {
	let story = utilService.loadFromStorage(STORY_KEY)
	if (!story || !story.length) {
		story = storyList
		utilService.saveToStorage(STORY_KEY, story)
	}
	return story
}

// function _createUsers()
// {

// 	let users = utilService.loadFromStorage(USER_KEY)
// 	if (!users || !users.length) {
// 		users = gUser
// 		utilService.saveToStorage(USER_KEY, users)
// 	}
// 	return users[0]
// }

	
