import React from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import flatten from 'lodash/flatten'
import shuffle from 'lodash/shuffle'

import Navbar from '../Navbar'
import RelatedArtists from './RelatedArtists'
import Following from './Following'
import { auth, database } from '../../firebase'
import { Redirect } from 'react-router-dom'
import '../../assets/global.css'
import '../../assets/artists.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EmptyList from '../shared/EmptyList'
import Loading from '../shared/Loading'
import { createSelector } from 'reselect'

import { fetchFollowingArtists, followArtist, unfollowArtist, reloadArtists } from '../../store/followingArtists';

const styles = theme => ({
  initialMessage: { 
    width: "713px",
    height: "300px",
    margin: "180px auto",
  },
  container: {
    margin: '44px auto',
    width: 1280,
    '@media (max-width: 1023px)': {
      width: '100vw',
      margin: '24px auto',
    }
  }
});

class Artists extends React.Component {

  // componentDidMount() {
  //   const props = this.props;

  //   if(props.followingArtists.length <= 0) {
  //     props.fetchFollowingArtists(props.artists);
  //   }
  // }

  render() {
    const { initialLoading, followingArtists, followArtist, unfollowArtist, relatedArtists, classes, userId, reloadArtists } = this.props;

    if (!userId) return <Redirect to="/" />
    if(initialLoading) {
      return (
        <div>
          <Navbar value={1}/>
          <Loading />
        </div>
      )
    }
    const unfollow = (artist) => {
      console.log(" Unfollowing ", artist);
      reloadArtists();
      unfollowArtist(artist, userId);
    }

    const follow = (artist) => {
      console.log("Following ", artist);
      reloadArtists();
      followArtist(artist, userId);
    }
    
    if(followingArtists.length == 0) {
      return (
        <div>
          <Navbar value={1}/>
          <EmptyList 
            messageOne={"You didn't follow any artists yet."}
            messageTwo={"Search to find and follow artists."} />
        </div>
      );
    } else {
      return (
      	<div>
          <Navbar value={1}/>
          <div className={classes.container}>
            <RelatedArtists relatedArtists={relatedArtists} followHandler={follow}/>
            <Following followingArtists={followingArtists} unfollowHandler={unfollow} />
          </div>
        </div>
      )
    }
  }
}

const getRelatedArtists = createSelector([followingArtists => followingArtists], (followingArtists) => {
  if(followingArtists.length <= 0) {
    return [];
  } else {
    return shuffle(
      flatten(
        followingArtists
        .map(followingArtist => followingArtist.relatedArtists)
      ).filter(relatedArtist => !find(followingArtists, (artist) => relatedArtist.name == artist.name))
    )

  }
});

const mapState = store => ({
  userId: store.user.uid,
  artists: store.followingArtists,
  initialLoading: store.followingArtists.initialLoading,
  followingArtists: store.followingArtists.artists,
  relatedArtists: getRelatedArtists(store.followingArtists.artists),
})
const mapDispatch = dispatch => ({ 
    fetchFollowingArtists: artists => dispatch(fetchFollowingArtists(artists)),
    followArtist: (artist, userId) => dispatch(followArtist(artist, userId)),
    unfollowArtist: (artist, userId) => dispatch(unfollowArtist(artist, userId)),
    reloadArtists: () => dispatch(reloadArtists())
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Artists))
