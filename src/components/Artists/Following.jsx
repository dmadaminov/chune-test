import React from 'react';
import MediaQuery from 'react-responsive';
import { objectOf, any, arrayOf } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { FollowingArtistConnect } from './FollowingArtist';

const styles = () => ({
  root: {
    width: 1100,
    margin: '0 auto',
    '@media (max-width: 1023px)': {
      width: '100vw',
      margin: 0,
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
    padding: '42px 0 27px 0',
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
    height: 130,
    marginBottom: 16,
  },
  container: {
    backgroundColor: '#fafafa',
    width: '100%',
    paddingTop: 24,
  }
});

const Following = ({
  artists, classes
}) => {
  const artistsFollow = artists.map(elem => (
    <GridListTile key={elem.id} className={classes.gridListTile}>
      <FollowingArtistConnect artist={elem} />
    </GridListTile>
  ));
  return (
    <div className={classes.root}>
      <MediaQuery minWidth={1024}>
        <h3 className={classes.heading}>
          Currently Followed Artists
        </h3>
        <GridList cols={3} className={classes.gridList} cellHeight={135}>
          { artistsFollow }
        </GridList>
      </MediaQuery>
      <MediaQuery maxWidth={1023}>
        <div className={classes.gridList}>
          <h3 className={classes.heading}>
            Currently Followed Artists
          </h3>
          <GridList cols={1} cellHeight={135}>
            { artistsFollow }
          </GridList>
        </div>
      </MediaQuery>
    </div>
  );
};

export const FollowingConnect = withStyles(styles)(Following);

Following.propTypes = {
  classes: objectOf(any).isRequired,
  artists: arrayOf(any).isRequired
};
