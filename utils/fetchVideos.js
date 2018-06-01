const axios = require('axios')
const nodeDateTime = require('node-datetime')
const {uniqueID} = require('./globalHelpers')

const apiKey = "AIzaSyCQG1dKdPxXaRNmKIWqRDN7ZF8olqKyk0U"

const fetchVids = (name, channelId, channelName) => {
    const query = name.split(" ").join("")
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&q=${query}`
    return axios.get(url)
        .then(matches => {
            const result = []
            matches.data.items.forEach(match => {
                if (match.snippet.title.toLowerCase().indexOf(name)>=0) result.push({ 
                        ID: uniqueID(),
                        artist: name,
                        url: match.id.videoId,
                        title: match.snippet.title,
                        image: match.snippet.thumbnails.high.url,
                        date: nodeDateTime.create(match.snippet.publishedAt).getTime(),
                        source: channelName })
            })
            return result
    }).catch(function(err){
        console.log(channelName+" fetch failed. Error: "+ err) 
        return false
    })
}

module.exports = { fetchVids }
