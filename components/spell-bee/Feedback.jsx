import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Confetti from 'react-confetti';
import { Bolt, Clock, CheckCircle } from 'lucide-react';
import styles from "@/styles/dulingo.module.css";

export default function Feedback({ handleReStartGame, totalTime }) {
  const { words } = useSelector((state) => state.word);
  const [showConfetti, setShowConfetti] = useState(false);

  const correctAnswers = words.filter((word) => word.isCorrect);
  const totalQuestions = words.length;
  const scorePercentage = Math.round((correctAnswers.length / totalQuestions) * 100);
  const earnedXP = correctAnswers.length * 1;

  useEffect(() => {
    if (scorePercentage >= 70) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [scorePercentage]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getHeadline = () => {
    if (scorePercentage === 100) return 'Perfect lesson!';
    if (scorePercentage >= 80) return 'Great job!';
    if (scorePercentage >= 50) return 'Nice work!';
    return 'Keep practicing!';
  };

  const getSubtitle = () => {
    if (scorePercentage === 100) return 'You made no mistakes in this lesson';
    if (scorePercentage >= 50) return 'You’re improving! Keep going.';
    return 'Practice makes perfect. Try again!';
  };

  return (
    <div className={styles.gameOverUi}>
       <div   className={styles.gameOverInfo} >
       <h2 className={styles.headline}>{getHeadline()}</h2>
      <p className={styles.subtitle}>{getSubtitle()}</p>

      <div className={styles.statsContainer}>
        <div className={`${styles.statCard} ${styles.yellow}`}>
         
          <span className={styles.label}>XP</span>
          <div className={`${styles.statDiv} ${styles.yellowText}`}>
               <Bolt size={24} />
               <span className={styles.value}>{earnedXP}</span>
           </div>
       
        </div>
        <div className={`${styles.statCard} ${styles.blue}`}>
       
          <span className={styles.label}>Committed</span>
          <div className={`${styles.statDiv} ${styles.blueText}`}>
              <Clock size={24} />
              <span className={styles.value}>{totalTime ? formatTime(totalTime) : '—'}</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.green}`}>
         
          <span className={styles.label}>Accuracy</span>
          <div className={`${styles.statDiv} ${styles.greenText}`}>
              <CheckCircle size={24} />
              <span className={styles.value}>{scorePercentage}%</span>
          </div>
       
        </div>
      </div>
       </div>


      <button className={`${styles.button}  ${styles.btnBlue}`} onClick={handleReStartGame}>
        {scorePercentage >= 70 ? 'CONTINUE' : 'TRY AGAIN'}
      </button>
    </div>
  );
}
