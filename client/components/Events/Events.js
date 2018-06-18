import React from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import { addUser } from '../../store/user';

import Navbar from '../Navbar'
import EventCard from './EventCard'
import ArtistEvents from './ArtistEvents'
import Loading from '../shared/Loading'
import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { addArtists, deleteArtist } from '../../store/artists';
import { fetchFollowingArtistsWithEvents } from '../../store/artistsWithEvents';
import { auth, database } from '../../firebase'
import { GeoLocation } from 'react-redux-geolocation';
import { filterEventsWithinTwoMonths, anyNearByEventsWithinTwoMonths } from '../../helpers/eventHelpers';

const styles = theme => ({
  root: {
    width: 1086,
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

class Events extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const props = this.props;

    auth.onAuthStateChanged(user => {
      if (user) addUser(user.uid)
      const userId = user.uid
      const userRef = database.ref(`users/${userId}/artists`)
      userRef.on('value', snapshot => {
          if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
      })
    });

    if (props.artists.length <= 0) {
      const userId = props.userId
      const userRef = database.ref(`users/${userId}/artists`)
      userRef.once('value', snapshot => {
        if(snapshot.val() != null) {
          if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
        }
      })
      userRef.on('value', snapshot => {
        console.log("New value from firebae", snapshot.val());
        if(snapshot.val() != null) {
          if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
        }
      })
      return;
    }

    if(props.artistsWithEvents.length <= 0) {
      props.fetchFollowingArtistsWithEvents(props.artists);
    }
  }

  componentDidUpdate(prevProps) {
    const props =  this.props;
    console.log("Updating props", prevProps, this.props);

    if(props.artists.length > 0) {
      if(!isEqual(prevProps.artists, props.artists)) {
        props.fetchFollowingArtistsWithEvents(props.artists);
      }
    }
  }

  render() {
    const { classes, artistsWithEvents, userId, match } = this.props;

    if(artistsWithEvents.length > 0) {
      return (
        <div>
          <Navbar value={4} />
          <div className={classes.root}>
            <h3 className={classes.heading}>Events</h3>
            <GridList cols={3} className={classes.gridList} cellHeight={152}>
              {
                artistsWithEvents.map(artistWithEvents => (
                  <GridListTile key={artistWithEvents.artistId} >
                    <EventCard
                      artist={artistWithEvents}
                      hasEventSoon={anyNearByEventsWithinTwoMonths(artistWithEvents.events.data, this.props.geolocation)} 
                      />
                  </GridListTile>
                ))
              }
            </GridList>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <GeoLocation />
          <Navbar value={4} />
          <div className={classes.root}>
            <h3 className={classes.heading}>Events</h3>
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
  followingArtists: store.followingArtists,
  artistsWithEvents: store.artistsWithEvents,
  geolocation: store.geolocation,
})
const mapDispatch = dispatch => ({ 
    fetchFollowingArtistsWithEvents: artists => dispatch(fetchFollowingArtistsWithEvents(artists)),
    addArtists: artists => dispatch(addArtists(artists)),
    deleteArtist: artist => dispatch(deleteArtist(artist))
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Events));
