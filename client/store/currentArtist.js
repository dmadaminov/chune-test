import axios from 'axios'

const ADD_CURRENT_ARTIST = "ADD_CURRENT_ARTIST"
const CLEAR_RECENT_ENTRIES_FOR_CURRENT_ARTIST = "CLEAR_RECENT_ENTRIES_FOR_CURRENT_ARTIST"
const ADD_RECENT_ENTRIES_FOR_CURRENT_ARTIST = "ADD_RECENT_ENTRIES_FOR_CURRENT_ARTIST"
const FETCHING_RECENT_ENTRIES_FOR_CURRENT_ARTIST = "FETCHING_RECENT_ENTRIES_FOR_CURRENT_ARTIST"
const RELOADING_ARTIST = "RELOADING_ARTIST"

const addCurrentArtist = artist => ({
    type: ADD_CURRENT_ARTIST,
    artist
});

const clearRecentEntriesForCurrentArtist = () => ({
    type: CLEAR_RECENT_ENTRIES_FOR_CURRENT_ARTIST,
});


export const addRecentEntriesForCurrentArtist = data => ({
    type: ADD_RECENT_ENTRIES_FOR_CURRENT_ARTIST,
    data
})

export const fetchingRecentEntries = data => ({
    type: FETCHING_RECENT_ENTRIES_FOR_CURRENT_ARTIST,
    data
})

export const reloadingArtist = data => ({
    type: RELOADING_ARTIST,
    data
})


export const fetchCurrentArtist = name => dispatch => (
    axios.post('/music', { name })
      .then(res => {
        let artist = res.data;
        dispatch(addCurrentArtist(artist))
        dispatch(clearRecentEntriesForCurrentArtist())
      })
);

export const fetchRecentEntriesForCurrentArtist = (name, page = 1) => dispatch => {
  dispatch(fetchingRecentEntries());
  axios.post('/recent', { name, page: page })
        .then(res => res.data)
        .then(data => dispatch(addRecentEntriesForCurrentArtist(data)))
}

const initialState = {
  artist: {},
  recentEntries: [],
  currentPage: 1,
  fetching: false,
  endOfList: false,
  initialLoading: true,
}

function currentReducer (state = initialState, action){
    switch (action.type){
        case ADD_CURRENT_ARTIST:
            return {...state, artist: action.artist}
        case ADD_RECENT_ENTRIES_FOR_CURRENT_ARTIST:
          var recentEntries = state.recentEntries.concat(action.data.data);
          var currentPage = action.data.page;
          var endOfList = action.data.data.length == 0;
          return { ...state, recentEntries, currentPage, fetching: false, endOfList: endOfList, initialLoading: false }
        case FETCHING_RECENT_ENTRIES_FOR_CURRENT_ARTIST:
          return { ...state, fetching: true }
        case CLEAR_RECENT_ENTRIES_FOR_CURRENT_ARTIST:
          return {...state, recentEntries: []}
        case RELOADING_ARTIST:
          return {...state, initialLoading: true}
        default:
          return state
    }
}

export default currentReducer