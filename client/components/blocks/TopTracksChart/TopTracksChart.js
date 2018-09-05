import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import Paper from '@material-ui/core/Paper';

import { PlayIcon, PauseIcon } from '../../shared/SocialIcons'

import './TopTracksChart.css';

class TopTracksChart extends React.Component {
  render() {
    const {
      tracks, playing, onPlayPause,
      trackStore
    } = this.props;
    return (
      <div className='topTracksChartWrapper'>
        <Paper className='topTracksChartPaper'>
          <h4 className='title'>TOP TRACKS CHART</h4>
          <div className='tracksList'>
            {map(tracks, (track, key) => {
              let isPlaying = false;
              if (playing === track.id || track.id === trackStore) isPlaying = true;
              return (
                <div
                  key={key}
                  className={`track ${isPlaying ? 'isActive' : null}`}
                  onClick={() => onPlayPause(track.id, !isPlaying)}
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
}

const mapStateToProps = store => ({
  trackStore: store.dataMusicPlayer.track
});

export const TopTracksChartConnect = connect(mapStateToProps)(TopTracksChart);