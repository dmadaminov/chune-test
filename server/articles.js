const router = require('express').Router()
const { fetchBillboard, fetchPf, fetchHnhh } = require('../utils/fetchArticles')

router.post('/', (req, res, next) => {
    const name = req.body.name
    Promise.all([ fetchBillboard(name), fetchPf(name), fetchHnhh(name) ])
    .then(matches => {
        const result = [].concat.apply([], matches);
        res.json(result)
    })
})

module.exports = router