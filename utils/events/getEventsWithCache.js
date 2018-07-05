const moment = require('moment');
const crypto = require('crypto');
const _ = require('lodash');
const firestore = require('../firebase/firestore');
const fetchArtist = require('../fetchArtist');
const fetchEvents = require('./fetchEvents');
const { getValidCacheTime, unescapeFirebaseForbiddenChars } = require('../globalHelpers'); 

const fetchFromStore = (artist) => {
  return firestore.collection('artists').doc(artist.artistId).get().then(doc => {
    if(artist.events) {
      return events;
    } else {
      return []
    }    
  });
}

const getEventsWithCache = (name) => {
  return fetchArtist(name).then(artist => {
    //check if videos last fetched time is within 24 hours
    if (artist.eventsLastFetchedAt && moment(artist.eventsLastFetchedAt).isAfter(getValidCacheTime()) ) {
      return {artistId: artist.artistId, name: artist.name, events: artist.events};
    } else {
      // otherwise fetch from youtube again
      console.log("There are no old events or old events are out of date");
      return fetchEvents(unescapeFirebaseForbiddenChars(name)).then(events => {
        return firestore.collection('artists').doc(artist.artistId).set({events: events, eventsLastFetchedAt: moment().toDate()}, {merge: true}).then(_res => {
          return events;
        });
      }).then((events) => {
        return {artistId: artist.artistId, name: artist.name, events: events};
      });
    }
  })
}

module.exports = getEventsWithCache;