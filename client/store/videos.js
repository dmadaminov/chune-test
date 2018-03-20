import axios from 'axios'

const ADD_VIDEOS = "ADD_VIDEOS"
const CLEAR_VIDEOS = "CLEAR_VIDEOS"

const addVideos = videos => ({
    type: ADD_VIDEOS,
    videos
})

export const clearVideos = () => ({
    type: CLEAR_VIDEOS,
})

export const fetchVideos = name => dispatch => (
    axios.post('/videos', { name })
        .then(res => res.data)
        .then(videos => dispatch(addVideos(videos)))
)

function videosReducer(videos = [], action) {
    switch (action.type) {
        case ADD_VIDEOS:
            return videos.concat(action.videos)
        case CLEAR_VIDEOS:
            return []
        default:
            return videos
    }
}

export default videosReducer