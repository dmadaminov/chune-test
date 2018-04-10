const scrapeIt = require('scrape-it')

const fetchPopJus = name => scrapeIt(urlifyPopJus(name), {
    data: {
        listItem: ".entry-title",
        data: {
            title: "a",
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
        })
        return articles
    })

const fetchMusicBlog = name => scrapeIt(urlifyMusicBlog(name), {
    data: {
        listItem: ".entry-title",
        data: {
            title: "a",
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
        })
        return articles
    })

const fetchAnr = name => scrapeIt(urlifyAnr(name), {
    data: {
        listItem: ".post-header",
        data: {
            title: "a",
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
            article.title = article.title.substring(5)
        })
        return articles
    })

const fetchCaesar = name => scrapeIt(urlifyCaesar(name), {
    data: {
        listItem: ".post-title.entry-title",
        data: {
            title: "a",
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
        })
        return articles
    })

const fetchEdmNations = name => scrapeIt(urlifyEdmNations(name), {
    data: {
        listItem: ".entry-title",
        data: {
            title: "a",
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
        })
        return articles
    })

const fetchIndietronica = name => scrapeIt(urlifyIndietronica(name), {
    data: {
        listItem: ".entry-title",
        data: {
            title: "a",
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
        })
        return articles
    })

const fetchKings = name => scrapeIt(urlifyKings(name), {
    data: {
        listItem: ".posttitle",
        data: {
            title: "a",
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
        })
        return articles
    })

const fetchLive = name => scrapeIt(urlifyLive(name), {
    data: {
        listItem: ".td-module-title",
        data: {
            title: "a",
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
        })
        return articles
    })

    module.exports = {
        fetchLive,
        fetchKings,
        fetchIndietronica,
        fetchEdmNations,
        fetchCaesar,
        fetchAnr,
        fetchMusicBlog,
        fetchPopJus,
        fetchRapRadar,
        fetch2dope,
        fetchDancingA,
        fetchTinymt,
        fetchStereoGum,
        fetchConsequence,
        fetchEdms,
        fetchTsis,
        fetchHnhh,
        fetchPf,
        fetchBillboard,
    }
