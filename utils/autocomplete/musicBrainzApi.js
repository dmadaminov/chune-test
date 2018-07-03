const axios = require('axios');
const queryString = require('querystring')
const baseUrl = "https://musicbrainz.org/ws/2/artist";

const searchArtists = (query) => {
  let params = {
    query: query,
    fmt: 'json',
  }
  return axios.get(`${baseUrl}?${queryString.stringify(params)}`).then(res => {
    return res.data.artists.map(artist => artist.name);
  }).catch(err => {
    console.error("Error fetching music brainz api", err);
    return null;
  });
}

module.exports = searchArtists;
