export const populateArticles =  (artists, props) => {
    Promise.all(artists.map(artist=>props.fetchArticles(artist)))
}

export const timestampToDate = function(timestamp) {
    var time = new Date(timestamp)
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var y = time.getFullYear();
    var m = months[time.getMonth()];
    var d = time.getDate();

    return d+' '+m+', '+y
}
