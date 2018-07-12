import { auth } from '../firebase';

const ADD_USER = "ADD_USER"
const LOG_OUT = "LOG_OUT"

export const addUser = userID => ({
  type: ADD_USER,
  userID
})

export const logOut = () => ({
  type: LOG_OUT,
})

function userReducer(userID='', action){
  switch(action.type){
    case ADD_USER:
      return action.userID
    case LOG_OUT:
      return ''
    default:
      return userID
  }
}

export default userReducer