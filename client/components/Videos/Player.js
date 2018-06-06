import React from 'react'
import YouTube from 'react-youtube'

const Player = props => {
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: { // https://developers.google.com/youtube/player_parameters
            autoplay: 1
        }
    }
    return (
        <YouTube
            videoId={props.url}
            opts={opts}
        // onReady={this._onReady}
        />
    )
}

export default Player