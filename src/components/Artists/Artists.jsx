import React from 'react';
import { connect } from 'react-redux';
import { objectOf, arrayOf, any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { RelatedArtistsConnect } from './RelatedArtists';
import { FollowingConnect } from './Following';
import { EmptyListConnect } from '../shared/EmptyList';
// import Loading from '../shared/Loading';

const styles = () => ({
  initialMessage: {
    width: '713px',
    height: '300px',
    margin: '180px auto',
  },
  container: {
    margin: '44px auto',
    '@media (max-width: 1023px)': {
      width: '100vw',
      margin: '24px auto',
    }
  }
});
const Artists = ({ classes, artists }) => {
  if (artists.length === 0) {
    return (
      <div>
        <EmptyListConnect
          messageOne="You didn't follow any artists yet."
          messageTwo="Search to find and follow artists."
        />
      </div>
    );
  }
  let relatedArtists = [];
  artists.forEach((e) => { relatedArtists = relatedArtists.concat(e.recommended); });
  // const objArtists = artists.reduce((acc, item) => ({ ...acc, [item.id]: { id: item.id } }), {});
  // console.log(objArtists, 'objArtists');
  // console.log(artists, 'artists');
  // console.log(relatedArtists, 'relatedArtists');
  // const newRelatedArtists = relatedArtists.filter(e => e.id !== objArtists[e.id]);
  // console.log(newRelatedArtists, 'new');
  return (
    <div>
      <div className={classes.container}>
        <RelatedArtistsConnect relatedArtists={relatedArtists} />
        <FollowingConnect artists={artists} />
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  artists: store.dataArtists.artists
});

export const ArtistsConnect = withStyles(styles)(connect(mapStateToProps, null)(Artists));

Artists.propTypes = {
  classes: objectOf(any).isRequired,
  artists: arrayOf(any).isRequired
};
