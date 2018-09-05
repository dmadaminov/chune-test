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
import { truncateWithEllipses } from '../../helpers/eventHelpers'
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

const styles = theme => {
  return {
    root: {
      width: '100%',
      height: 500,
      display: 'flex',
      flexDirection: 'column',
      '@media (max-width: 1023px)': {
        width: '100%',
        height: 312,
        flexDirection: "column",
        margin: '0 auto',
      }
    },
    videoContainer: {
      width: '100%',
      height: 400,
      '@media (max-width: 1023px)': {
        width: '100%',
        height: 194,
      }
    },
    topContainer: {
      width: '100%',
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      marginBottom: 20,
      '@media (max-width: 1023px)': {
        width: '100%',
        height: 97,
      }
    },
    cardBody: {
      width: '100%',
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
      '@media (max-width: 1023px)': {
        fontSize: 18,
      }
    },
  };
};



const VideoCard = (props) => {
  const {
    classes, video, autoplay,
    rootClassName, videoControlerClass,
  } = props;

  if(!video) {
    return <div>No Video</div>;
  }

  let formattedDate = video.date ? timestampToDate(video.date) : '';

  return (
    <div className={rootClassName}>
      <Card
        classes={ {root: classes.root} }
        className={videoControlerClass}
      >
        <div className={classes.topContainer}>
          <CardContent className={classes.cardBody}>
            <Typography gutterBottom variant="headline" component="p" className={classes.videoSource}>
              { `via ${ video.source } · `}
              <span className={classes.videoDate}>
                { `${ formattedDate }`}
              </span>
              <MediaQuery minWidth={1024}> · </MediaQuery>
              <MediaQuery maxWidth={1023}><br/></MediaQuery>
              <span>
                <Link to={`/Artist/${encodeURI(video.artists[0])}`} className={classes.artistName}>
                  { video.artists[0] }
                </Link>
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