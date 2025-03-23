import React from 'react';
import { StyledContainer, StyledDescription, StyledCard, StyledTitle, StartButton } from '../common/StyledComponents';

export default function InitScreen({ onStart }) {
  return (
    <StyledContainer>
      <StyledCard>
        <StyledTitle>
          Listen, Speak & Loop
        </StyledTitle>
        <StyledDescription>
          Practice Pronunciation
        </StyledDescription>
        <StartButton onClick={onStart}>Start Practice</StartButton>
      </StyledCard>
    </StyledContainer>
  );
}
