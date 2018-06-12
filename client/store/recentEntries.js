import axios from 'axios'
const ADD_RECENT_ENTRIES = "ADD_RECENT_ENTRIES"
const CLEAR_RECENT_ENTRIES = "CLEAR_RECENT_ENTRIES"


export const clearRecentEntries = () => ({
    type: CLEAR_RECENT_ENTRIES,
})

export const addRecentEntries = recentEntries => ({
    type: ADD_RECENT_ENTRIES,
    recentEntries
})

export const fetchRecentEntries = name => dispatch => {
    Promise.all([
        fetchRecentArticles(name),
        fetchRecentVideos(name)
    ]).then(recentEntries => {
        var arrangedEntries = recentEntries ? [].concat.apply([], recentEntries) : []

        arrangedEntries.sort((x,y) => {
            return y.date - x.date
        })
        dispatch(addRecentEntries(arrangedEntries))
    }).catch(function(err){
        console.log("Fetching recent entries failed. Error: "+ err) 
        return false
    })
}

export const fetchAllRecentEntries = artists => dispatch => {
    let promises = [];
    artists.map(artist => {
        promises.push(fetchRecentArticles(artist));
        promises.push(fetchRecentVideos(artist));
    })
    Promise.all(promises).then(recentEntries => {
        var arrangedEntries = recentEntries ? [].concat.apply([], recentEntries) : []

        arrangedEntries.sort((x,y) => {
            return y.date - x.date
        })
        dispatch(addRecentEntries(arrangedEntries))
    }).catch(function(err){
        console.log("Fetching recent entries failed. Error: "+ err) 
        return false
    })
    
}

const fetchRecentArticles = name => {
    return axios.post('/articles', { name })
        .then(res => res.data)
        .then(recentEntries => {
            return recentEntries
        }).catch(function(err){
        console.log("Fetching articles failed for "+name+". Error: "+ err) 
        return false
    })
}
const fetchRecentVideos = name => {
    return axios.post('/videos', { name: name.toLowerCase() })
        .then(res => res.data)
        .then(recentEntries => {
            return recentEntries
        }).catch(function(err){
        console.log("Fetching videos failed for "+name+". Error: "+ err) 
        return false
    })
}



function recentEntriesReducer(recentEntries = [], action) {
    switch (action.type) {
        case ADD_RECENT_ENTRIES:
            return recentEntries.concat(action.recentEntries)
        case CLEAR_RECENT_ENTRIES:
            return []
        default:
            return recentEntries
    }
}

export default recentEntriesReducer