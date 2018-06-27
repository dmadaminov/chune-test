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
import MediaQuery from 'react-responsive';

const styles = theme => ({
  root: {
    width: 1086,
    marginLeft: 99,
    marginRight: 99,
    '@media (max-width: 1023px)': {
      width: '100vw',
      margin: 0,
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
    '@media (max-width: 1023px)': {
      paddingLeft: 4,
    }
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

class Following extends React.Component {

    render() {
      const { followingArtists, classes, unfollowHandler } = this.props;
      if(followingArtists.length) {
        return (
          <div className={classes.root}>
            <MediaQuery minWidth={1024}>
              <h3 className={classes.heading}>Following</h3>
              <GridList cols={3} className={classes.gridList} cellHeight={128}>
                {
                  followingArtists.map(followingArtist => (
                    <GridListTile key={followingArtist.artistId} className={classes.gridListTile}>
                      <FollowingArtist artist={followingArtist} unfollowHandler={unfollowHandler.bind(this, followingArtist)} />
                    </GridListTile>
                  ))
                }
              </GridList>
            </MediaQuery>
            <MediaQuery maxWidth={1023}>
              <div className={classes.gridList}>
                <h3 className={classes.heading}>Following</h3>
                <GridList cols={1} cellHeight={128}>
                  {
                    followingArtists.map(followingArtist => (
                      <GridListTile key={followingArtist.artistId} className={classes.gridListTile}>
                        <FollowingArtist artist={followingArtist} unfollowHandler={unfollowHandler.bind(this, followingArtist)} />
                      </GridListTile>
                    ))
                  }
                </GridList>
              </div>
            </MediaQuery>
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

export default withStyles(styles)(Following);