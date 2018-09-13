
import axios from 'axios'

const ADD_RECENT_ENTRIES = "ADD_RECENT_ENTRIES"
const CLEAR_RECENT_ENTRIES = "CLEAR_RECENT_ENTRIES"
const FETCHING_RECENT_ENTRIES = "FETCHING_RECENT_ENTRIES"

export const clearRecentEntries = () => ({
    type: CLEAR_RECENT_ENTRIES,
})

export const addRecentEntries = data => ({
    type: ADD_RECENT_ENTRIES,
    data
})


export const fetchingRecentEntries = data => ({
    type: FETCHING_RECENT_ENTRIES,
    data
})


export const fetchRecentEntries = (name, page = 1) => dispatch => {
  dispatch(fetchingRecentEntries());
  axios.post('/recent', { name, page: page })
        .then(res => res.data)
        .then(data => dispatch(addRecentEntries(data)))
}

export const fetchRecentEntriesForMultipleArtists = (names, page = 1) => dispatch => {
  dispatch(fetchingRecentEntries());
  axios.post('/recent/multiple', { names: names.join(","), page: page })
      .then(res => res.data)
      .then(data => dispatch(addRecentEntries(data)))
}

const initialState = {
  recentEntries: [],
  currentPage: 1,
  fetching: false,
  endOfList: false,
  initialLoading: true,
};

function recentEntriesReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_RECENT_ENTRIES:
        var recentEntries = state.recentEntries.concat(action.data.data);
        var currentPage = action.data.page;
        var endOfList = action.data.data.length == 0;
        return { ...state, recentEntries, currentPage, fetching: false, endOfList: endOfList, initialLoading: false }
      case CLEAR_RECENT_ENTRIES:
          return initialState
      case FETCHING_RECENT_ENTRIES:
        return { ...state, fetching: true }
      default:
          return state
    }
}

export default recentEntriesReducer