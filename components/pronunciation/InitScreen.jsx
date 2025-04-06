import React from 'react';
import styles from '@/styles/dulingo.module.css'; // Update path if needed

export default function InitScreen({ onStart }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Listen, Speak & Loop</h2>
        <p className={styles.description}>Practice Pronunciation</p>
      </div>
      <button className={`${styles.button} ${styles.btnGreen}`} onClick={onStart}>
          Start Practice
        </button>
    </div>
  );
}
