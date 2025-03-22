import React from 'react';
import { StyledContainer, StyledCard, StyledTitle, LevelsContainer, StyledLevelCard, StartButton } from './StyledComponents';

const LevelSelection = ({ selectedLevel, handleCardClick, handleStartGame, cefrLevels, colors }) => (
  <StyledContainer>
    <StyledCard>
      <StyledTitle>Choose Your Level</StyledTitle>
      <LevelsContainer>
        {cefrLevels?.map(({ level, description }) => (
          <StyledLevelCard
            key={level}
            role="button"
            aria-label={`Select level ${level}`}
            selected={selectedLevel === level}
            background={selectedLevel === level ? colors[level] : 'var(--bg-card)'}
            onClick={() => handleCardClick(level)}
            tabIndex={0}
            title={description}
          >
            {level} - {description}
          </StyledLevelCard>
        ))}
      </LevelsContainer>
      <StartButton disabled={!selectedLevel} onClick={handleStartGame}>
        Start Spelling Game
      </StartButton>
    </StyledCard>
  </StyledContainer>
);

export default LevelSelection;
