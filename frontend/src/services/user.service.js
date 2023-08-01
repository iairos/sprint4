
import user from '../../data/users.json' assert { type: 'json' }

export const userService = {
  
  getLoggedinUser,
 
}

function getLoggedinUser() {
  return user
}