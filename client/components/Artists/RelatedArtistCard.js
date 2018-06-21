import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { auth, database } from '../../firebase'

const styles = theme => {
  return {
    root: {
      width: 343,
      height: 258,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      borderRadius: 4,
    },
    artistName: {
      paddingLeft: 16,
      margin: 0,
      width: 303,
      height: 70,
      fontFamily: "Roboto",
      fontSize: 30,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.2,
      color: "#ffffff",
    },
    genre: {
      paddingLeft: 16,
      margin: '0px 0px 5px 0px',
      width: 303,
      height: 20,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "normal",
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.43,
      letterSpacing: 0.3,
      color: "rgba(255, 255, 255, 0.6)",
      textTransform: 'capitalize'
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      paddingTop: 10,
      marginBottom: 8,
    },
    actionButton: {
      height: 16,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.14,
      letterSpacing: 1.3,
      textAlign: "center",
      color: "#ffffff",
    }
  };
};

const RelatedArtistCard = (props) => {
  const { classes, artist, unfollowHandler, followHandler } = props;

  const overrideBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${artist.images[0].url})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <Paper className={classes.root} style={overrideBgStyle}>
      <div className={classes.genre}>
        {artist.genres[0]}
      </div>
      <div>
        <h3 className={classes.artistName}>{artist.name}</h3>
      </div>
      <div className={classes.actionsContainer}>
        <Button component={Link} to={`/Artist/${artist.name}`} className={classes.actionButton}>See More</Button>
        <Button className={classes.actionButton} onClick={ followHandler.bind(null, artist.name) }>Follow</Button>
      </div>
    </Paper>
  );
}

RelatedArtistCard.propTypes = {
  classes: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired,
};

export default withStyles(styles)(RelatedArtistCard);