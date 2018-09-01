import React from 'react'
import { map } from 'lodash';

import Paper from '@material-ui/core/Paper';
import { PlayIcon, PauseIcon } from '../../shared/SocialIcons'

import mainStyles from './TopTracksChart.css';

export default class TopTracksChart extends React.Component {
  render() {
    const { tracks, playing, onPlayPause } = this.props;

    return (
      <div className='topTracksChartWrapper'>
        <Paper className='topTracksChartPaper'>
          <h4 className='title'>TOP TRACKS CHART</h4>

          <div className='tracksList'>

            {map(tracks, (track, key) => {
              const isPlaying = playing === track.id;

              return (
                <div
                  key={key}
                  className={`track ${isPlaying ? 'isActive' : null}`}
                  onClick={this.onPlayPause.bind(this, track.id, !isPlaying)}
                >
                    <div className='number'>{key + 1}</div>
                    <div className='sound'>
                      <div className='soundName'>{track.title}</div>
                      <div className='artist'>by {track.artist}</div>
                    </div>
                    <div className='playerAction'>
                      {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </div>
                </div>
              );
            })}

          </div>
        </Paper>
      </div>
    )
  }

  onPlayPause = (id, play) => {
    this.props.onPlayPause(id, play);
  }
}