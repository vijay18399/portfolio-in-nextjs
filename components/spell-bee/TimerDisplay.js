import React from 'react';
import { Watch } from 'react-loader-spinner';
import { TimerText } from '../common/StyledComponents';

const TimerDisplay = ({ timer }) => (
  <TimerText>
    {`${Math.floor(timer / 60)}:${timer % 60}`} 
    <Watch height="20" width="20" radius="48" color="#E65100" />
  </TimerText>
);

export default TimerDisplay;
