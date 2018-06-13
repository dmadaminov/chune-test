import React from 'react'
import isEqual from 'lodash/isEqual'
import { database, auth } from '../../firebase'
import { Row, Col, ProgressBar } from 'react-materialize'
import { connect } from 'react-redux'
import { addArtists, deleteArtist } from '../../store/artists';
import { fetchFollowingArtists } from '../../store/followingArtists';
import { withStyles } from '@material-ui/core/styles';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import FollowingArtist from './FollowingArtist'

const styles = theme => ({
  root: {
    width: 1086,
    marginLeft: 99,
    marginRight: 99,
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

class Following extends React.Component {

    componentDidMount() {
      const props = this.props;
      console.log("Following Mounted", props);
      if (props.artists.length <= 0) {
        const userId = auth.currentUser.uid
        const userRef = database.ref(`users/${userId}/artists`)
        userRef.once('value', snapshot => {
            // console.log(Object.keys(snapshot.val()))
            if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
        })
        userRef.on('value', snapshot => {
            console.log("Firebase data changed!", snapshot.val());
            if (props.artists.toString() !== Object.keys(snapshot.val()).toString()) props.addArtists(Object.keys(snapshot.val()))
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
      const { artists, followingArtists, classes, deleteArtist } = this.props;

      const unfollow = artist => {
        const userId = auth.currentUser.uid
        const ref = database.ref(`users/${userId}/artists`)
        ref.child(artist).remove()
        deleteArtist(artist);
      }

      if(followingArtists.length) {
        return (
          <div className={classes.root}>
            <h3 className={classes.heading}>Currently Followed Artists</h3>
            <GridList cols={3} className={classes.gridList}>
              {
                followingArtists.map(followingArtist => (
                  <GridListTile key={followingArtist.artistId} >
                    <FollowingArtist artist={followingArtist} unfollowHandler={unfollow.bind(this, followingArtist.name)} />
                  </GridListTile>
                ))
              }
            </GridList>
          </div>
        );
      } else {
        return (
          <div>
              <div className="chune-feed-container">
                <h3 className={classes.heading}>Currently Followed Artists</h3>
                <Row>
                  <Col s={12}>
                    <ProgressBar className="chune-progressbar" color="cyan" />
                  </Col>
                </Row>
            </div>
          </div>
        )
      }
    }
}

const mapState = store => ({ artists: store.artists, followingArtists: store.followingArtists })
const mapDispatch = dispatch => ({ 
    fetchFollowingArtists: artists => dispatch(fetchFollowingArtists(artists)),
    addArtists: artists => dispatch(addArtists(artists)),
    deleteArtist: artist => dispatch(deleteArtist(artist))
})
export default withStyles(styles)(connect(mapState, mapDispatch)(Following));