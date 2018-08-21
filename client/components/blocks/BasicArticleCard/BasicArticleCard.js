import React from 'react'

import mainStyles from './BasicArticleCard.css';


export default class BasicArticleCard extends React.Component {
  render() {

    const { image, title, resourceName } = this.props;

    return (
      <div
        className='basicArticleCardWrapper'
        style={{ backgroundImage: `url(${image ? image : null})` }}
      >
        <h2 className='title'>{title}</h2>
        <p className='resourceName'> via {resourceName}</p>
      </div>
    )
  }
}