const router = require('express').Router()
const axios = require('axios');

const lastFmApiKey = '2858a6b55145bda1f888457d09073064';

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
            const artistNames = toObject(response.data.results.artistmatches.artist.map(artist => artist.name));
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