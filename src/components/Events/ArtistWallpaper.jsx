import React from 'react';
import { objectOf, any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = () => ({
  root: {
    width: 716,
    height: 278,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderRadius: 0,
    boxShadow: 'none',
    '@media (max-width: 1023px)': {
      width: '100vw',
      height: 278,
    }
  },
  artistName: {
    paddingLeft: 16,
    margin: '0px 0px 24px 0px',
    width: 675,
    height: 40,
    fontFamily: 'Roboto',
    fontSize: 34,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 'normal',
    letterSpacing: 0.3,
    color: '#ffffff',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },
  genre: {
    paddingLeft: 16,
    margin: '0px 0px 6px 0px',
    width: 675,
    height: 20,
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.43,
    letterSpacing: 0.3,
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    '@media (max-width: 1023px)': {
      width: '100vw',
    }
  },
});

const ArtistWallpaper = (props) => {
  const { classes, artist } = props;

  const overrideBgStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5)), url(${artist.image_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center left',
    backgroundRepeat: 'no-repeat',
  };
  let genre = 'POP';
  if (artist.genres[0] !== undefined) genre = artist.genres[0].description;
  return (
    <Paper className={classes.root} style={overrideBgStyle}>
      <div className={classes.genre}>
        {genre}
      </div>
      <div>
        <h3 className={classes.artistName}>{artist.name}</h3>
      </div>
    </Paper>
  );
};

ArtistWallpaper.propTypes = {
  classes: objectOf(any).isRequired,
  artist: objectOf(any).isRequired,
};

export const ArtistWallpaperConnect = withStyles(styles)(ArtistWallpaper);
