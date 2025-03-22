import React, {useState,useEffect  } from 'react';
import styled from 'styled-components';
import { StyledContainer, StyledCard, StartButton } from './StyledComponents';
import { CheckCircle, XCircle, Star, Smile, Frown, SkipForward } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Confetti from 'react-confetti';
export default function GameOver({ handleReStartGame }) {
  const { words } = useSelector((state) => state.word);
  const [showConfetti, setShowConfetti] = useState(false);
  // Filter the correct and incorrect answers based on the 'isCorrect' property
  const correctAnswers = words.filter((word) => word.isCorrect);
  const incorrectAnswers = words.filter((word) => !word.isCorrect);

  const totalQuestions = correctAnswers.length + incorrectAnswers.length;
  const scorePercentage = (correctAnswers.length / totalQuestions) * 100;
  useEffect(() => {
    if (scorePercentage >= 50) {
      setShowConfetti(true);
    }
  }, [scorePercentage]); 
  const getProgressColor = (percentage) => {
    if (percentage >= 80) return '#43A047'; // Green
    if (percentage >= 50) return '#FF9800'; // Orange
    return '#D32F2F'; // Red
  };

  const getFeedback = (percentage) => {
    if (percentage >= 80) return { icon: <Star color="#43A047" />, text: 'Excellent! You did great!' };
    if (percentage >= 50) return { icon: <Smile color="#FF9800" />, text: 'Good Job! Keep it up!' };
    return { icon: <Frown color="#D32F2F" />, text: `Keep Practicing! You'll get better!` };
  };

  const feedback = getFeedback(scorePercentage);

  return (
    <StyledContainer>
      <StyledCard>
        <ScoreBoard>
          <FeedbackText>{feedback.icon} {feedback.text}</FeedbackText>
          <ProgressWrapper>
            <CircularProgressbar
             
              value={scorePercentage}
              text={`${correctAnswers.length}/${totalQuestions}`}
              styles={buildStyles({
                textColor: '#333',
                pathTransitionDuration: 0.15,
                pathColor: getProgressColor(scorePercentage),
                trailColor: '#E0E0E0',
                textSize: '16px'
              })}
            />
          </ProgressWrapper>
        </ScoreBoard>

        <SectionContainer>
          {correctAnswers.length > 0 && (
            <Section>
              <SectionHeader><CheckCircle color="#43A047" /> Correct </SectionHeader>
              <AnswerList>
                {correctAnswers.map((word, index) => (
                  <CorrectAnswer key={index}>{word.word}</CorrectAnswer>
                ))}
              </AnswerList>
            </Section>
          )}

          {incorrectAnswers.length > 0 && (
            <Section>
              <SectionHeader><XCircle color="#D32F2F" /> Incorrect </SectionHeader>
              <AnswerList>
                {incorrectAnswers.map((item, index) => (
                  <AnswerItem key={index}>
                    <IncorrectAnswer>{item.word}</IncorrectAnswer>
                    {item.isSkipped && (
                      <SkippedText><SkipForward size={14} /> Skipped</SkippedText>
                    )}
                  </AnswerItem>
                ))}
              </AnswerList>
            </Section>
          )}
        </SectionContainer>
       
        <StartButton onClick={handleReStartGame} aria-label="Restart the Game">Play Again</StartButton>
      </StyledCard>
    </StyledContainer>
  );
}

// Styled Components
const ScoreBoard = styled.div`
  color: #333;
  border-radius: 12px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  gap: 10px;
`;

const ProgressWrapper = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 20px;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  justify-content: space-around;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Section = styled.section`
  flex: 1;
  min-width: 280px;
`;

const SectionHeader = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 2px solid #d9d4d4;
  margin-bottom: 18px;
`;

const AnswerList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AnswerItem = styled.li`
  display: flex;
  align-items: center;
`;

const CorrectAnswer = styled.span`
  background-color: #C8E6C9;
  color: #1B5E20;
  border: 1px solid;
  padding: 4px 8px;
  border-radius: 8px;
`;

const IncorrectAnswer = styled.span`
  background-color: #FFEBEE;
  color: #D32F2F;
  border: 1px solid;
  padding: 4px 8px;
  border-radius: 8px;
`;

const FeedbackText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 2px 9px;
  border-radius: 10px;
  color: rgb(0, 0, 0);
`;

const SkippedText = styled.span`
  margin-left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: rgb(236, 35, 35);
  font-size: 0.9rem;
`;
