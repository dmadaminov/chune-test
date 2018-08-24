import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';

import {
  PlayIcon, PauseIcon, PrevMediaActionIcon,
  NextMediaActionIcon,
} from '../../shared/SocialIcons'

import mainStyles from './BasicSoundPlayer.css';

export default class BasicSoundPlayer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      source: null,
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source !== this.props.source) {
      this.setState({ source: nextProps.source });
    }
  }

  componentDidMount() {
    // subscribe state change
    this.refs.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.source != prevState.source) {
      this.refs.player.load();
      this.refs.player.play();
    }
  }

  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state
    });
  }

  play() {
    this.refs.player.play();
  }

  pause() {
    this.refs.player.pause();
  }

  render() {
    let paused = true;
    let progress = 0;
    if (this.refs.player) {
      const playerState = this.refs.player.getState();
      paused = playerState.player.paused;
      progress = (playerState.player.currentTime / playerState.player.duration) * 100
    }

    return (
      <div className='basicSoundPlayerWrapper'>
        <img className='chuneSupplyImage' src='images/chune_supply.png' />
        <div className='progressBar'>
          <div style={{ width: `${progress}%`}} className='progressBarPercentage' />
        </div>

        <Player
          ref="player"
          autoplay
        >
          <source src={this.state.source} />
        </Player>


        <div className='controlBar'>
          {paused ? (
            <PlayIcon className='icon playIcon' onClick={this.play} />
          ) : (
            <PauseIcon className='icon pauseIcon' onClick={this.pause} />
          )}
          <PrevMediaActionIcon className='icon prevIcon' onClick={this.props.onPrev} />
          <NextMediaActionIcon className='icon nextIcon' onClick={this.props.onNext} />
        </div>
      </div>
    );
  }
}