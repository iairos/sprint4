
import users from '../../data/users.json' assert { type: 'json' }

export const userService = {
  
  getLoggedinUser,
 
}

function getLoggedinUser() {
  return users[0]
}