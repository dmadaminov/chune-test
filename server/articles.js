const router = require('express').Router()
const { fetchBillboard, fetchPf, fetchHnhh, fetchTsis, fetchEdms, fetchConsequence,fetchStereoGum,
        fetchTinymt, fetchDancingA, fetch2dope, fetchRapRadar, fetchPopJus, fetchMusicBlog, fetchAnr,
        fetchCaesar, fetchEdmNations, fetchIndietronica, fetchKings, fetchLive
 } = require('../utils/fetchArticles')

router.post('/', (req, res, next) => {
    var name = req.body.name
    if(!Array.isArray(name)){ 
        name = [name]
    }
    Promise.all(
         name.map(name => 
            Promise.all([
                fetchBillboard(name),
                fetchPf(name),
                fetchHnhh(name),
                fetchTsis(name),
                // fetchEdms(name),
                fetchConsequence(name),
                // fetchStereoGum(name),
                fetchTinymt(name),
                fetchDancingA(name),
                fetch2dope(name),
                fetchRapRadar(name),
                fetchPopJus(name),
                fetchMusicBlog(name),
                fetchAnr(name),
                fetchCaesar(name),
                // fetchEdmNations(name),
                fetchIndietronica(name),
                fetchKings(name),
                // fetchLive(name),
            ])
        )
    ).then(matches => {
        var result = [].concat.apply([], matches);
        result = [].concat.apply([], result);
        res.json(result)
    }).catch(function(err){
            console.log("Fetching articles failed. Error: "+ err) 
            return false
        })
})

module.exports = router
