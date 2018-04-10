const router = require('express').Router()
const axios = require('axios')
const { fetchVids } = require('../utils/fetchVideos')

router.post('/', (req, res, next)=>{
    const name = req.body.name

    const bfastId = "UChi08h4577eFsNXGd3sxYhw"
    const swayId = "UCuS96jkLKpTaGB_OWnwZV_A"
    const nardwuarServietteId = "UC8h8NJG9gacZ5lAJJvhD0fQ"
    const noiseyId = "UC0iwHRFpv2_fpojZgQhElEQ"
    const hot97Id = "UC5RwNJQSINkzIazWaM-lM3Q"
    const nprMusicId = "UC4eYXhJI4-7wSWc8UNRwD4A"
    const montrealityId = "UCeEE5rjWspDkp-PdqjB5QEQ"
    const complexId = "UCE_--R1P5-kfBzHTca0dsnw"
    const theneedledropId = "UCt7fwAhXDy3oNFTAzF2o8Pw"
    const pitchforkId = "UC7kI8WjpCfFoMSNDuRh_4lA"
    const geniusId = "UCyFZMEnm1il5Wv3a6tPscbA"
    const pigeonsPlanesId = "UCzHcC_PfVKid0BITeTkZMjQ"
    const fuseId = "UCi_XQVMRd0hrj6Ka0yCnR3A"
    const theFaderId = "UCRCOCvfOkoqneyQCbNOUPwg"
    const rollingStoneId = "UC-JblcinswY50lrUdSaRNEg"
    const billboardId = "UCsVcseUYbYjldc-XgcsiEbg"
    const allDefMusicId = "UChnxjIaAJCJgNm8jUTb1A9g"
    const bvtvMusicId = "UCc27uVVmcn23SGDYL5uIpMQ"
    const rapUpTVId = "UChwgB3XD2h__UI3bjOk_4Fg"
    const blankTVId = "UC8l9frL61Yl5KFOl87nIm2w"
    const laBlogothequeId = "UCFAKGci5lneha2x4XMbzYrQ"
    const noJumperId = "UCNNTZgxNQuBrhbO0VrG8woA"
    const djvladId = "UCg7lal8IC-xPyKfgH4rdUcA"
    const worldstarhiphopId = "UC-yXuc1__OzjwpsJPlxYUCQ"
    const nmeId = "UCiTFwf4VFGMyfg3cQlXP9JQ"
    const iHeartRadioId = "UCoBMK97ZfZmRCqIwMQYdicA"
    const virginRadioUKId = "UCIhTZA7_-jz6nyxW2LePWLQ"
    const bbcRadio1Id = "UC-FQUIVQ-bZiefzBiQAa8Fw"
    const aMusicBlogYeaId = "UCUdh03xdul9ITREyFGQp4dw"

    Promise.all(
      [ fetchVids(name, bfastId),
        fetchVids(name, swayId),
        fetchVids(name, hot97Id),
        fetchVids(name, noiseyId),
        fetchVids(name, nprMusicId),
        fetchVids(name, montrealityId),
        fetchVids(name, complexId),
        fetchVids(name, theneedledropId),
        fetchVids(name, pitchforkId),
        fetchVids(name, geniusId),
        fetchVids(name, pigeonsPlanesId),
        fetchVids(name, theFaderId),
        fetchVids(name, rollingStoneId),
        fetchVids(name, billboardId),
        fetchVids(name, allDefMusicId),
        fetchVids(name, bvtvMusicId),
        fetchVids(name, rapUpTVId),
        fetchVids(name, blankTVId),
        fetchVids(name, laBlogothequeId),
        fetchVids(name, noJumperId),
        fetchVids(name, djvladId),
        fetchVids(name, worldstarhiphopId),
        fetchVids(name, nmeId),
        fetchVids(name, iHeartRadioId),
        fetchVids(name, virginRadioUKId),
        fetchVids(name, bbcRadio1Id),
        fetchVids(name, aMusicBlogYeaId),
        fetchVids(name, nardwuarServietteId)]
      )
        .then(matches => {
            const result = [].concat.apply([], matches);
            res.json(result)
        })
})

module.exports = router
