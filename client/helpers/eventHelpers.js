import geodist from 'geodist';
import moment from 'moment';
import some from 'lodash/some';

export const hasNearbyEvents = ( events, currentLocation ) => {
  return some(events, event => {
    var venue = {lat: event.venue.latitude, lon: event.venue.longitude};
    var center = {lat: currentLocation.latitude, lon: currentLocation.longitude};
    return geodist(center, venue, {limit: 60, unit: 'mile'});  
  })
}

export const isNearByEvent = ( event, currentLocation ) => {
    var venue = {lat: event.venue.latitude, lon: event.venue.longitude};
    var center = {lat: currentLocation.latitude, lon: currentLocation.longitude};
    return geodist(center, venue, {limit: 60, unit: 'mile'});
}


export const filterEventsWithinTwoMonths = (events) => {
  var nextTwoMonths = moment().add(2, 'months');
  return events.filter(event => {
    return moment(event.datetime).isBefore(nextTwoMonths);
  })
}

export const anyNearByEventsWithinTwoMonths = (events, currentLocation) => {
  if(currentLocation.latitude && currentLocation.longitude) {
    return hasNearbyEvents(filterEventsWithinTwoMonths(events), currentLocation);
  } else {
    return false;
  }
}

export const truncateWithEllipses = (text, max) => {
    return text.substr(0,max-1) + (text.length > max ? '...' : ''); 
}