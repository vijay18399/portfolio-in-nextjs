'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LevelSelection from '@/components/spell-bee/LevelSelector';
import GameBoard from '@/components/spell-bee/SpellBeeGame';
import GameOver from '@/components/spell-bee/Feedback';
import { useSelector, useDispatch } from 'react-redux'; 
import { setLoading, setWords, increment, resetGame, updateWordStatus } from '@/features/page/wordSlice';

export default function SpellBee() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { words, currentWordIndex, loading } = useSelector((state) => state.word);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  const handleCardClick = (level) => setSelectedLevel(level);
  const handleStartGame = () => router.push(`/portfolio/spell-bee?level=${selectedLevel}`).catch(() => alert('Navigation failed'));

  const colors = {
    A1: 'linear-gradient(45deg, #E53935, #8E24AA)',
    A2: 'linear-gradient(60deg, #FF7043, #009688)',
    B1: 'linear-gradient(120deg, #43A047, #2196F3)',
    B2: 'linear-gradient(150deg, #8E24AA, #FFEB3B)',
    C1: 'linear-gradient(to right, #3ca55c, #b5ac49)',
    C2: 'linear-gradient(90deg, #009688, #795548)',
  };

  const cefrLevels = [
    { level: 'A1', description: 'Beginner' },
    { level: 'A2', description: 'Elementary' },
    { level: 'B1', description: 'Intermediate' },
    { level: 'B2', description: 'Upper-Intermediate' },
    { level: 'C1', description: 'Advanced' }
  ];

  useEffect(() => {
    if (router.query.level) {
      fetchWords(router.query.level);
    }
  }, [router.query.level]);

  const endGame = () => {
    router.push(`/portfolio/spell-bee`);
  };

  const handleInputChange = (index, value) => {
    if (/^[a-zA-Z]?$/.test(value)) {
      const newInput = [...userInput];
      newInput[index] = value;
      setUserInput(newInput);
      if (value && index < userInput.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const playConfettiSound = () => {
    const sound = new Audio('/sounds/success.mp3');
    sound.play();
  };

  const handleReStartGame = () => {
    setIsGameOver(false);
    dispatch(resetGame()); 
    setTotalTime(0);
    setStartTime(Date.now());
    fetchWords(router.query.level);
  };

  const handleSubmit = () => {
    const correctWord = words[currentWordIndex]?.word;
    const userAnswer = userInput.join('');
    const isAnswerCorrect = userAnswer.toLowerCase() === correctWord.toLowerCase();

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    setTotalTime((prev) => prev + timeTaken);
    setStartTime(endTime);

    dispatch(updateWordStatus({ index: currentWordIndex, isCorrect: isAnswerCorrect, userAnswer }));
    if (isAnswerCorrect && currentWordIndex === words.length - 1) {
      setIsGameOver(true);
    }
    if (isAnswerCorrect) playConfettiSound();
  };

  const handleNextQuestion = () => {
    dispatch(increment()); 
    setUserInput(new Array(words[currentWordIndex + 1]?.word.length).fill(''));
    if (currentWordIndex === words.length - 1) {
      setIsGameOver(true);
    }
  };

  const handleSkipQuestion = () => {
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000;
    setTotalTime((prev) => prev + timeTaken);
    setStartTime(endTime);

    dispatch(updateWordStatus({ index: currentWordIndex, isCorrect: false, isSkipped: true }));
  };

  const fetchWords = async (level) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`https://dictionaryapp-44vf.onrender.com/cefr-words?levels=${level}&limit=4`);
      const data = await response.json();
      dispatch(setWords(data.words || []));
      setUserInput(new Array(data.words[0]?.word.length).fill(''));
      setStartTime(Date.now());
    } catch (error) {
      console.error('Error fetching words:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return router.query.level
    ? isGameOver 
      ? <GameOver  totalTime={ Math.round(totalTime) } handleReStartGame={handleReStartGame} />
      : <GameBoard {...{
          isGameOver,
          userInput,
          currentWordIndex,
          isAudioPlaying,
          handleStartGame,
          handleInputChange,
          handleSubmit,
          handleNextQuestion,
          handleSkipQuestion,
          attempts,
          endGame
        }} />
    : <LevelSelection {...{ cefrLevels, colors, selectedLevel, handleCardClick, handleStartGame }} />;
}


