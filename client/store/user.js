const ADD_USER = "ADD_USER"

export const addUser = userID => ({
  type: ADD_USER,
  userID
})

function userReducer(userID='', action){
  switch(action.type){
    case ADD_USER:
      userID = action.userID
    default:
      return userID
  }
}

export default userReducer