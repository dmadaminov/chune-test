import React, { Component } from 'react';
import { find, findIndex, random, isEqual } from 'lodash';
import { Player, ControlBar, VolumeMenuButton } from 'video-react';
import Grid from '@material-ui/core/Grid';

import {
  PlayCircledIcon, PauseCircledIcon, PrevMediaActionIcon,
  NextMediaActionIcon, RepeatMediaIcon, ShuffleMediaIcon,
} from '../../shared/MusicPlaybackIcons';
import { CloseIcon } from '../../shared/InteractionIcons';
import './LargeAudioPlayer.css';

export default class LargeAudioPlayer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedRecordId: props.selectedRecordId || null,
      playlist: this.props.playlist,
      shuffling: false,
      isOpen: props.selectedRecordId ? true : false,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRecordId !== this.props.selectedRecordId || !isEqual(nextProps.playlist, this.props.playlist)) {
      this.setState({
        selectedRecordId: nextProps.selectedRecordId,
        playlist: nextProps.playlist,
        isOpen: true,
      });
    }

    // Handle open/close from outside
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  componentDidMount() {
    // subscribe state change
    if (this.refs.player) {
      this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.refs.player) {
      this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }
    if (this.state.selectedRecordId != prevState.selectedRecordId) {
      this.refs.player.load();
      this.refs.player.play();
    }
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });

    if (state.ended) {
      this.handleNext();
    }
  }

  play() {
    this.refs.player.play();
  }

  pause() {
    this.refs.player.pause();
  }


  handleRepeat = () => {
    this.refs.player.load();
    this.refs.player.play();
  };

  handlePrev = () => {
    const { playlist, selectedRecordId, shuffling } = this.state;
    const playSupplyIndex = findIndex(playlist, (o) => (o.id === selectedRecordId) );
    let prevRecord;

    if (shuffling) {
      const range = playlist.length;
      const index = random(0, playlist.length - 1);
      prevRecord = playlist[index];
    } else if (playSupplyIndex === 0) {
      // get last
      prevRecord = playlist[playlist.length - 1];
    } else {
      // get prev
      prevRecord = playlist[playSupplyIndex - 1];
    }
    this.setState({
      selectedRecordId: prevRecord.id,
    });
  };

  handleNext = () => {
    const { playlist, selectedRecordId, shuffling } = this.state;
    const playSupplyIndex = findIndex(playlist, (o) => (o.id === selectedRecordId) );
    let nextRecord;
    if (shuffling) {
      const range = playlist.length;
      const index = random(0, playlist.length - 1);
      nextRecord = playlist[index];
    } else if (!playlist) {
      return null;
    } else if (playSupplyIndex === playlist.length - 1) {
      // get first
      nextRecord = playlist[0];
    } else {
      // get next
      nextRecord = playlist[playSupplyIndex + 1];
    }
    this.setState({
      selectedRecordId: nextRecord.id,
    });
  };

  handleShuffle = () => {
    this.setState({ shuffling: !this.state.shuffling });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { selectedRecordId, playlist, shuffling, isOpen } = this.state;
    const { playPause } = this.props;
    console.log(playPause, 'playMusic');
    let paused = true;
    let progress = 0;
    if (this.refs.player) {
      const playerState = this.refs.player.getState();
      paused = playerState.player.paused;
      progress = (playerState.player.currentTime / playerState.player.duration) * 100;
      console.log(paused, 'paused');
    }

    let currentlyPlaying;
    if (selectedRecordId) {
      currentlyPlaying = find(playlist, (o) => (o.id === selectedRecordId) );
    } else if (!this.state.playlist){
      currentlyPlaying = false;
    } else { 
      currentlyPlaying = this.state.playlist[0];
    }
    return (
      isOpen ? (
        <div className='largeAudioPlayerWrapper'>
          <CloseIcon
            className='closeIcon'
            onClick={this.handleClose}
          />
          <Player
            ref="player"
            autoPlay={(currentlyPlaying && currentlyPlaying.url) ? true : false}
            src={currentlyPlaying ? currentlyPlaying.url : ''}
          >
            <ControlBar autoHide={false} disableDefaultControls={true}>
              <div className='controlBar'>
                <Grid container spacing={24} className='gridContainer'>
                  <Grid item xs={12} md={4} lg={4} className='artistInfo'>
                    <div className='artistInfo'>
                      <img src={currentlyPlaying.image} />
                      <div className='infoWrapper'>
                        <div className='label'>{currentlyPlaying.title}</div>
                        <div className='artist'>{currentlyPlaying.artist}</div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4} className='mainControls'>
                    <ShuffleMediaIcon
                      className='icon shuffleIcon'
                      className={`icon shuffleIcon ${shuffling ? 'active' : null}`}
                      onClick={this.handleShuffle}
                    />
                    <PrevMediaActionIcon
                      className='icon prevIcon'
                      onClick={this.handlePrev}
                    />

                    {paused ? (
                      <PlayCircledIcon
                        className='icon playIcon'
                        onClick={this.play}
                      />
                    ) : (
                      <PauseCircledIcon
                        className='icon pauseIcon'
                        onClick={this.pause}
                      />
                    )}
                    <NextMediaActionIcon
                      className='icon nextIcon'
                      onClick={this.handleNext}
                    />
                    <RepeatMediaIcon
                      className='icon repeatIcon'
                      onClick={this.handleRepeat}
                    />
                    <div className='progressBar'>
                      <div
                        style={{ width: `${progress}%`}}
                        className='progressBarPercentage'
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4} className='volumeControl' />
                </Grid>
              </div>

              <VolumeMenuButton alwaysShowVolume />
            </ControlBar>
          </Player>
        </div>
      ) : (
        <noscript />
      )
    );
  }
}

/*
const { player } = this.refs.player.getState();
console.log(player.currentTime);
*/