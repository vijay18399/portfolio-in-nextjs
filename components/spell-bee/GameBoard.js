import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import AudioButton from './AudioButton';
import TimerDisplay from './TimerDisplay';
import { StyledCard, Header, QuestionTrack, Content, InputContainer, Input, Button, SkipButton } from '../common/StyledComponents';
import { StyledContainer } from '../common/StyledComponents';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@/features/page/wordSlice';

const GameBoard = ({
  isGameOver,
  userInput,
  isCorrect,
  isAudioPlaying,
  handleAudioPlay,
  handleInputChange,
  handleSubmit,
  handleNextQuestion,
  handleSkipQuestion,
  showConfetti,
  attempts,
  timer
}) => {
  const { words, loading, currentWordIndex } = useSelector((state) => state.word);
  const dispatch = useDispatch();
  const currentWord = words[currentWordIndex]
  if (loading) {
    return (
      <StyledContainer>
        <StyledCard>
          <Header>
            <Skeleton width={150} height={24} />
            <Skeleton width={100} height={24} />
          </Header>
          <Content>
            <Skeleton circle width={50} height={50} style={{ marginBottom: '20px' }} />
            <InputContainer>
              {[...Array(6)].map((_, index) => (
                <Skeleton key={index} width={40} height={40} />
              ))}
            </InputContainer>
            <Skeleton width={120} height={40} style={{ marginTop: '20px' }} />
          </Content>
        </StyledCard>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledCard>
        <Header>
          <QuestionTrack>
            Question {currentWordIndex + 1} / {words.length}
          </QuestionTrack>
          <TimerDisplay timer={timer} />
        </Header>
        <Content>
          <AudioButton handleAudioPlay={handleAudioPlay} isAudioPlaying={isAudioPlaying} />
       
          <InputContainer>
            {userInput.map((letter, index) => (
              <Input
                key={index}
                id={`input-${index}`}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e) => handleInputChange(index, e.target.value)}
                aria-label={`Letter ${index + 1} of the word`}
              />
            ))}
          </InputContainer>
 
          {words[currentWordIndex]?.isCorrect ? (
            <Button onClick={handleNextQuestion}>Next Question</Button>
          ) : (
            <>
              <Button onClick={handleSubmit}>Submit</Button>
              <SkipButton onClick={handleSkipQuestion}>Skip Question</SkipButton>
            </>
          )}
          {!words[currentWordIndex]?.isCorrect && attempts > 0 && <p>Incorrect! Attempts: {attempts}</p>}
        </Content>
      </StyledCard>
    </StyledContainer>
  );
};

export default GameBoard;
