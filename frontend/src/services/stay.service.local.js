import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const STAY_KEY = 'stayDB'

_createStays()

export const stayService = {
	query,
	getById,
	remove,
	save,
	getEmptyStay,
}

async function query() {
	return await storageService.query(STAY_KEY)
}

async function getById(stayId) {
	return await storageService.get(STAY_KEY, stayId)
}

async function remove(stayId) {
	return await storageService.remove(STAY_KEY, stayId)
}

async function save(stay) {
	if (stay._id) {
		return await storageService.put(STAY_KEY, stay)
	} else {
		return await storageService.post(STAY_KEY, stay)
	}
}

function getEmptyStay() {
	return {
		name: '',
		price: 0,
		labels: [],
		createdAt: Date.now(),
		inStock: false,
	}
}

function _createStays() {
	let stays = utilService.loadFromStorage(STAY_KEY)
	if (!stays || !stays.length) {
		stays= [_createStay('apt1', 'house'), _createStay('apt2', 'Dome')]
		utilService.saveToStorage(STAY_KEY, stays)
	}
	return stays
}


function _createStay(name, type){
	const stay = {
		_id: utilService.makeId(),
		name,
		type,
		imgUrls: ["https://e26e9b.jpg", "otherImg.jpg"],
		price: 80.00,
		summary: "Fantastic duplex apartment...",
		capacity: 8,
		amenities: [
		  "TV",
		  "Wifi",
		  "Kitchen",
		  "Smoking allowed",
		  "Pets allowed",
		  "Cooking basics"
		],
		labels: [
		  "Top of the world",
		  "Trending",
		  "Play",
		  "Tropical"
		],
		host: {
		  _id: "u101",
		  fullname: "Davit Pok",
		  imgUrl: "https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small",
		},
		loc: {
		  country: "Portugal",
		  countryCode: "PT",
		  city: "Lisbon",
		  address: "17 Kombo st",
		  lat: -8.61308,
		  lng: 41.1413
		},
		reviews: [
		  {
			id: "madeId",
			txt: "Very helpful hosts. Cooked traditional...",
			rate: 4,
			by: {
			  _id: "u102",
			  fullname: "user2",
			  imgUrl: "/img/img2.jpg"
			}
		  }
		],
		likedByUsers: ['mini-user']
	  }
	  
	return stay
	
}