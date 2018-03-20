const scrapeIt = require('scrape-it')
const { urlifyPf, urlifyHnhh, urlifyBillboard } = require('./urlify')

const fetchBillboard = name => scrapeIt(urlifyBillboard(name), {
    data: {
        listItem: ".artist-section__item",
        data: {
            title: ".artist-section__item-title",
            url: {
                selector: ".artist-section__item-link",
                attr: "href"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => article.artist = name)
        return articles
    })

const fetchPf = name => scrapeIt(urlifyPf(name), {
    data: {
        listItem: ".result-item",
        data: {
            title: ".module__title",
            url: {
                selector: "a",
                attr: "href"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.artist = name
            article.url = `https://pitchfork.com${article.url}`
        })
        return articles
    })

const fetchHnhh = name => scrapeIt(urlifyHnhh(name), {
    data: {
        listItem: ".endlessScrollCommon-list-item",
        data: {
            title: ".endlessScrollCommon-title",
            url: {
                selector: ".cover-title",
                attr: "href"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.artist = name
            article.url = `https://hotnewhiphop.com${article.url}`
        })
        return articles
    })

module.exports = { fetchBillboard, fetchPf, fetchHnhh }



