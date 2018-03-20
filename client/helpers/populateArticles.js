export const populateArticles =  (artists, props) => {
    Promise.all(artists.map(artist=>props.fetchArticles(artist)))
}