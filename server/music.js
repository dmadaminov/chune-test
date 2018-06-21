const router = require('express').Router()
const Spotify = require('node-spotify-api')
const fetchArtist = require('../utils/fetchArtist');

// router.post('/', (req, res, next) => {
//     const name = req.body.name

//     const spotify = new Spotify({
//         id: "6ea662ab9aaf477790445529c95453cd",
//         secret: "0c422ae9178649d58414dbaec719330b"
//     });

//     spotify
//         .search({type: 'artist', query: name})
//         .then(result => {
//             console.log("Artist result", result);
//             if(result.artists.items.length == 0 ) {
//               res.status(500)
//               return  res.send({ error: "Artist not found" })
//             }
//             const artist = result.artists.items[0];
//             const artistId = artist.id;
//             const image = artist.images[0];
//             spotify
//                 .request(`https://api.spotify.com/v1/artists/${artistId}/related-artists`)
//                 .then(function (data) {
//                     res.json({
//                         artistId: artistId,
//                         name: name,
//                         imageUrl: image.url,
//                         genres: artist.genres,
//                         relatedArtists: data.artists
//                     });
//                 })
//                 .catch(function (err) {
//                     console.error('Error occurred: ' + err);
//                     res.json({});
//                 });
//         });
// });

router.post('/', (req, res, next) => {
  const name = req.body.name;
  fetchArtist(name).then(doc => {
    res.json(doc);
  }).catch(err => {
    console.error('Error occurred: ' + err);
    res.status(500);
    res.json({error: err});
  })
});

module.exports = router