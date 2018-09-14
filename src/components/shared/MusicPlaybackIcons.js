import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export const PlayIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M8 5v14l11-7z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
  );
}

export const PlayCircledIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </SvgIcon>
  );
}

export const PauseIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
  );
}

export const PauseCircledIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-4h2V8h-2v8z"/>
    </SvgIcon>
  );
}

export const PrevMediaActionIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
  );
}

export const NextMediaActionIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </SvgIcon>
  );
}


export const RepeatMediaIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/>
    </SvgIcon>
  );
}

export const ShuffleMediaIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M0 0h24v24H0z" fill="none"/>
      <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
    </SvgIcon>
  );
}
