const router = require('express').Router()
const Spotify = require('node-spotify-api')

router.post('/', (req, res, next) => {
    const name = req.body.name

    const spotify = new Spotify({
        id: "6ea662ab9aaf477790445529c95453cd",
        secret: "0c422ae9178649d58414dbaec719330b"
    });

    spotify
        .search({type: 'artist', query: name})
        .then(result => {
            const artistId = result.artists.items[0].id;
            const name = result.artists.items[0].name;
            spotify
                .request(`https://api.spotify.com/v1/artists/${artistId}/related-artists`)
                .then(function (data) {
                    res.json({artistId: artistId, name: name, relatedArtists: data.artists})
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                });
        });
});

module.exports = router