import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { objectOf, any, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { unfollowArtist } from '../../store/artists/actions';
import { searchSelectArtist } from '../../store/autosuggest/actions';


const styles = () => ({
  cardArtist: {
    width: 343,
    height: 128,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#ffffff',
    border: 'solid 1px rgba(0, 0, 0, 0.15)',
    boxShadow: 'none'
  },
  media: {
    height: 128,
    width: 128,
  },
  rightContainer: {
    width: 215,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardBody: {
    width: 152,
    padding: 0,
    margin: 0,
  },
  genre: {
    width: 152,
    marginTop: 17,
    marginBottom: 0,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.33,
    letterSpacing: 2,
    color: 'rgba(0, 0, 0, 0.87)',
    textTransform: 'capitalize'
  },
  artistName: {
    width: 152,
    marginTop: 4,
    marginBottom: 0,
    height: 24,
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  seeMore: {
    marginTop: 33,
    marginLeft: 0,
    padding: 0,
    width: 59,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: 'left',
    color: '#6200ee',
    textTransform: 'uppercase',
    cursor: 'pointer'
  },
  unfollow: {
    marginTop: 33,
    marginLeft: 0,
    padding: 0,
    width: 107,
    height: 16,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 500,
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.14,
    letterSpacing: 1.3,
    textAlign: 'center',
    color: '#6200ee',
    textTransform: 'uppercase',
    cursor: 'pointer',
    border: 0,
    backgroundColor: '#ffffff'
  }
});

const FollowingArtist = ({ classes, artist, unfollowToArtist, seeMore }) => {
  let genre = 'POP';
  if (artist.genres[0] !== undefined) genre = artist.genres[0].description;
  return (
    <Card classes={{ root: classes.cardArtist }} raised>
      <CardMedia
        classes={{ root: classes.media }}
        image={artist.image_url || 'https://via.placeholder.com/254x254'}
        title={artist.name}
      />
      <div className={classes.rightContainer}>
        <CardContent className={classes.cardBody}>
          <Typography gutterBottom variant="headline" component="p" className={classes.genre}>
            { genre }
          </Typography>
          <Typography gutterBottom variant="headline" component="h2" className={classes.artistName}>
            { artist.name }
          </Typography>
        </CardContent>
        <CardActions className={classes.cardBody}>
          <div className={classes.actionsContainer}>
            <Link className={classes.seeMore} to={`/Artist/${artist.name}`} onClick={() => seeMore(artist.name)}>
              More
            </Link>
            <button onClick={() => unfollowToArtist(artist.name)} className={classes.unfollow} type="button">
              Unfollow
            </button>
          </div>
        </CardActions>
      </div>
    </Card>
  );
};

FollowingArtist.propTypes = {
  classes: objectOf(any).isRequired,
  artist: objectOf(any).isRequired,
  unfollowToArtist: func.isRequired
};

const mapActionsToProps = dispatch => bindActionCreators({
  unfollowToArtist: unfollowArtist,
  seeMore: searchSelectArtist
}, dispatch);

export const FollowingArtistConnect = withStyles(styles)(withRouter(connect(null, mapActionsToProps)(FollowingArtist)));
