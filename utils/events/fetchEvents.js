const axios  = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const fetchEvents = (name) => {
  return axios.get(`https://rest.bandsintown.com/artists/${name}/events?`, {
    params: {
        app_id: process.env.BANDS_IN_TOWN_API_KEY
      }
    }).then(function (response) {
      console.log("Fetched events from BIT for => " + name, response);
      return response.data
    });
}

module.exports = fetchEvents;
