import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import NoMediaPNG from '../../../assets/images/no-media.svg';

const styles = theme => ({
  root: {
    width: 412,
    margin: '178px auto',
    display: 'flex',
    flexDirection: 'column',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },
  musicTune: {
    margin: "0px auto",
    width: 78,
    height: 42,
    marginBottom: 29,
  },
  description: {
    width: 412,
    height: 48,
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "normal",
    fontStyle: "normal",
    fontStretch: "normal",
    lineHeight: 1.6,
    letterSpacing: 0.3,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.5)",
    '@media (max-width: 1023px)': {
      width: 344,
      margin: '0px auto',
    }
  },
})

const NoMedia = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <img src={NoMediaPNG} className={classes.musicTune} title="NoMedia" alt="NoMedia" />
      <div className={classes.description}>
        { "There's no requested media for this artist." }
        <br/> 
        {"Choose something else or simply browse through all media."}
      </div>
    </div>
  );
}

export default withStyles(styles)(NoMedia);
