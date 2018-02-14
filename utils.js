const axios = require('axios');
const cheerio = require('cheerio');

const getBillboard = (first, last) => {
    const urlArr = [`https://www.billboard.com/music/${first}-${last}/news`, '/articles/columns/', 'RichardNixon'];
    return axios.get(urlArr[0])
        .then(res => {
            const html = res.data;
            const $ = cheerio.load(html);
            return filter(grabLinks($), urlArr[1], urlArr[2]);
        });
};

const getHNHH = (first, last) => {
    const urlArr = [`https://www.hotnewhiphop.com/search/${first}%20${last}/news/`, '.html', 'desktop'];
    return axios.get(urlArr[0])
        .then(res => {
            const html = res.data;
            const $ = cheerio.load(html);
            return filter(grabLinks($), urlArr[1], urlArr[2]);
        });
};

const getPitchfork = (first, last) => {
    const urlArr = [`https://pitchfork.com/search/more/?query=${first}%20${last}&filter=news`, '/news/', 'Watergate'];
    return axios.get(urlArr[0])
        .then(res => {
            const html = res.data;
            const $ = cheerio.load(html);
            return filter(grabLinks($), urlArr[1], urlArr[2]);
        });
};

const grabLinks = ($) => {
    const links = new Set();
    $('div').find('a').map((_, atag) => {
        if (atag.attribs.href)
            links.add(atag.attribs.href)
    });
    return Array.from(links);
};

const filter = (links, key1, key2) => {
    return links.filter(link => (link.includes(key1)) && !link.includes(key2)).slice(0, 10)
};

const clean = (linksArr, site) => {
    const hnhh = "https://hotnewhiphop.com";
    const pitchfork = "https://pitchfork.com";
    if (site === "hnhh") {
        linksArr = linksArr.map(link => hnhh.concat(link));
    } else {
        linksArr = linksArr.map(link => pitchfork.concat(link));
    }
    return linksArr;
};

const createSearchURL = (first, last) => {
    return [
        [`https://www.billboard.com/music/${first}-${last}/news`, '/articles/columns/', 'RichardNixon'],
        [`https://www.hotnewhiphop.com/search/${first}%20${last}/news/`, '.html', 'desktop'],
        [`https://pitchfork.com/search/more/?query=${first}%20${last}&filter=news`, '/news/', 'Watergate']
    ];
};

module.exports = { clean, getBillboard, getHNHH, getPitchfork };
