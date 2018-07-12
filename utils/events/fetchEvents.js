const axios  = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const fetchEvents = (name) => {
  return axios.get(`https://rest.bandsintown.com/artists/${encodeURI(name)}/events?`, {
    params: {
        app_id: process.env.BANDS_IN_TOWN_API_KEY
      }
    }).then(function (response) {
      if(!(response.data instanceof Array)) {
        throw new Error("Artist not found in Bandsintown API");
      };
      return response.data
    });
}

module.exports = fetchEvents;
