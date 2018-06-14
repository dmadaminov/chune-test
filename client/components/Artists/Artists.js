import React from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import flatten from 'lodash/flatten'

import Navbar from '../Navbar'
import { Row, Input, Collection } from 'react-materialize'
import RelatedArtists from './RelatedArtists'
import Following from './Following'
import { auth, database } from '../../firebase'
import { Redirect } from 'react-router-dom'
import '../../assets/global.css'
import '../../assets/artists.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { addArtists, deleteArtist } from '../../store/artists';
import { fetchFollowingArtists } from '../../store/followingArtists';

const styles = theme => ({
});

class Artists extends React.Component {

  componentDidMount() {
    const props = this.props;
    if (props.artists.length <= 0) {
      const userId = props.userId
      const userRef = database.ref(`users/${userId}/artists`)
      userRef.once('value', snapshot => {
        if(snapshot.val() != null) {
          if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
        }
      })
      userRef.on('value', snapshot => {
        if(snapshot.val() != null) {
          if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
        }
      })
      return;
    }

    if(props.followingArtists.length <= 0) {
      props.fetchFollowingArtists(props.artists);
    }
  }

  componentDidUpdate(prevProps) {
    const props =  this.props;

    if(props.followingArtists.length <= 0) {
      props.fetchFollowingArtists(props.artists);
    } else {
      if(!isEqual(prevProps.artists, props.artists)) {
        props.fetchFollowingArtists(props.artists);
      }
    }
  }

  render() {
    const { artists, followingArtists, relatedArtists, classes, deleteArtist, userId } = this.props;

    if (!userId) return <Redirect to="/" />

    const unfollow = name => {
      const ref = database.ref(`users/${userId}/artists`)
      ref.child(name).remove()
      deleteArtist(name);
    }

    const follow = (name) => {
      database.ref(`users/${userId}/artists`).update({[name]: true});
      addArtists({...this.props.artists.concat(), [name]: true});
    }

    return (
    	<div>
        <Navbar value={1}/>
        <div style={{margin: '44px auto', width: 1280}}>
          <RelatedArtists relatedArtists={relatedArtists} followHandler={follow}/>
          <Following followingArtists={followingArtists} artists={artists} unfollowHandler={unfollow} />
        </div>
      </div>
    )
  }
}

const getRelatedArtists = (followingArtists) => {
  if(followingArtists.length <= 0) {
    return [];
  } else {
    return flatten(
      followingArtists
      .map(followingArtist => followingArtist.relatedArtists)
    ).filter(relatedArtist => !find(followingArtists, (artist) => relatedArtist.name == artist.name))

  }
}

const mapState = store => ({
  userId: store.user,
  artists: store.artists,
  followingArtists: store.followingArtists,
  relatedArtists: getRelatedArtists(store.followingArtists),
})
const mapDispatch = dispatch => ({ 
    fetchFollowingArtists: artists => dispatch(fetchFollowingArtists(artists)),
    addArtists: artists => dispatch(addArtists(artists)),
    deleteArtist: artist => dispatch(deleteArtist(artist))
})

export default withStyles(styles)(connect(mapState, mapDispatch)(Artists))
