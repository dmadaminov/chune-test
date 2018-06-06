const router = require('express').Router()
const axios = require('axios');

const bandsInTownAPIKey = 'd77c956c4bb08fc6633e207d132e696b';

router.post('/', (req, res, next) => {

    const artistName = req.body.name;

    axios.get(`https://rest.bandsintown.com/artists/${artistName}/events?`, {
        params: {
            app_id: bandsInTownAPIKey
        }
    })
        .then(function (response) {
            res.json({ artist: artistName, data: response.data });
        })
        .catch(function (error) {
            console.log(error);
        });
});

module.exports = router;