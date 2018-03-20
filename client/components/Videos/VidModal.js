import React from 'react'
import { Modal, Button } from 'react-materialize'
import YouTube from 'react-youtube'

const VidModal = props => {
    const opts = {
        height: '100%',
        width: '100%',
      }
    return (
        <Modal
            style= {{width: '75%', height: '75%'}}
            header= {props.title}
            trigger={<a> {props.title} </a>}>
            <div>
                <YouTube
                    videoId= {props.url}
                    // opts={opts}
                    // onReady={this._onReady}
                />
            </div>
        </Modal>
    )
}

export default VidModal