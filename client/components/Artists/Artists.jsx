import React from 'react';
import { connect } from 'react-redux';
import { objectOf, arrayOf, any } from 'prop-types';
// import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';

// import RelatedArtists from './RelatedArtists';
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
  return (
    <div>
      <div className={classes.container}>
        {/* <RelatedArtists relatedArtists={relatedArtists} followHandler={follow} /> */}
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