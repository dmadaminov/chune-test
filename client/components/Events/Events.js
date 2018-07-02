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
import { fetchEventsForMultipleArtists, loadingEvents } from '../../store/events';
import { auth, database } from '../../firebase'
import { GeoLocation } from 'react-redux-geolocation';
import { filterEventsWithinTwoMonths, anyNearByEventsWithinTwoMonths } from '../../helpers/eventHelpers';
import MediaQuery from 'react-responsive';
import { withRouter, Redirect } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: 1086,
    margin: '44px auto',
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
    marginBottom: 26,
  },
  gridList: {
    '@media (max-width: 1023px)': {
      width: 344,
      margin: '16px auto',
    }
  },
  gridListTile: {
    height: 128,
    marginBottom: 16,
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
    console.log("Component Did mount", props);
    props.loadingEvents();
    props.fetchEventsForMultipleArtists(props.artists.map(artist => artist.name)); 
  }

  render() {
    const { classes, artists, events, userId, match, eventsLoading, geolocation } = this.props;
    if (!artists.length) return <Redirect to="/artists"/>

    if(artists.length > 0) {
      return (
        <div>
          <GeoLocation />
          <Navbar value={4} />
          <div className={classes.root}>
            <MediaQuery minWidth={1024}>
              <h3 className={classes.heading}>Events</h3>
              <GridList cols={3} className={classes.gridList} cellHeight={128}>
                {
                  artists.map(artist => (
                    <GridListTile key={artist.artistId} className={classes.gridListTile}>
                      <EventCard
                        artist={artist}
                        eventsLoading={eventsLoading}
                        events={events}
                        geolocation={geolocation}
                        />
                    </GridListTile>
                  ))
                }
              </GridList>
            </MediaQuery>
            <MediaQuery maxWidth={1023}>
              <div className={classes.gridList}>
                <GridList cols={1} cellHeight={128}>
                  {
                    artists.map(artist => (
                      <GridListTile key={artist.artistId} className={classes.gridListTile}>
                        <EventCard
                          artist={artist}
                          eventsLoading={eventsLoading}
                          events={events}
                          geolocation={geolocation}
                          />
                      </GridListTile>
                    ))
                  }
                </GridList>
              </div>
            </MediaQuery>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <GeoLocation />
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
  userId: store.user.uid,
  artists: store.followingArtists.artists,
  events: store.events.events,
  eventsLoading: store.events.initialLoading,
  geolocation: store.geolocation,
})

const mapDispatch = dispatch => ({ 
    fetchEventsForMultipleArtists: artists => dispatch(fetchEventsForMultipleArtists(artists)),
    loadingEvents: () => dispatch(loadingEvents()),
    addArtists: artists => dispatch(addArtists(artists)),
    deleteArtist: artist => dispatch(deleteArtist(artist)),
})

export default withStyles(styles)(withRouter(connect(mapState, mapDispatch)(Events)));
