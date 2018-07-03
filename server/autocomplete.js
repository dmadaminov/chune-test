const router = require('express').Router()
const searchArtists = require('../utils/autocomplete/searchArtists');

router.post('/', (req, res, next) => {
  const artistName = req.body.name;
  if(!artistName) {
    res.status(500);
    res.json("Invalid query");
  }
  searchArtists(artistName).then(artistNames => {
    res.json(artistNames);
  }).catch(err => {
    res.status(500);
    res.json({error: err});
  })

});

module.exports = router