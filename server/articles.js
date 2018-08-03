const router = require('express').Router()
const _ = require('lodash');
const { paginate } = require('../utils/globalHelpers');
const getArticlesFromCache = require('../utils/articles/getArticlesFromCache');
const getArticlesForMultipleArtists = require('../utils/articles/getArticlesForMultipleArtists');
const { fetchBillboard, fetchPf, fetchHnhh, fetchTsis, fetchEdms, fetchConsequence,fetchStereoGum,
        fetchTinymt, fetchDancingA, fetch2dope, fetchRapRadar, fetchPopJus, fetchMusicBlog, fetchAnr,
        fetchCaesar, fetchEdmNations, fetchIndietronica, fetchKings, fetchLive
 } = require('../utils/articles/fetchArticles')

router.post('/', (req, res, next) => {
  var name = req.body.name
  if (!name) {
    res.status(400);
    return res.json({ error: "Invalid query" });
  }

    getArticlesFromCache(name).then(results => {
      var result = _.orderBy(results, item => (new Date(item.date)), 'desc');

      res.json(paginate(result, page))
    }).catch(function(err){
      console.log("Fetching articles failed. Error: "+ err) 
      return false
    })
})

router.post('/multiple', (req, res, next) => {
  var names = req.body.names.split(",")
  var page = req.body.page || 1;

  if (names.length == 0) {
    res.status(400);
    return res.json({ error: "Invalid query" });
  }

    getArticlesForMultipleArtists(names).then(results => {
      // console.log("Type: ", results[0].date instanceof Date)
      var result = _.orderBy(results, item => (new Date(item.date)), 'desc');
      res.json(paginate(result, page))
    }).catch(function(err){
      console.log("Fetching articles failed. Error: "+ err) 
      return false
    })
})

module.exports = router
