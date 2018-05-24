const scrapeIt = require('scrape-it')
const nodeDateTime = require('node-datetime')
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
        articles.forEach(article => {

            let fetchBillboardSingle = scrapeIt(article.url, {
                data: {
                    listItem: ".article__content-well",
                    data: {
                        date : {
                            selector : ".js-publish-date",
                            attr: "data-pubdate-value"
                        }
                    }
                }
            }, (err, data ) => {
                let date = false
                
                if(!err 
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0].date) {
                    date = data.data.data[0].date
                    let newDateTime = new Date(date.substr(0, 4), date.substr(4, 2), date.substr(6, 2), date.substr(8, 2))
                    date = newDateTime.getTime()
                } 

                article.date = date
                article.artist = name
                article.source = "Billboard"
            })
           
        })
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
            },
            date : {
                selector: ".module__pub-date",
                attr: "datetime"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            const pastDate = nodeDateTime.create(article.date);
            article.date = pastDate.getTime()
            article.artist = name
            article.url = `https://pitchfork.com${article.url}`
            article.source = "Pitchfork"
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
            },
            date: {
                selector: ".js-live-date-stopped",
                attr: "data-date"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.artist = name
            article.url = `https://hotnewhiphop.com${article.url}`
            article.source = "HotNewHipHop"
            article.date = parseInt(article.date+'000')
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
            },
            date : ".post__date"
            
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date.substr(4)).getTime()
            article.artist = name
            article.url = `https://thissongissick.com${article.url}`
            article.source = "This Song Is Sick"
        })
        return articles
    })

const fetchEdms = name => scrapeIt(urlifyEdms(name), {
    data: {
        listItem: ".td_module_wrap",
        data: {
            title: ".td-module-title a",
            url: {
                selector: ".td-module-title a",
                attr: "href"
            },
            date: "time"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "EDM Sauce"
        })
        return articles
    })

const fetchConsequence = name => scrapeIt(urlifyConsequence(name), {
    data: {
        listItem: ".post-list-module",
        data: {
            title: ".post-title a",
            url: {
                selector: ".post-title a",
                attr: "href"
            },
            date: ".contributor-block .date"
            
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            let dateSplit = article.date.substr(3).split(' ')
            let month = dateSplit[0]
            let day = dateSplit[1].split(',')[0]
            let year = dateSplit[2].split(',')[0]
            let date = nodeDateTime.create(day + ' '+ month+ ',' + year)
            article.date = date.getTime()
            article.artist = name
            article.source = "Consequence of Sound"
        })
        return articles
    })

const fetchStereoGum = name => scrapeIt(urlifyStereoGum(name), {
    data: {
        listItem: ".feed.feed-split-image .post",
        data: {
            title: "h2",
            url: {
                selector: ".preview-holder > a",
                attr: "href"
            }, 
            date: ".date"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date.split(' - ')[0]).getTime()
            article.artist = name
            article.source = "Stereo Gum"
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
            },
            date: ".byline__date"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "Tiny Mix Tapes"
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
            },
            date: ".date"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            const title = article.title.split('\n')
            article.title = title[0]
            article.source = "Dancing Astronaut"
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

            let fetchSingle = scrapeIt(article.url, {
                data: {
                    listItem: ".post .post-box-meta",
                    data: {
                        date : "span:last-child"
                    }
                }
            }, (err, data ) => {
                let date = false
                
                if(!err 
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0].date) {
                    date = data.data.data[0].date
                    date = nodeDateTime.create(date).getTime()
                } 

                article.date = date
                article.artist = name
                article.source = "2DOPEBOYZ"
            })
        })
        return articles
    })

const fetchRapRadar = name => scrapeIt(urlifyRapRadar(name), {
    data: {
        listItem: ".entry",
        data: {
            title: ".entry_title",
            url: {
                selector: ".entry_title",
                attr: "href"
            },
            date: ".date"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date.split(' @ ')[0]).getTime()
            article.artist = name
            article.source = "Rap Radar"
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

            let fetchSingle = scrapeIt(article.url, {
                data: {
                    listItem: ".site-inner",
                    data: {
                        date : ".sluggy"
                    }
                }
            }, (err, data ) => {
                let date = false
                
                if(!err 
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0].date) {
                    date = data.data.data[0].date
                    date = nodeDateTime.create(date.split('</i>')[1]).getTime()
                } 

                article.date = date
                article.artist = name
                article.source = "Popjustice"
            })
        })
        return articles
    })

const fetchMusicBlog = name => scrapeIt(urlifyMusicBlog(name), {
    data: {
        listItem: ".site-main article.post.status-publish",
        data: {
            title: ".entry-title a",
            url: {
                selector: ".entry-title a",
                attr: "href"
            },
            date: '.entry-date'
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "A Music Blog, Yea?"
        })
        return articles
    })

const fetchAnr = name => scrapeIt(urlifyAnr(name), {
    data: {
        listItem: "#main article.post.status-publish",
        data: {
            title: ".post-header h2 a",
            url: {
                selector: ".post-header h2 a",
                attr: "href"
            }, 
            date: ".post-date"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            let dateArray = article.date.substring(10).split(' ')
            let reformatDate = dateArray[1] +' '+dateArray[0].substr(0, dateArray[0].length-2)+ ', '+dateArray[2]
            article.date = nodeDateTime.create(reformatDate).getTime()
            article.artist = name
            article.title = article.title.substring(5)
            article.source = "ANR Factory"
        })
        return articles
    })

const fetchCaesar = name => scrapeIt(urlifyCaesar(name), {
    data: {
        listItem: ".blog-posts.hfeed article.post",
        data: {
            title: ".post-title.entry-title a",
            url: {
                selector: ".post-title.entry-title a",
                attr: "href"
            },
            date: {
                selector: ".timestamp-link abbr",
                attr: "title"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "Caesar Live N Loud"
        })
        return articles
    })

const fetchEdmNations = name => scrapeIt(urlifyEdmNations(name), {
    data: {
        listItem: ".td_module_wrap",
        data: {
            title: ".entry-title a",
            url: {
                selector: ".entry-title a",
                attr: "href"
            },
            date: ".td-post-date .entry-date"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "EDM Nations"
        })
        return articles
    })

const fetchIndietronica = name => scrapeIt(urlifyIndietronica(name), {
    data: {
        listItem: "article.post.status-publish",
        data: {
            title: ".entry-title a",
            url: {
                selector: ".entry-title a",
                attr: "href"
            },
            date: ".entry-date"
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "Indietronica"
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
            let fetchSingle = scrapeIt(article.url, {
                data: {
                    listItem: ".postfooter",
                    data: {
                        date : ".categorynote2"
                    }
                }
            }, (err, data ) => {
                let date = false
                
                if(!err 
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0].date) {
                    date = data.data.data[0].date
                    date = nodeDateTime.create(date).getTime()
                } 

                article.date = date
                article.artist = name
                article.source = "Kings of A&R"
            })
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
            // this website has no article date to be scraped.
            article.date = false
            article.artist = name
            article.source = "LIVE Music Blog"
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
