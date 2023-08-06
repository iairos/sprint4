// import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


export const storyService = {
	query,
	getById,
	remove,
	save,
	getEmptyStory,
}


async function query() {
	return await httpService.get('story')
}

async function getById(storyId) {
	return await httpService.get(`story/${storyId}`)
	
}

async function remove(storyId) {
	return await httpService.delete(`story/${storyId}`)
}

async function save(story) {
	console.log('story',story)
	if (story._id) {
		savedStory = await httpService.put(`story/${story._id}`, story)
	} else {
		savedStory = await httpService.post('story', story)
	}
	return savedStory
}


function getEmptyStory(txt,imgUrl) {
	return {
	  txt,
	  imgUrl,
	  by: {
		imgUrl:
		  "https://resources.premierleague.com/premierleague/photos/players/250x250/p235674.png",
		fullname: "alibaba",
	  },
	};
  }
