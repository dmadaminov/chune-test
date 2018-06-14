import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { timestampToDate } from '../../helpers/populateArticles'
import Player from './Player'


const styles = theme => {
  return {
    root: {
      width: 716,
      height: 486,
      display: 'flex',
      flexDirection: 'column',
    },
    videoContainer: {
      width: 716,
      height: 403,
    },
    topContainer: {
      width: 716,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    cardBody: {
      width: "100%",
      minHeight: 63,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 19,
      paddingRight: 19,
      margin: 0,
    },
    videoSource: {
      marginTop: 18,
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "rgba(0, 0, 0, 0.87)",
      textTransform: 'uppercase'
    },
    videoDate: {
      marginTop: 16,
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "rgba(0, 0, 0, 0.87)",
      textTransform: 'uppercase'
    },
    artistName: {
      fontSize: 12,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: 1.33,
      letterSpacing: 2,
      color: "#6200ee",
      textTransform: 'capitalize'
    },
    headline: {
      marginTop: 5,
      marginBottom: 0,
      fontFamily: "Roboto",
      fontSize: 20,
      fontWeight: 500,
      fontStyle: "normal",
      fontStretch: "normal",
      lineHeight: "normal",
      letterSpacing: 0.3,
      color: "rgba(0, 0, 0, 0.87)",
    },
  };
};

const truncateWithEllipses = (text, max) => {
    return text.substr(0,max-1) + (text.length > max ? '...' : ''); 
}

const VideoCard = (props) => {
  const { classes, video, autoplay } = props;
  if(!video) {
    return <div>No Video</div>;
  }

  let formattedDate = video.date ? timestampToDate(video.date) : '';

  return (
    <div>
      <Card classes={ {root: classes.root} }>
        <div className={classes.topContainer}>
          <CardContent className={classes.cardBody}>
            <Typography gutterBottom variant="headline" component="p" className={classes.videoSource}>
              { `via ${ video.source } · `}
              <span className={classes.videoDate}>
                { `${ formattedDate } · `}
              </span>
              <span>
                <a href={"/Artist?n="+encodeURI(video.artist)} className={classes.artistName}>
                  { video.artist }
                </a>
              </span>
            </Typography>
            <Typography gutterBottom variant="headline" component="h2" className={classes.headline}>
              { truncateWithEllipses(video.title, 60) }
            </Typography>
          </CardContent>
        </div>
        <div className={classes.videoContainer}>
          <CardMedia
            classes={ {root: classes.media} }
            component={ Player }
            image={video.image}
            url={video.url}
            autoplay
          />
        </div>
      </Card>
    </div>
  );
}

VideoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoCard);