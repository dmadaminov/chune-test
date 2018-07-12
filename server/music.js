const router = require('express').Router()
const fetchArtist = require('../utils/fetchArtist');

router.post('/', (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    res.status(400);
    return res.json({ error: "Invalid query" });
  }
  fetchArtist(name).then(doc => {
    res.json(doc);
  }).catch(err => {
    console.error(err);
    res.status(500);
    res.json({error: err.message});
  })
});

module.exports = router