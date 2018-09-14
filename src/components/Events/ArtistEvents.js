import React from 'react'
import { connect } from 'react-redux'

import EventsTable from './EventsTable'
import ArtistWallpaper from './ArtistWallpaper'
import Loading from '../shared/Loading'
import { EmptyListConnect } from '../shared/EmptyList'
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { fetchEventArtist, addEventArtist, fetchEventsForArtist } from '../../store/eventArtist';
import { GeoLocation } from 'react-redux-geolocation';

const styles = theme => ({
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
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: "normal",
    letterSpacing: 0.3,
    color: "#000000",
  },
  gridList: {
  },
  container: {
    backgroundColor: "#fafafa",
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

class ArtistEvents extends React.Component {

  componentDidMount() {
    const artistName = this.props.match.params.artistName;

    const artist = this.props.artists.filter(artist => artist.name === artistName)[0];
    if(artist) {
      this.props.addEventArtist(artist);
    } else {
      this.props.fetchEventArtist(artistName);
    }
    const eventObject = this.props.events.filter(event => event.name == artistName )[0];
    if(!eventObject) {
      this.props.fetchEventsForArtist(artistName);
    }
  }

  render() {
    const { classes, eventArtist, eventData, artists, fetching, geolocation, match } = this.props;
    const artistName = this.props.match.params.artistName;

    const eventObject = this.props.events.filter(event => event.name == artistName )[0];
    let events = eventObject ? eventObject.events : [];
    let eventList = null;
    if(events.length == 0) {
      eventList =  <EmptyListConnect
              messageOne={`Sorry, no recent events for ${artistName}`}
              messageTwo={"Click on the search bar to find and follow another artist."} />
    } else {
      eventList = (
        <div className={classes.root}>
          <ArtistWallpaper artist={eventArtist} />
          <EventsTable events={events} geolocation={geolocation} />
        </div>
      );
    }

    if(!fetching) {
      return (
        <div>
          <GeoLocation />
          {eventList}
        </div>
      );
    } else {
      return (
        <div>
          <div className={classes.root}>
            <Loading />
          </div>
        </div>
      )
    }
  }

}


const mapState = store => ({
  userId: store.user.uid,
  artists: store.followingArtists.artists,
  eventArtist: store.eventArtist.artist,
  events: store.eventArtist.events,
  fetching: store.eventArtist.fetching,
  geolocation: store.geolocation,
})
const mapDispatch = dispatch => ({ 
    fetchEventArtist: artist => dispatch(fetchEventArtist(artist)),
    addEventArtist: artist => dispatch(addEventArtist(artist)),
    fetchEventsForArtist: artist => dispatch(fetchEventsForArtist(artist)),
})

export default withStyles(styles)(connect(mapState, mapDispatch)(ArtistEvents));
