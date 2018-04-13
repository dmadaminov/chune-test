const axios = require('axios')

const apiKey = "AIzaSyCQG1dKdPxXaRNmKIWqRDN7ZF8olqKyk0U"

const fetchVids = (name, channelId, channelName) => {
    const query = name.split(" ").join("")
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&q=${query}`
    return axios.get(url)
        .then(matches => {
            const result = []
            matches.data.items.forEach(match => {
                if (match.snippet.title.toLowerCase().indexOf(name)>=0) result.push({ artist: name,
                                                                                      url: match.id.videoId,
                                                                                      title: match.snippet.title,
                                                                                      source: channelName })
            })
            return result
    })
}

module.exports = { fetchVids }
