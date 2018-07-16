const scrapeIt = require('scrape-it')
const nodeDateTime = require('node-datetime')
const {uniqueID} = require('../globalHelpers')
const urlify = require('../urlify')
const request = require('request')




const fetchBillboard = name => scrapeIt(urlify.Billboard(name), {
    data: {
        listItem: ".artist-section__item",
        data: {
            title: ".artist-section__item-title",
            url: {
                selector: ".artist-section__item-link",
                attr: "href"
            },
            image : {
                selector: ".artist-section__item-image-holder img",
                attr: "src"
            }
        }
    }
}).then(res => {
  const articles = res.data.data
  return Promise.all(articles.map(article => {
    return scrapeIt(article.url, {
        data: {
            listItem: ".article__content-well",
            data: {
                date : {
                    selector : ".js-publish-date",
                    how: 'html'
                }
            }
        }
    }).then((data) => {
      let date = false
      let resultArticle = {};
      resultArticle.ID = uniqueID()
      if(typeof data
      && typeof data.data == 'object' 
      && typeof res.data.data == 'object' 
      && data.data.data[0]
      && data.data.data[0].date) {
          date = data.data.data[0].date
          let dateArray = date.split('/')
          let newDateTime = nodeDateTime.create(dateArray[2] +'-'+ dateArray[0]+'-'+dateArray[1]+ ' 00:00:00')
          date = newDateTime.getTime()
      } 

      resultArticle.title = article.title;
      resultArticle.url = article.url;
      resultArticle.image = article.image;
      resultArticle.date = date
      resultArticle.artist = name
      resultArticle.source = "Billboard"
      return resultArticle;
    })
    .catch(function(err){
      console.log(resultArticle.source+" fetch failed for single post. Error: "+ err);
    })
   
  })).then(results => {
      console.log(`Fetched Billboard for ${name} and found [${results.length} articles]`)
    return results;
  })
}).catch(function(err){
    console.log("Billboard"+" fetch failed. Error: "+ err) 
    return false
})

