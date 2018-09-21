import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  arrayOf, any, objectOf,
  number
} from 'prop-types';

import { EventsTableConnect } from './EventsTable';
import { ArtistWallpaperConnect } from './ArtistWallpaper';
import { EmptyListConnect } from '../shared/EmptyList';


const styles = () => ({
  root: {
    width: 716,
    margin: '0px auto',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },
  heading: {
    width: 283,
    height: 28,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: '#000000',
  },
  gridList: {
  },
  container: {
    backgroundColor: '#fafafa',
    width: '100%',
    paddingTop: 24,
  },
  noevents: {
    width: 716,
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const ArtistEvents = ({
  classes, events, id,
  artists, geolocation
}) => {
  const artist = artists.filter(e => e.id === id);
  if (events.length === 0) {
    return (
      <EmptyListConnect
        messageOne={`Sorry, no recent events for ${artist[0].name}`}
        messageTwo="Click on the search bar to find and follow another artist."
      />
    );
  }
  return (
    <div className={classes.root}>
      <ArtistWallpaperConnect artist={artist[0]} />
      <EventsTableConnect events={events} geolocation={geolocation} />
    </div>
  );
};


const mapStateToProps = store => ({
  events: store.dataEvents.events,
  id: store.dataEvents.id,
  artists: store.dataArtists.artists,
  geolocation: store.dataEvents.geolocation
});

export const ArtistEventsConnect = withStyles(styles)(connect(mapStateToProps, null)(ArtistEvents));

ArtistEvents.propTypes = {
  events: arrayOf(any).isRequired,
  id: number.isRequired,
  artists: arrayOf(any).isRequired,
  classes: objectOf(any).isRequired,
  geolocation: objectOf(any).isRequired
};
