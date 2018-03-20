const router = require('express').Router()
const axios = require('axios')
const { fetchVids } = require('../utils/fetchVideos')

router.post('/', (req, res, next)=>{
    const name = req.body.name
    const bfastId = "UChi08h4577eFsNXGd3sxYhw"
    const swayId = "UCuS96jkLKpTaGB_OWnwZV_A"

    Promise.all([fetchVids(name, bfastId), fetchVids(name, swayId)])
        .then(matches => {
            const result = [].concat.apply([], matches);
            res.json(result)
        })
})

module.exports = router