const fetchPf = name => scrapeIt(urlify.Pf(name), {
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
            },
            image: {
                selector: ".module__img",
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            const pastDate = nodeDateTime.create(article.date);
            article.date = pastDate.getTime()
            article.artist = name
            article.url = `https://pitchfork.com${article.url}`
            article.source = "Pitchfork"
        })
        console.log(`Fetched Pitchfork for ${name} and found [${articles.length} articles]`)
        return articles
    }).catch(function(err){
        console.log("Pitchfork"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchHnhh = name => scrapeIt(urlify.Hnhh(name), {
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
            },
            image : {
                selector: ".endlessScrollCommon-cover",
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.artist = name
            article.url = `https://hotnewhiphop.com${article.url}`
            article.source = "HotNewHipHop"
            article.date = parseInt(article.date+'000')
        })
        console.log(`Fetched HotNewHipHop for ${name} and found [${articles.length} articles]`)
        return articles
    }).catch(function(err){
        console.log("HotNewHipHop"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchTsis = name => scrapeIt(urlify.Tsis(name), {
    data: {
        listItem: ".js-infinite-container .post__wrapper",
        data: {
            title: ".post__title a",
            url: {
                selector: ".post__title a",
                attr: "href"
            },
            date : ".post__date",
            image : {
                selector : ".post__featuredImage",
                attr: "src"
            }       
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            let dateArray = article.date.substr(4).split(' ')
            let reformatDate = dateArray[0] +' '+dateArray[1].substr(0, dateArray[1].length-3)+ ', '+dateArray[2]
            article.date = nodeDateTime.create(reformatDate).getTime()
            article.artist = name
            article.url = `https://thissongissick.com${article.url}`
            article.source = "This Song Is Sick"
        })
        console.log(`Fetched ThisSongIsSick for ${name} and found [${articles.length} articles]`)
        return articles
    }).catch(function(err){
        console.log("This Song Is Sick"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchEdms = name => scrapeIt(urlify.Edms(name), {
    data: {
        listItem: ".td_module_wrap",
        data: {
            title: ".td-module-title a",
            url: {
                selector: ".td-module-title a",
                attr: "href"
            },
            date: {
                selector: "time",
                how: "html"
            },
            image: {
                selector: ".entry-thumb",
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "EDM Sauce"
        })
        return articles
    }).catch(function(err){
        console.log("EDM Sauce"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchConsequence = name => scrapeIt(urlify.Consequence(name), {
    data: {
        listItem: ".post-list-module",
        data: {
            title: ".post-title a",
            url: {
                selector: ".post-title a",
                attr: "href"
            },
            date: ".contributor-block .date",
            image: {
                selector: ".wp-post-image",
                attr: "src"
            }
            
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
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
    }).catch(function(err){
        console.log("Consequence of Sound"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchStereoGum = name => scrapeIt(urlify.StereoGum(name), {
    data: {
        listItem: ".feed.feed-split-image .post",
        data: {
            title: "h2",
            url: {
                selector: ".preview-holder > a",
                attr: "href"
            }, 
            date: ".date",
            image: {
                selector: ".img-wrap img",
                attr: "src"
            }
        }
    }
})
      .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.date = nodeDateTime.create(article.date.split(' - ')[0]).getTime()
            article.artist = name
            article.source = "Stereo Gum"
        })
        return articles
    }).catch(function(err){
        console.log("Stereo Gum"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchTinymt = name => scrapeIt(urlify.Tinymt(name), {
    data: {
        listItem: ".tile-panel--search .tile",
        data: {
            title: ".tile__details a",
            url: {
                selector: ".tile__details a",
                attr: "href"
            },
            date: ".byline__date",
            image: {
                selector: ".imagecache-Thumb_Square",
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "Tiny Mix Tapes"
        })
        return articles
    }).catch(function(err){
        console.log("Tiny Mix Tapes"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchDancingA = name => scrapeIt(urlify.DancingA(name), {
    data: {
        listItem: "#main.page-content article.post",
        data: {
            title: ".excerpt a",
            url: {
                selector: ".excerpt a",
                attr: "href"
            },
            date: ".date",
            image: {
                selector: ".post_image figure",
                attr: "style"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.image = article.image.split("'")[1]
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            const title = article.title.split('\n')
            article.title = title[0]
            article.source = "Dancing Astronaut"
        })
        return articles
    }).catch(function(err){
        console.log("Dancing Astronaut"+" fetch failed. Error: "+ err) 
        return false
    })

const fetch2dope = name => scrapeIt(urlify.Twodope(name), {
    data: {
        listItem: "#main .penci-grid .list-posttt",
        data: {
            title: ".grid-title a",
            url: {
                selector: ".grid-title a",
                attr: "href"
            },
            image: {
                selector: ".wp-post-image", 
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()

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
                && typeof data
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0]
                && data.data.data[0].date) {
                    date = data.data.data[0].date
                    date = nodeDateTime.create(date).getTime()
                } 

                article.date = date
                article.artist = name
                article.source = "2DOPEBOYZ"
            }).catch(function(err){

                article.date = false
                article.artist = name
                article.source = "2DOPEBOYZ"
                console.log(article.source+" fetch failed for single post. Error: "+ err)
            })
        })
        return articles
    }).catch(function(err){
        console.log("2DOPEBOYZ"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchRapRadar = name => scrapeIt(urlify.RapRadar(name), {
    data: {
        listItem: "#posts_block .entry",
        data: {
            title: ".entry_title",
            url: {
                selector: ".entry_title",
                attr: "href"
            },
            date: ".date",
            image: {
                selector: ".entry_img",
                how: "html"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.image = article.image.split("src=\"")[1].split('"')[0]
            article.date = nodeDateTime.create(article.date.split(' @ ')[0]).getTime()
            article.artist = name
            article.source = "Rap Radar"
        })
        return articles
    }).catch(function(err){
        console.log("Rap Radar"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchPopJus = name => scrapeIt(urlify.PopJus(name), {
    data: {
        listItem: ".site-inner .post.status-publish",
        data: {
            title: ".entry-title a",
            url: {
                selector: ".entry-title a",
                attr: "href"
            },
            image : {
                selector: ".entry-header",
                how: "html"
            }

        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            if(typeof article.image != "undefined" && article.image.length) {
                article.image = article.image.split('data-cfsrc="')
                if(article.image.length > 1) {
                    article.image = article.image[1].split('"')[0]
                } else {
                   article.image = '' 
                }
            } else {
                article.image = ''
            }
            
            let fetchSingle = scrapeIt(article.url, {
                data: {
                    listItem: ".site-container",
                    data: {
                        date : {
                            selector: ".site-inner",
                            how: "html"
                        }
                    }
                }
            }, (err, data ) => {
                let date = false
                if(!err 
                && typeof data
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0]
                && data.data.data[0].date) {
                    date = data.data.data[0].date
                    date = date.split('</i>')
                    date = date[date.length-1]
                    date = nodeDateTime.create(date).getTime()
                } 

                article.date = date
                article.artist = name
                article.source = "Popjustice"
            }).catch(function(err){
                
                article.date = false
                article.artist = name
                article.source = "Popjustice"
                console.log(article.source+" fetch failed for single post. Error: "+ err)
            })
        })
        return articles
    }).catch(function(err){
        console.log("Popjustice"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchMusicBlog = name => scrapeIt(urlify.MusicBlog(name), {
    data: {
        listItem: ".site-main article.post.status-publish",
        data: {
            title: ".entry-title a",
            url: {
                selector: ".entry-title a",
                attr: "href"
            },
            date: '.entry-date',
            image : {
                selector: ".post-image img",
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "A Music Blog, Yea?"
        })
        return articles
    }).catch(function(err){
        console.log("A Music Blog, Yea?"+" fetch failed. Error: "+ err) 
        return false
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
            date: ".post-date",
            image: {
                selector: ".post-img .wp-post-image",
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            let dateArray = article.date.substring(10).split(' ')
            let reformatDate = dateArray[1] +' '+dateArray[0].substr(0, dateArray[0].length-2)+ ', '+dateArray[2]
            article.date = nodeDateTime.create(reformatDate).getTime()
            article.artist = name
            article.title = article.title.substring(5)
            article.source = "ANR Factory"
        })
        return articles
    }).catch(function(err){
        console.log("ANR Factory"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchCaesar = name => scrapeIt(urlify.Caesar(name), {
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
            },
            image: {
                selector: ".img-thumbnail",
                how: "html"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            if(typeof article.image != 'undefined'){                
                article.image = article.image.split('bp_thumbnail_resize("')
                if(article.image.length > 1) {
                    article.image = article.image[1].split('"')[0]
                } else {
                    article.image = article.image[0].split('src="')
                    if(article.image.length > 1) {
                        article.image = article.image[1].split('"')[0]
                    } else {
                        article.image = ''
                    }
                }
            } else {
                article.image = ''
            }

            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "Caesar Live N Loud"
        })
        return articles
    }).catch(function(err){
        console.log("Caesar Live N Loud"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchEdmNations = name => scrapeIt(urlify.EdmNations(name), {
    data: {
        listItem: ".td_module_wrap",
        data: {
            title: ".entry-title a",
            url: {
                selector: ".entry-title a",
                attr: "href"
            },
            date: ".td-post-date .entry-date",
            image: {
                selector: ".entry-thumb",
                attr: "src"
            }
        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "EDM Nations"
        })
        return articles
    }).catch(function(err){
        console.log("EDM Nations"+" fetch failed. Error: "+ err) 
        return false
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
            date: ".entry-date",

        }
    }
})
    .then(res => {
        const articles = res.data.data
        articles.forEach(article => {
            article.ID = uniqueID()
            article.date = nodeDateTime.create(article.date).getTime()
            article.artist = name
            article.source = "Indietronica"

            let fetchSingle = scrapeIt(article.url, {
                data: {
                    listItem: ".entry-content",
                    data: {
                        image : {
                            selector: "img.alignnone",
                            attr: "src"
                        }
                    }
                }
            }, (err, data ) => {
                let image = ''
                if(!err 
                && typeof data
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0]
                && data.data.data[0].image) {
                    image = data.data.data[0].image
                } 

                article.image = image
            }).catch(function(err){
                
                article.image = ''
                console.log(article.source+" fetch failed for single post. Error: "+ err)
            })




        })
        return articles
    }).catch(function(err){
        console.log("Indietronica"+" fetch failed. Error: "+ err) 
        return false
    })

const fetchKings = name => scrapeIt(urlify.Kings(name), {
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
            article.ID = uniqueID()
            let fetchSingle = scrapeIt(article.url, {
                data: {
                    listItem: "#bodycontentwrap #leftcolumn",
                    data: {
                        date : ".postfooter .categorynote2",
                        image: {
                            selector: ".thecontent img.alignnone",
                            attr: "src"
                        }
                    }
                }
            }, (err, data ) => {
                let date = false
                let image = ''
                
                if(!err 
                && typeof data
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0]
                && data.data.data[0].date) {
                    date = data.data.data[0].date
                    date = nodeDateTime.create(date).getTime()
                    image = data.data.data[0].image
                } 

                article.image = image
                article.date = date
                article.artist = name
                article.source = "Kings of A&R"
            }).catch(function(err){

                article.image = ''
                article.date = false
                article.artist = name
                article.source = "Kings of A&R"
                console.log(article.source+" fetch failed for single post. Error: "+ err) 
            })
        })
        return articles
    }).catch(function(err){
        console.log("Kings of A&R"+" fetch failed. Error: "+ err) 
        return false
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
            article.ID = uniqueID()
            // this website has no article date to be scraped.
            article.date = false
            article.artist = name
            article.source = "LIVE Music Blog"
            let fetchSingle = scrapeIt(article.url, {
                data: {
                    listItem: ".td-ss-main-content article.post.status-publish",
                    data: {
                        image: {
                            selector: ".td-post-featured-image .entry-thumb",
                            attr: "src"
                        }
                    }
                }
            }, (err, data ) => {
                let image = ''
                
                if(!err 
                && typeof data
                && typeof data.data == 'object' 
                && typeof res.data.data == 'object' 
                && data.data.data[0]
                && data.data.data[0].image) {
                    image = data.data.data[0].image
                } 
                article.image = image
            }).catch(function(err){
                article.image = ''
                console.log(article.source+" fetch failed for single post. Error: "+ err) 
            })
 




        })
        return articles
    }).catch(function(err){
        console.log("LIVE Music Blog"+" fetch failed. Error: "+ err) 
        return false
    })


// TODO: (geekonedge) The images are still not getting populated
const fetch_your_edm = name => scrapeIt(urlify.YOUREDM(name), {
    data: {
        listItem: ".cb-blog-style-a",
        data: {
            title: ".cb-post-title a",
            url: {
                selector: ".cb-post-title a",
                attr: "href"
            },
            date: {
                selector: "time",
                how: "html"
            },
            image: {
                selector: ".cb-mask a img",
                attr: "src"
            }
        }
    }
}).then(res => {    
    const articles = res.data.data
    articles.forEach(article => {
        article.ID = uniqueID()
        article.date = nodeDateTime.create(article.date).getTime()
        article.artist = name
        article.source = "YourEDM"
    }) 
    console.log(`Fetched YouEDM for ${name} and found [${articles.length}]`)
    return articles
}).catch(err => {
    console.log("YourEDM"+" fetch failed. Error: "+ err) 
    return false
})



//TODO: This is really inefficient - making two calls - can we improve it
const fetch_pigeon_planes = name => scrapeIt(urlify.PIGEON_PLANES(name), {
    label: {
        selector: ".prerender_success_indicator",
        attr: "complex-tag-id"
    }
}).then(res => {
    const label = res.data.label
    articles = []
    
    if(label) {
        return Promise.all(request.get({
            url: `https://pigeonsandplanes.com/api/dsl/tag/${label}/articles?get=20&skip=0&sortBy=published`,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
                console.log('Error:', err);
            } else if (res.statusCode !== 200) {
                console.log('Status:', res.statusCode);
            } else {
                console.log("Found ", data.length, " articles")
                for(i = 0, len = data.length; i < len; i++) {
                    item = data[i];
                    img = item.thumbnail.transformation ? item.thumbnail.transformation.asset : item.thumbnail                  
                    articles[i] = {
                        ID: uniqueID(),
                        title: item.headline,
                        url: `https://pigeonsandplanes.com/news/${item.alias}`,
                        date: item.datePublished, 
                        artist: name,
                        image: `https://complex-res.cloudinary.com/images/c_fill,h_182,q_70,w_328/${img.cloudinaryId}/${img.name || '' }`,
                        source: "Pigeons and Planes"
                    }
                }
                console.log(`Fetched Pigeons and Planes for ${name} and found [${articles.length}]`)
                return articles
            }
            return false
        }))
    }
    else { return false }
}).catch(function(err){
    console.log("Pigeons and Planes"+" fetch failed. Error: "+ err) 
    return false
})

const fetch_louder_sound = name => scrapeIt(urlify.LOUDER_SOUND(name), {
    data: {
        listItem: ".listingResult",
        data: {
            title: ".article-name",
            url: {
                selector: ".listingResult a",
                attr: "href"
            },
            date: {
                selector: "time",
                attr: "datetime"
            },
            image: {
                selector: ".article-lead-image-wrap",
                attr: "data-original"
            }
        }
    }
}).then(res => {
    const articles = res.data.data
    articles.forEach(article => {
        article.ID = uniqueID()
        article.date = nodeDateTime.create(article.date || '2012-01-01').getTime(),
        article.artist = name
        article.source = "Louder"
    })
    console.log(`Fetched Louder for ${name} and found [${articles.length}]`)
    return articles
}).catch(function(err){
    console.log("Louder"+" fetch failed. Error: "+ err) 
    return false
})

const fetch_ucr = name => request.get({
    url: urlify.UCR(name),
    json: true,
    headers: {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0'}
  }, (err, res, data) => {
      if (err) {
          console.log('Error:', err);
      } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
      } else {
          articles = []
          list = data.data['carbonwidget/searchnative-1'].data
          postDt = data.data['carbonwidget/searchnative-1'].dataDetails
          if(list) {
              for(i = 0, len = list.length; i < len; i++) {
                  item = postDt[list[i]].data.mainData
                  articles[i] = {
                      ID: uniqueID(),
                      date: nodeDateTime.create(item.postDateGmt).getTime(),
                      artist: name,
                      source: "Ultimate Classic Rock",
                      url: item.url,
                      image: item.thumbnail
                  }
              }
              console.log(`Fetched UCR for ${name} and found [${articles.length}]`)
              return articles
          }
          return false
      }
      console.log("Failed to fetch CMT. Error: " + err)
      return false;
});

const fetch_cmt = name => request.get({
    url: urlify.CMT(name),
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
      if (err) {
          console.log('Error:', err);
      } else if (res.statusCode !== 200) {
          console.log('Status:', res.statusCode);
      } else {
          articles = []
          list = data.response.docs
          if(list) {
              for(i = 0, len = list.length; i < len; i++) {
                  item = list[i]
                  articles[i] = {
                      ID: uniqueID(),
                      date: nodeDateTime.create(item.contentDate_dt).getTime(),
                      artist: name,
                      source: "CMT",
                      url: item.url_s,
                      image: item.imageUrl_s
                  }
              }
              console.log(`Fetched CMT for ${name} and found [${articles.length}]`)
              return articles
          }
          return false
      }
      console.log("Failed to fetch CMT. Error: " + err)
      return false;
});




    module.exports = {
        fetch_your_edm,
        fetch_pigeon_planes,
        fetch_louder_sound,
        fetch_ucr,
        fetch_cmt,
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
