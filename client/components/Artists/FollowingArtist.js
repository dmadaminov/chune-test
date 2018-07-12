import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => {
  return {
    root: {
      maxWidth: 343,
      width: 343,
      height: 128,
      display: "flex",
      flexDirection: "row",
      borderRadius: 4,
      backgroundColor: "#ffffff",
      border: "solid 1px rgba(0, 0, 0, 0.12)",
      boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    },
    media: {
      height: 128,
      width: 128,
    },
    rightContainer: {
      width: 171,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    cardBody: {
      width: "100%",
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 20,
      paddingRight: 20,
      margin: 0,
    },
    genre: {
      width: 171,
      marginTop: 17,
      marginBottom: 0,
      height: 16,
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "rgba(0, 0, 0, 0.87)",
      textTransform: 'capitalize'
    },
    artistName: {
      width: 171,
      marginTop: 4,
      marginBottom: 0,
      height: 24,
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.3,
      color: "rgba(0, 0, 0, 0.87)",
      cursor: 'pointer',
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    seeMore: {
      marginTop: 33,
      marginLeft: 0,
      padding: 0,
      width: 59,
      height: 16,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.14,
      letterSpacing: 1.3,
      textAlign: "left",
      color: "#6200ee",
      textTransform: 'uppercase',
      cursor: "pointer",
    },
    unfollow: {
      marginTop: 33,
      marginLeft: 0,
      padding: 0,
      width: 107,
      height: 16,
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.14,
      letterSpacing: 1.3,
      textAlign: "center",
      color: "#6200ee",
      textTransform: 'uppercase',
      cursor: "pointer",
    }
  };
};

const FollowingArtist = (props) => {
  const { classes, artist, unfollowHandler } = props;

  return (
    <div>
      <Card classes={ {root: classes.root} } raised={true}>
        <CardMedia
          classes={ {root: classes.media} }
          image={ artist.imageUrl || "https://via.placeholder.com/254x254" }
          title={artist.name}
          />
          <div className={classes.rightContainer}>
            <CardContent className={classes.cardBody}>
              <Typography gutterBottom variant="headline" component="p" className={classes.genre}>
                { artist.genres[0] }
              </Typography>
              <Typography gutterBottom variant="headline" component="h2" className={classes.artistName} onClick={() => window.location = `${window.location.origin}/Artist?n=${artist.name}`}>
                { artist.name }
              </Typography>
            </CardContent>
            <CardActions className={ classes.cardBody }>
              <div className={classes.actionsContainer}>
                <Link className={classes.seeMore} to={`/Artist/${artist.name}`}>More</Link>
                <div className={classes.unfollow} onClick={unfollowHandler}>Unfollow</div>
              </div>
            </CardActions>
          </div>
      </Card>
    </div>
  );
}

FollowingArtist.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FollowingArtist);