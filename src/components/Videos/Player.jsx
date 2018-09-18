import React from 'react';
import YouTube from 'react-youtube';
import { string } from 'prop-types';

export const Player = ({ url }) => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    }
  };
  return (
    <YouTube
      videoId={url}
      opts={opts}
    />
  );
};

Player.propTypes = {
  url: string.isRequired
};
