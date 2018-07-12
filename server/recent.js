const router = require('express').Router()
const axios = require('axios');
const _ = require('lodash');
const getVideosWithCache = require('../utils/videos/getVideosWithCache');
const getVideosForMultipleArtists = require('../utils/videos/getVideosForMultipleArtists');
const getArticlesWithCache = require('../utils/articles/getArticlesWithCache');
const getArticlesForMultipleArtists = require('../utils/articles/getArticlesForMultipleArtists');
const { paginate } = require('../utils/globalHelpers');

router.post('/', (req, res, next) => {
  var name = req.body.name;
  var page = req.body.page || 1;
  Promise.all([
    getVideosWithCache(name),
    getArticlesWithCache(name)
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

  Promise.all([
    getVideosForMultipleArtists(names),
    getArticlesForMultipleArtists(names),
  ]).then(results => {
    var result = _.chain(results).flatten(results).orderBy(item => (new Date(item.date)), 'desc').value();
    res.json(paginate(result, page, 30))
  }).catch(function(err){
    console.log("Fetching recent entries failed. Error: ", err) 
    return false
  })
})


module.exports = router
