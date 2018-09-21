import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import { Loading } from '../shared/Loading';

const ArticleiFrame = ({ url, title }) => {
  if (url.length === 0) return <Loading />;
  return (
    <iframe
      title={title}
      src={url}
      className="iframe_news"
    />
  );
};

const mapStateToProps = store => ({
  url: store.dataContent.url,
  title: store.dataContent.title
});

export const ArticleiFrameConnect = connect(mapStateToProps, null)(ArticleiFrame);

ArticleiFrame.propTypes = {
  url: string.isRequired,
  title: string.isRequired
};
