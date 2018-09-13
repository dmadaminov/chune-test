import React from 'react'
import { map } from 'lodash';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { PlayIcon, PauseIcon } from '../../shared/SocialIcons'

import mainStyles from './ChuneSupply.css';

export default class ChuneSupply extends React.Component {
  render() {
    const { supplies, playingSupply, onPlayPauseSupply } = this.props;

    return (
      <div className='chuneSupplyWrapper'>
        <Paper className='chuneSupplyPaper'>
          <h4 className='title'>CHUNE SUPPLY</h4>
          <p className='subtitle'>Updated every Wednesday, CHUNE SUPPLY is weekly supplying you with weekly fire.</p>

          <div className='tracksList'>
            {map(supplies, (supply) => {
              const isPlaying = playingSupply === supply.id;

              return (
                <Card
                  className='card'
                  onClick={this.onPlayPauseSupply.bind(this, supply.id, !isPlaying)}
                  key={supply.id}
                >
                  <CardMedia
                    className='cover'
                    image={supply.image}
                    title={supply.title}
                  />


                  <div className='details'>
                    <CardContent className='content'>
                      <Typography
                        variant='headline'
                        className='headline'
                      >
                        {supply.title}
                      </Typography>
                      <Typography
                        className='subheading'
                        variant='subheading'
                        color='textSecondary'
                      >
                        {supply.artist}
                      </Typography>
                    </CardContent>
                  </div>
                </Card>
              )
            })}

          </div>
        </Paper>
      </div>
    )
  }

  onPlayPauseSupply = (id, play) => {
    this.props.onPlayPauseSupply(id, play);
  };
}