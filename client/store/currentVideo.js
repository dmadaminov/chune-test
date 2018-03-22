const ADD_VIDEO = "ADD_VIDEO"

export const addVideo = url => ({
    type: ADD_VIDEO,
    url
})

function currentVideoReducer (url= '', action){
    switch(action.type){
        case ADD_VIDEO:
            return action.url
        default:
            return url
    }
}

export default currentVideoReducer