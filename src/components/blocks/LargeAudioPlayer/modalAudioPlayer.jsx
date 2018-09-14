import React from 'react';
import ReactDOM from 'react-dom';

import LargeAudioPlayer from './LargeAudioPlayer';

const domNode = document.createElement('div');
const modalRoot = document.getElementById('app');

class ModalBlock extends React.Component {
  componentDidMount() {
    modalRoot.appendChild(domNode);
  }

  componentWillUnmount() {
    modalRoot.removeChild(domNode);
  }

  render() {
    const {
      playlist,
      selectedRecordId
    } = this.props;
    return ReactDOM.createPortal(
      <LargeAudioPlayer
        playlist = {playlist}
        selectedRecordId = {selectedRecordId}
      />,
      domNode
    );
  }
}

export const ModalBlockConnect = ModalBlock;
