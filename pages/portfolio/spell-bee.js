'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LevelSelection from '@/pages/components/spell-bee/LevelSelection';
import GameBoard from '@/pages/components/spell-bee/GameBoard';
import GameOver from '@/pages/components/spell-bee/GameOver';
import { useSelector, useDispatch } from 'react-redux'; 

import { setLoading, setWords, increment, resetGame,updateWordStatus  } from '@/features/page/wordSlice';

export default function SpellBee() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { words, currentWordIndex, loading } = useSelector((state) => state.word);

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [timer, setTimer] = useState(600);
  const [isGameOver, setIsGameOver] = useState(false);

  const [attempts, setAttempts] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

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

  useEffect(() => {
    if (timer === 0) {
      setIsGameOver(true);
    }
  }, [timer]);

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

  const handleAudioPlay = () => {
    if (words[currentWordIndex]?.voice) {
      setIsAudioPlaying(true);
      const audio = new Audio(words[currentWordIndex].voice);
      audio.play();
      audio.onended = () => {
        setIsAudioPlaying(false);
      };
    }
  };

  const playConfettiSound = () => {
    const sound = new Audio('/sounds/success.mp3');
    sound.play();
  };

  const handleReStartGame = () => {
    setIsGameOver(false);
    dispatch(resetGame()); 
    fetchWords(router.query.level);
    setTimer(600);
  };

  const handleSubmit = () => {
    const correctWord = words[currentWordIndex]?.word;
    const userAnswer = userInput.join('');
    const isAnswerCorrect = userAnswer.toLowerCase() === correctWord.toLowerCase();
    dispatch(updateWordStatus({ index: currentWordIndex, isCorrect: isAnswerCorrect }));
    if (isAnswerCorrect) {
      playConfettiSound();
      if (currentWordIndex === words.length - 1) {
        setIsGameOver(true);
      }
    }
  };

  const handleNextQuestion = () => {
    dispatch(increment()); 
    setUserInput(new Array(words[currentWordIndex + 1]?.word.length).fill(''));
    if (currentWordIndex === words.length - 1) {
      setIsGameOver(true);
    }
  };

  const handleSkipQuestion = () => {
    dispatch(updateWordStatus({ index: currentWordIndex, isCorrect: false, isSkipped : true }));
    handleNextQuestion();
  };

  const countdownTimer = () => {
    setTimeout(() => {
      if (timer > 0 && !isGameOver) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!isGameOver) {
      countdownTimer();
    }
  }, [timer, isGameOver]);

  const fetchWords = async (level) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`https://dictionaryapp-44vf.onrender.com/cefr-words?levels=${level}&limit=4`);
      const data = await response.json();
      dispatch(setWords(data.words || []));
      setUserInput(new Array(data.words[0]?.word.length).fill(''));
      setTimer(600);
    } catch (error) {
      console.error('Error fetching words:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return router.query.level
    ? isGameOver ? <GameOver {...{ handleReStartGame }} /> : <GameBoard {...{
        isGameOver,
        userInput,
        currentWordIndex,
        isAudioPlaying,
        timer,
        handleStartGame,
        handleAudioPlay,
        handleInputChange,
        handleSubmit,
        handleNextQuestion,
        handleSkipQuestion,
        attempts
      }} />
    : <LevelSelection {...{ cefrLevels, colors, selectedLevel, handleCardClick, handleStartGame }} />;
}
