import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
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
      height: 435,
    }
  };
};

const VideoCard = (props) => {
  const { classes, video, autoplay } = props;
  if(!video) {
    return <div>No Video</div>;
  }

  return (
    <div>
      <Card classes={ {root: classes.root} }>
        <CardMedia
          classes={ {root: classes.media} }
          component={ Player }
          url={video.url}
          autoplay
      />
      </Card>
    </div>
  );
}

VideoCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoCard);