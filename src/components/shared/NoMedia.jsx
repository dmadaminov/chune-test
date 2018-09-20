import React from 'react';
import { objectOf, any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import NoMediaPNG from '../../../assets/images/no-media.svg';

const styles = () => ({
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
    margin: '0px auto',
    width: 78,
    height: 42,
    marginBottom: 29,
  },
  description: {
    width: 412,
    height: 48,
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.6,
    letterSpacing: 0.3,
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.5)',
    '@media (max-width: 1023px)': {
      width: 344,
      margin: '0px auto',
    }
  },
});

const NoMedia = ({ classes }) => (
  <div className={classes.root}>
    <img src={NoMediaPNG} className={classes.musicTune} title="NoMedia" alt="NoMedia" />
    <div className={classes.description}>
      <p>
        There&#8217;s no requested media for this artist.
      </p>
      <br />
      <p>
        Choose something else or simply browse through all media.
      </p>
    </div>
  </div>
);

export const NoMediaConnect = withStyles(styles)(NoMedia);

NoMedia.propTypes = {
  classes: objectOf(any).isRequired
};
