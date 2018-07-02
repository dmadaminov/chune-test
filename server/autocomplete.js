const router = require('express').Router()
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const lastFmApiKey = process.env.LAST_FM_API_KEY;

const withoutWords = (name, words) => {
  var ok = true;
  words.forEach(word => {
    ok = ok && name.indexOf(word) == -1;
  })
  return ok;
}

router.post('/', (req, res, next) => {
    const artistName = req.body.name;
    axios.get(`http://ws.audioscrobbler.com/2.0/`, {
        params: {
            method: 'artist.search',
            artist: artistName,
            api_key: lastFmApiKey,
            format: 'json'
        }
    })
        .then(function (response) {
            const artistNames = response.data.results.artistmatches.artist.map(artist => artist.name).filter(name => {
              return withoutWords(name, [
                '&', 'featuring', 'feat.', 'and', ',', "Feat.", "YouTube", " x ", " ft ", " ft.", "Ft.", "(", ")",
              ]);
            });
            res.json(artistNames);
        })
        .catch(function (error) {
            console.log(error);
        });
});

const toObject = (arr) => {
    let data = {};

    arr.forEach(artist => {
        data[artist] = null
    });

    return data;
};

module.exports = router