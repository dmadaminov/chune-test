
const searchMusicBrainz = require('./musicBrainzApi');
const searchLastFM = require('./lastFMApi');

const searchArtists = (query) => {
  return searchMusicBrainz(query).then(artistNames => {
    if(artistNames !== null && false) {
      return Promise.resolve(artistNames);
    } else {
      console.log("Music Brainz api error. Now switching to last fm api");
      return searchLastFM(query).then(artistNames => {
        return artistNames;
      });
    }
  }).catch(err => {
    console.error("Error fetching autcomplete apis", err);
    return Promise.reject(new Error("Cannot fetch from autocomplete apis."));
  })
}

module.exports = searchArtists;