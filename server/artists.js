const router = require('express').Router()
const Spotify = require('node-spotify-api')
const fetchArtist = require('../utils/fetchArtist');
const { Op } = require('sequelize');
const { Artist } = require('./models/index');

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

router.post('/follow', (req, res, next) => {
    var artist = req.body.artist
    if (!artist) {
        res.status(400);
        return res.json({error: "Invalid request"});
    } 
    
    Artist.findOne({
        where: {
            name: artist
        }
    }).then(record => {
        // TODO: We really want to remove this once MB has been imported as it could be a major security risk
        if(!record) {
            Artist.create({
                name: artist,
                disambiguation: ' ',
                isFollowed: true,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return res.json({ result: true })
        }
        // Update the record to isFollowed if its not already set
        if (!record.isFollowed) {
            Artist.update(
                { isFollowed: true },
                { where: { name: artist }
                });
        }
        return res.json({ result: true })
    }); 
});

module.exports = router
