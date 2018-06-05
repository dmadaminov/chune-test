const router = require('express').Router()
const Spotify = require('node-spotify-api')

router.post('/', (req, res, next) => {
    const name = req.body.name
    const spotify = new Spotify({
        id: "6ea662ab9aaf477790445529c95453cd",
        secret: "0c422ae9178649d58414dbaec719330b" 
    })
    
    spotify
        .search({type: 'artist', query: name})
        .then(result => {
            res.json({id : result.artists.items[0].id, name: result.artists.items[0].name})
        })
})

module.exports = router