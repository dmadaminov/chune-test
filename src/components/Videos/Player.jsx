import React from 'react';
import { string } from 'prop-types';

export const Player = ({ url, title }) => (
  <iframe
    title={title}
    width="100%"
    height="100%"
    id="ytplayer"
    type="text/html"
    src={`//www.youtube.com/embed/${url}`}
    frameBorder="0"
    allowFullScreen="1"
  />
);

Player.propTypes = {
  url: string.isRequired,
  title: string.isRequired
};
