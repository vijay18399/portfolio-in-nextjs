import React from "react";
import styles from "@/styles/dulingo.module.css";
import { Bolt, Clock, CheckCircle2 } from "lucide-react";

const Feedback = ({ attemptData }) => {
  const { wpm, completedIn, cwc } = attemptData;

  const getHeadline = () => {
    if (wpm > 100) return "Lightning Fast!";
    if (wpm > 60) return "Great Job!";
    if (wpm > 30) return "Keep Practicing!";
    return "You Can Do Better!";
  };

  const getSubtitle = () => {
    if (wpm > 100) return "You're a speaking pro. 🔥";
    if (wpm > 60) return "Impressive speed and accuracy!";
    if (wpm > 30) return "You're getting there. Keep going!";
    return "Try again and improve your score.";
  };

  return (
    <div className={styles.gameOverUi}>
      <div className={styles.gameOverInfo}>
        <h2 className={styles.headline}>{getHeadline()}</h2>
        <p className={styles.subtitle}>{getSubtitle()}</p>
        <div className={styles.statsContainer}>
          <div className={`${styles.statCard} ${styles.yellow}`}>
            <span className={styles.label}>WPM</span>
            <div className={`${styles.statDiv} ${styles.yellowText}`}>
              <Bolt size={20} />
              <span className={styles.value}>{wpm}</span>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.blue}`}>
            <span className={styles.label}>Seconds</span>
            <div className={`${styles.statDiv} ${styles.blueText}`}>
              <Clock size={20} />
              <span className={styles.value}>{completedIn}</span>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.green}`}>
            <span className={styles.label}>Correct</span>
            <div className={`${styles.statDiv} ${styles.greenText}`}>
              <CheckCircle2 size={20} />
              <span className={styles.value}>{cwc}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
