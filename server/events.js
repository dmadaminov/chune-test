const router = require('express').Router()
const axios = require('axios');
const getEventsWithCache = require('../utils/events/getEventsWithCache');
const getEventsForMultipleArtists = require('../utils/events/getEventsForMultipleArtists');

// const bandsInTownAPIKey = 'd77c956c4bb08fc6633e207d132e696b';

// router.post('/', (req, res, next) => {

//     const artistName = req.body.name;

//     axios.get(`https://rest.bandsintown.com/artists/${artistName}/events?`, {
//         params: {
//             app_id: bandsInTownAPIKey
//           }
//       }).then(function (response) {
//             res.json({ artist: artistName, data: response.data });
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// });

router.post('/', (req, res, next) => {
  var name = req.body.name;
  if (!name) {
    res.status(400);
    return res.json({ error: "Invalid query" });
  }

  getEventsWithCache(name).then(events => {
    res.json({data: events});
  }).catch(err => {
    console.error("Error fetching events", err);
    res.status(500);
    res.json({error: "Something went wrong in fetching events"});
  })
})

router.post('/multiple', (req, res, next) => {
  var names = req.body.names.split(',');
  if (names.length == 0) {
    res.status(400);
    return res.json({ error: "Invalid query" });
  }

  getEventsForMultipleArtists(names).then(events => {
    res.json({data: events});
  }).catch(err => {
    console.error("Error fetching events", err);
    res.status(500);
    res.json({error: "Something went wrong in fetching events"});
  })
})

module.exports = router;