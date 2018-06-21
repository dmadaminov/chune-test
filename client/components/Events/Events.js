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
import { fetchEventsForMultipleArtists } from '../../store/events';
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
    if(props.artists.length > 0) {
      props.fetchEventsForMultipleArtists(props.artists.map(artist => artist.name)); 
    }
  }

  getEventsForArtist = (events, artist) => {
    var event = events.filter(event => event.artistId == artist.artistId )[0];
    if(event) {
      return event.events;
    } else {
      return [];
    }
  }

  render() {
    const { classes, artists, events, userId, match } = this.props;

    if(artists.length > 0) {
      return (
        <div>
          <Navbar value={4} />
          <div className={classes.root}>
            <h3 className={classes.heading}>Events</h3>
            <GridList cols={3} className={classes.gridList} cellHeight={152}>
              {
                artists.map(artist => (
                  <GridListTile key={artist.artistId} >
                    <EventCard
                      artist={artist}
                      hasEventSoon={anyNearByEventsWithinTwoMonths(this.getEventsForArtist(events, artist), this.props.geolocation)} 
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
  artists: store.followingArtists,
  events: store.events,
  geolocation: store.geolocation,
})

const mapDispatch = dispatch => ({ 
    fetchEventsForMultipleArtists: artists => dispatch(fetchEventsForMultipleArtists(artists)),
    addArtists: artists => dispatch(addArtists(artists)),
    deleteArtist: artist => dispatch(deleteArtist(artist))
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Events));
