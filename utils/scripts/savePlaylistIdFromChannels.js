/// ONE TIME SCRIPT to fetch and save "uploads" playlist id for all channels

const channels = require('../videos/channels');

const getUploadsPlaylist = (names, lastDate = moment().subtract(1, 'year')) => {
  return Promise.all(channels.map(channel => {

    const url = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&id=${channel.channelId}&part=snippet,contentDetails`;
    return axios.get(url).then(result => {
      console.log("Result from channel => ", channel.name);

      let item = {
        ...channel,
        uploadsPlaylistId: result.data.items[0].contentDetails.relatedPlaylists.uploads,
      }

      logger.info(`Fetched ${result.length} videos of channeld ${channel.name}`);
      return item;
    });
  })).then(results => {
    console.log("Result", results[0]);
    fs.writeFile('channelsWithUploads.json', JSON.stringify({ data: results }), 'utf8', () => console.log("File written"));

  }).catch(err => {
    console.error(err);
  })
}