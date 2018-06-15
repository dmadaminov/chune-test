import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../store/user';

import Navbar from '../Navbar'
import EventsTable from './EventsTable'
import ArtistWallpaper from './ArtistWallpaper'
import Loading from '../shared/Loading'
import { withStyles } from '@material-ui/core/styles';
import { fetchArtistWithEvents, addArtistWithEvents } from '../../store/artistWithEvents';
import { auth } from '../../firebase'
import { GeoLocation } from 'react-redux-geolocation';

const styles = theme => ({
  root: {
    width: 716,
    margin: '0px auto',
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
  }
});

class ArtistEvents extends React.Component {

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) addUser(user.uid)
      const userId = user.uid
      this.props.addUser(userId)
    });

    const artistName = this.props.match.params.artistName;

    const artist = this.props.artistsWithEvents.filter(artistWithEvents => artistWithEvents.name === artistName)[0];
    if(artist) {
      this.props.addArtistWithEvents(artist);
    } else {
      this.props.fetchArtistWithEvents(artistName);
    }

  }

  render() {
    const { classes, artistWithEvents, geolocation, match } = this.props;

    console.log(artistWithEvents);

    if(artistWithEvents) {
      return (
        <div>
          <Navbar value={4} />
          <GeoLocation />
          <div className={classes.root}>
            <ArtistWallpaper artist={artistWithEvents} />
            <EventsTable events={artistWithEvents.events.data} geolocation={geolocation} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar value={4} />
          <div className={classes.root}>
            <Loading />
          </div>
        </div>
      )
    }
  }

}

const mapState = store => ({
  userId: store.user,
  artists: store.artists,
  artistsWithEvents: store.artistsWithEvents,
  artistWithEvents: store.artistWithEvents,
  geolocation: store.geolocation,
})
const mapDispatch = dispatch => ({ 
    fetchArtistWithEvents: artist => dispatch(fetchArtistWithEvents(artist)),
    addArtistWithEvents: artist => dispatch(addArtistWithEvents(artist)),
    addUser: userID => dispatch(addUser(userID)),
})

export default withStyles(styles)(connect(mapState, mapDispatch)(ArtistEvents));
