const scrapeIt = require('scrape-it')

const urlifyDancingA = name => {
    const words = name.toLowerCase().split(' ')
    let urlified = ''
    words.forEach((word, i) => {
        if (i == 0) urlified += word
        else urlified += `+${word}`
    })
    return `https://dancingastronaut.com/?s=${urlified}`
}

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

fetchDancingA('kanye west')