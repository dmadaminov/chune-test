import React from 'react'

import mainStyles from './BasicArticleCard.css';


export default class BasicArticleCard extends React.Component {
  render() {

    const { image, title, source } = this.props;

    return (
      <div
        className='basicArticleCardWrapper'
        style={{ backgroundImage: `url(${image ? image : null})` }}
      >
        <h2 className='title'>{title}</h2>
        <p className='resourceName'> via {source}</p>
      </div>
    )
  }
}