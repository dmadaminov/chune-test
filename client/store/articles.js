import axios from 'axios'

const ADD_ARTICLES = "ADD_ARTCILES"
const CLEAR_ARTICLES = "CLEAR_ARTICLES"

const addArticles = articles => ({
    type: ADD_ARTICLES,
    articles
})

export const clearArticles = () => ({
    type: CLEAR_ARTICLES,
})

export const fetchArticles = name => dispatch => (
    axios.post('/articles', { name })
        .then(res => res.data)
        .then(articles => dispatch(addArticles(articles)))
)

function articleReducer(articles = [], action) {
    switch (action.type) {
        case ADD_ARTICLES:
            return articles.concat(action.articles)
        case CLEAR_ARTICLES:
            return []
        default:
            return articles
    }
}

export default articleReducer