import geodist from 'geodist';
import moment from 'moment';
import some from 'lodash/some';

export const hasNearbyEvents = (events, currentLocation) => some(events, (event) => {
  const venue = { lat: event.venue.latitude, lon: event.venue.longitude };
  const center = { lat: currentLocation.latitude, lon: currentLocation.longitude };
  return geodist(center, venue, { limit: 100, unit: 'mile' });
});

export const isNearByEvent = (event, currentLocation) => {
  const venue = { lat: Number(event.latitude), lon: Number(event.longitude) };
  const center = { lat: Number(currentLocation.latitude), lon: Number(currentLocation.longitude) };
  return geodist(center, venue, { limit: 100, unit: 'mile' });
};


export const filterEventsWithinTwoMonths = (events) => {
  const nextThreeMonths = moment().add(3, 'months');
  return events.filter(event => moment(event.datetime).isBefore(nextThreeMonths));
};

export const anyNearByEventsWithinTwoMonths = (events, currentLocation) => {
  if (currentLocation.latitude && currentLocation.longitude) {
    return hasNearbyEvents(filterEventsWithinTwoMonths(events), currentLocation);
  }
  return false;
};

export const truncateWithEllipses = (text, max) => text.substr(0, max - 1) + (text.length > max ? '...' : '');
