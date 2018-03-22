import React from 'react'
import YouTube from 'react-youtube'

const Player = props => {
    const opts = {
        height: 300,
        width: '40%',
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