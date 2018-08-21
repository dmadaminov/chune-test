const router = require('express').Router()
const axios = require('axios');
const _ = require('lodash');
const getVideosWithCache = require('../utils/videos/getVideosWithCache');
const getVideosForMultipleArtists = require('../utils/videos/getVideosForMultipleArtists');
const FetchArticles = require('../utils/articles/get_articles_for_artist');
const FetchArticlesMultiple = require('../utils/articles/get_articles_for_all_artists');
const { paginate } = require('../utils/globalHelpers');
const dedup = require('../utils/articles/deduplication');

router.post('/', (req, res, next) => {
    var name = req.body.name;
    var page = req.body.page || 1;
    if (!name) {
        res.status(400);
        return res.json({ error: "Invalid query" });
    }

    Promise.all([
        getVideosWithCache(name),
        FetchArticles(name)
    ]).then(results => {
        var result = _.chain(results).flatten(results).orderBy(item => (new Date(item.date)), 'desc').value();

        res.json(paginate(result, page, 30))
    }).catch(function(err){
        console.log("Fetching recent entries failed. Error: "+ err) 
        return false
    })
})

router.post('/multiple', (req, res, next) => {
    var names = req.body.names.split(',');
    var page = req.body.page || 1;
    if (names.length == 0) {
        res.status(400);
        return res.json({ error: "Invalid query" });
    }

    Promise.all([
        getVideosForMultipleArtists(names),
        FetchArticlesMultiple(names)])
        .then(results => {
            var result = _.chain(results).flatten(results).orderBy(item => (new Date(item.date)), 'desc').value();
            res.json(paginate(result, page, 30))
        }).catch(function(err){
            console.log("Fetching recent entries failed. Error: ", err) 
            return false
        })
})

module.exports = router
