const scrapeIt = require('scrape-it')
const { urlifyPf, urlifyHnhh, urlifyBillboard, urlifyTsis, urlifyEdms, urlifyConsequence, urlifyStereoGum, urlifyTinymt, urlifyDancingA, urlify2dope, urlifyRapRadar, urlifyPopJus, urlifyMusicBlog, urlifyAnr, urlifyCaesar, urlifyEdmNations, urlifyIndietronica, urlifyKings, urlifyLive } = require('./urlify')

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

const fetchTsis = name => scrapeIt(urlifyTsis(name), {
    data: {
        listItem: ".post__title",
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
            article.url = `https://thissongissick.com${article.url}`
        })
        return articles
    })

const fetchEdms = name => scrapeIt(urlifyEdms(name), {
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

const fetchConsequence = name => scrapeIt(urlifyConsequence(name), {
    data: {
        listItem: ".post-title",
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

const fetchStereoGum = name => scrapeIt(urlifyStereoGum(name), {
    data: {
        listItem: ".preview-holder.pull-left",
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

const fetchTinymt = name => scrapeIt(urlifyTinymt(name), {
    data: {
        listItem: ".tile__details",
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

const fetchDancingA = name => scrapeIt(urlifyDancingA(name), {
    data: {
        listItem: ".excerpt",
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
            const title = article.title.split('\n')
            article.title = title[0]
        })
        return articles
    })

const fetch2dope = name => scrapeIt(urlify2dope(name), {
    data: {
        listItem: ".grid-title",
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

const fetchRapRadar = name => scrapeIt(urlifyRapRadar(name), {
    data: {
        listItem: ".entry > header",
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

