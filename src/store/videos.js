import axios from 'axios'

const ADD_VIDEOS = "ADD_VIDEOS"
const CLEAR_VIDEOS = "CLEAR_VIDEOS"
const FETCHING_VIDEOS = "FETCHING_VIDEOS"

const addVideos = data => ({
    type: ADD_VIDEOS,
    data
})

export const clearVideos = () => ({
    type: CLEAR_VIDEOS,
})

export const fetchVideos = name => dispatch => (
    axios.post('/videos', { name })
        .then(res => res.data)
        .then(videos => dispatch(addVideos(videos)))
)

export const fetchingVideos = data => ({
    type: FETCHING_VIDEOS,
    data
})


export const fetchVideosForMultipleArtists = (names, page = 1) => dispatch => {
  dispatch(fetchingVideos());
  axios.post('/videos/multiple', { names: names.join(","), page: page })
      .then(res => res.data)
      .then(data => dispatch(addVideos(data)))
}

const initialState = {
  videos: [],
  currentPage: 1,
  fetching: false,
  endOfList: false,
  initialLoading: true,
};

function videosReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_VIDEOS:
        var videos = state.videos.concat(action.data.data);
        var currentPage = action.data.page;
        var endOfList = action.data.data.length == 0;
        return { ...state, videos, currentPage, fetching: false, endOfList: endOfList, initialLoading: false }
      case CLEAR_VIDEOS:
          return initialState
      case FETCHING_VIDEOS:
        return { ...state, fetching: true }
      default:
          return state
    }
}

export default videosReducer