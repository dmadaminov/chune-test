import axios from 'axios'

const ADD_ARTICLES = "ADD_ARTCILES"
const FETCHING_ARTICLES = "FETCHING_ARTICLES"
// const FETCHING_DONE = "FETCHING_DONE"
const CLEAR_ARTICLES = "CLEAR_ARTICLES"

export const addArticles = data => ({
    type: ADD_ARTICLES,
    data
})

export const clearArticles = () => ({
    type: CLEAR_ARTICLES,
})

export const fetchArticles = name => dispatch => {
  dispatch(fetchingArticles());
  return axios.post('/articles', { name })
        .then(res => res.data)
        .then(articles => dispatch(addArticles(articles)))
}

export const fetchingArticles = data => ({
    type: FETCHING_ARTICLES,
    data
})

// export const fetchingDone = data => ({
//     type: FETCHING_DONE,
//     data
// })

export const fetchArticlesForMultipleArtists = (names, page = 1) => dispatch => {
  dispatch(fetchingArticles());
  console.log("Gonna fetch", names, page)
  axios.post('/articles/multiple', { names: names.join(","), page: page })
      .then(res => res.data)
      .then(data => dispatch(addArticles(data)))
}

const initialState = {
  articles: [],
  currentPage: 1,
  fetching: false,
  endOfList: false,
};

function articleReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ARTICLES:
          var articles = state.articles.concat(action.data.data);
          var currentPage = action.data.page;
          var endOfList = action.data.data.length == 0;
          return { ...state, articles, currentPage, fetching: false, endOfList: endOfList }
        case CLEAR_ARTICLES:
            return initialState
        case FETCHING_ARTICLES:
          return { ...state, fetching: true }
        default:
            return initialState
    }
}

export default articleReducer