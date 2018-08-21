import React from 'react'
import { withStyles } from '@material-ui/core/styles';

import Navbar from './Navbar'
import Paper from '@material-ui/core/Paper';

import BasicArticleCard from './blocks/BasicArticleCard/BasicArticleCard';

import mainStyles from './Home.css';

export default class Home extends React.Component {
  render() {

    return (
      <div>
        <Navbar value={0} />

        <div className='homePageWrapper'>
          <BasicArticleCard
            image='https://www.billboard.com/files/styles/article_main_image/public/media/shakira-june-2018-billboard-1548.jpg'
            title='Smino Brings Out T-Pain For Epic "Chopped N Skrewed" Performance In Atlanta'
            resourceName='via hotnewhiphop'
          />
        </div>

      </div>
    )
  }
}