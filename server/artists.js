const router = require('express').Router()
const Spotify = require('node-spotify-api')
const fetchArtist = require('../utils/fetchArtist');

router.post('/', (req, res, next) => {
  var names = req.body.names.split(",");
  if (names.length == 0) {
    res.status(400);
    return res.json({ error: "Invalid query" });
  }

  Promise.all(names.map(name => {
    return fetchArtist(name);
  })).then(artists => {
    res.json(artists);
  }).catch(err => {
    console.error('Error occurred: ' + err);
    res.status(500);
    res.json({error: err});
  })
});

module.exports = router