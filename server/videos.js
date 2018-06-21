const router = require('express').Router()
const axios = require('axios')
const { fetchVids } = require('../utils/videos/fetchVideos')
const getVideosWithCache = require('../utils/videos/getVideosWithCache');
const getVideosForMultipleArtists = require('../utils/videos/getVideosForMultipleArtists');
const { paginate } = require('../utils/globalHelpers');

// router.post('/', (req, res, next)=>{
//     var name = req.body.name

//     const bfastId = "UChi08h4577eFsNXGd3sxYhw"
//     const swayId = "UCuS96jkLKpTaGB_OWnwZV_A"
//     const nardwuarServietteId = "UC8h8NJG9gacZ5lAJJvhD0fQ"
//     const noiseyId = "UC0iwHRFpv2_fpojZgQhElEQ"
//     const hot97Id = "UC5RwNJQSINkzIazWaM-lM3Q"
//     const nprMusicId = "UC4eYXhJI4-7wSWc8UNRwD4A"
//     const montrealityId = "UCeEE5rjWspDkp-PdqjB5QEQ"
//     const complexId = "UCE_--R1P5-kfBzHTca0dsnw"
//     const theneedledropId = "UCt7fwAhXDy3oNFTAzF2o8Pw"
//     const pitchforkId = "UC7kI8WjpCfFoMSNDuRh_4lA"
//     const geniusId = "UCyFZMEnm1il5Wv3a6tPscbA"
//     const pigeonsPlanesId = "UCzHcC_PfVKid0BITeTkZMjQ"
//     const fuseId = "UCi_XQVMRd0hrj6Ka0yCnR3A"
//     const theFaderId = "UCRCOCvfOkoqneyQCbNOUPwg"
//     const rollingStoneId = "UC-JblcinswY50lrUdSaRNEg"
//     const billboardId = "UCsVcseUYbYjldc-XgcsiEbg"
//     const allDefMusicId = "UChnxjIaAJCJgNm8jUTb1A9g"
//     const bvtvMusicId = "UCc27uVVmcn23SGDYL5uIpMQ"
//     const rapUpTVId = "UChwgB3XD2h__UI3bjOk_4Fg"
//     const blankTVId = "UC8l9frL61Yl5KFOl87nIm2w"
//     const laBlogothequeId = "UCFAKGci5lneha2x4XMbzYrQ"
//     const noJumperId = "UCNNTZgxNQuBrhbO0VrG8woA"
//     const djvladId = "UCg7lal8IC-xPyKfgH4rdUcA"
//     const worldstarhiphopId = "UC-yXuc1__OzjwpsJPlxYUCQ"
//     const nmeId = "UCiTFwf4VFGMyfg3cQlXP9JQ"
//     const iHeartRadioId = "UCoBMK97ZfZmRCqIwMQYdicA"
//     const virginRadioUKId = "UCIhTZA7_-jz6nyxW2LePWLQ"
//     const bbcRadio1Id = "UC-FQUIVQ-bZiefzBiQAa8Fw"
//     const aMusicBlogYeaId = "UCUdh03xdul9ITREyFGQp4dw"
//     if(!Array.isArray(name)){ 
//             name = [name]
//         }
//         Promise.all(
//             name.map(name => 
//                 Promise.all(
//                   [ fetchVids(name, bfastId, "The Breakfast Club"),
//                     // fetchVids(name, swayId, "Sway In The Morning"),
//                     // fetchVids(name, hot97Id, "Hot 97"),
//                     // fetchVids(name, noiseyId, "Noisey"),
//                     // fetchVids(name, nprMusicId, "NPR Music"),
//                     // fetchVids(name, montrealityId, "Monreality"),
//                     // fetchVids(name, complexId, "Complex"),
//                     // fetchVids(name, theneedledropId, "The Needle Drop"),
//                     // fetchVids(name, pitchforkId, "Pitchfork"),
//                     // fetchVids(name, geniusId, "Genius"),
//                     // fetchVids(name, pigeonsPlanesId, "Pigeons & Planes"),
//                     // fetchVids(name, theFaderId, "The Fader"),
//                     // fetchVids(name, rollingStoneId, "Rolling Stone"),
//                     // fetchVids(name, billboardId, "Billboard"),
//                     // fetchVids(name, allDefMusicId,"All Def Music"),
//                     // fetchVids(name, bvtvMusicId, "BVTV Music"),
//                     // fetchVids(name, rapUpTVId, "RapUpTV"),
//                     // fetchVids(name, blankTVId, "BlankTV"),
//                     // fetchVids(name, laBlogothequeId, "La Blogothèque"),
//                     // fetchVids(name, noJumperId, "No Jumper"),
//                     // fetchVids(name, djvladId, "DJ Vlad"),
//                     // fetchVids(name, worldstarhiphopId, "WORLDSTARHIPHOP"),
//                     // fetchVids(name, nmeId, "NME"),
//                     // fetchVids(name, iHeartRadioId, "iHeartRadio"),
//                     // fetchVids(name, virginRadioUKId, "Virgin Radio UK"),
//                     // fetchVids(name, bbcRadio1Id, "BBC Radio 1"),
//                     // fetchVids(name, aMusicBlogYeaId, "A Music Blog, Yea?"),
//                     // fetchVids(name, nardwuarServietteId, "Nardwuar Serviette")]
//                     ]
//                   )
//             )
//         )
//         .then(matches => {
//             var result = [].concat.apply([], matches);
//             result = [].concat.apply([], result)
//             res.json(result)
//         }).catch(function(err){
//             console.log("Fetching articles failed. Error: "+ err) 
//             return false
//         })
// })

router.post('/', (req, res, next) => {
  var name = req.body.name;
  var page = req.body.page || 1;

  getVideosWithCache(name).then(result => {
    res.json(paginate(result, page))
  }).catch(function(err){
    console.log("Fetching videos failed. Error: "+ err) 
    return false
  })
})

router.post('/multiple', (req, res, next) => {
  var names = req.body.names.split(',');
  var page = req.body.page || 1;

  getVideosForMultipleArtists(names).then(result => {
    res.json(paginate(result, page))
  }).catch(function(err){
    console.log("Fetching videos failed. Error: "+ err) 
    return false
  })
})


module.exports = router
