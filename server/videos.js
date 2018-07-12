const router = require('express').Router();
const axios = require('axios');
const _ = require('lodash');

const getVideosWithCache = require('../utils/videos/getVideosWithCache');
const getVideosForMultipleArtists = require('../utils/videos/getVideosForMultipleArtists');
const { paginate } = require('../utils/globalHelpers');
const updateVideosDB = require('../utils/videos/updateVideosDB');

router.post('/', (req, res, next) => {
  var name = req.body.name;
  var page = req.body.page || 1;

  updateVideosDB().then(_res => {
    getVideosWithCache(name).then(result => {
      result = _.orderBy(result, item => (new Date(item.date)), 'desc');

      res.json(paginate(result, page))
    }).catch(function(err){
      console.log("Fetching videos failed. Error: "+ err) 
      return false
    })
  })
});

router.post('/multiple', (req, res, next) => {
  var names = req.body.names.split(',');
  var page = req.body.page || 1;
  if(!names) {
    res.status(400);
    return res.json({error: "Invalid query"});
  }
  updateVideosDB().then(_res => {
    getVideosForMultipleArtists(names).then(result => {
      result = _.orderBy(result, item => (new Date(item.date)), 'desc');

      res.json(paginate(result, page))
    }).catch(function(err){
      console.log("Fetching videos failed. Error: "+ err) 
      return false
    })
  });
})


module.exports = router
