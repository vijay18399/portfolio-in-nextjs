import React from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { Audio as AudioIcon } from 'react-loader-spinner';
import { ButtonToListen } from './StyledComponents';

const AudioButton = ({ handleAudioPlay, isAudioPlaying }) => (
  <ButtonToListen onClick={handleAudioPlay} disabled={isAudioPlaying}>
    {isAudioPlaying ? 
      <AudioIcon height="20" width="20" color="#ffffff" ariaLabel="audio-loading" />
    : 
      <FaVolumeUp />
    }
  </ButtonToListen>
);

export default AudioButton;
