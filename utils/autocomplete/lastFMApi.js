const axios = require('axios');
const queryString = require('querystring')
const dotenv = require('dotenv');
dotenv.config();

const lastFmApiKey = process.env.LAST_FM_API_KEY;

const withoutWords = (name, words) => {
  var ok = true;
  words.forEach(word => {
    ok = ok && name.indexOf(word) == -1;
  })
  return ok;
}

const searchArtists = (artistName) => {
  return axios.get(`http://ws.audioscrobbler.com/2.0/`, {
    params: {
      method: 'artist.search',
      artist: artistName,
      api_key: lastFmApiKey,
      format: 'json'
    }
  }).then(function (response) {
    const artistNames = response.data.results.artistmatches.artist.map(artist => artist.name).filter(name => {
      return withoutWords(name, [
        '&', 'featuring', 'feat.', 'and', ',', "Feat.", "YouTube", " x ", " ft ", " ft.", "Ft.", "(", ")",
      ]);
    });
    return artistNames;
  }).catch(function (error) {
    console.log(error);
    return null;
  });
}

module.exports =  searchArtists;
