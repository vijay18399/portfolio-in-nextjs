import React from 'react';
import styles from '@/styles/dulingo.module.css';

const LevelSelection = ({ selectedLevel, handleCardClick, handleStartGame, cefrLevels, colors }) => (
  <div className={styles.container}>
    <div className={styles.card}>
      <div className={styles.header}>
          <h1 className={styles.title}>What would you like to Practice?</h1>
          <img 
            width={65} 
            height={65} 
            src='/portfolio-in-nextjs/images/portfolio/spell-bee/bee.svg' 
            alt="Spelling Bee" 
            className={styles.beeIcon}
          />
      </div>
  
      <div className={styles.levels}>
        {cefrLevels?.map(({ level, description }) => (
          <div
            key={level}
            className={`${styles.level} ${selectedLevel === level ? styles.selected : ''}`}
            role="button"
            aria-label={`Select level ${level}`}
            onClick={() => handleCardClick(level)}
            tabIndex={0}
            title={description}
          >
            {level} - {description}
          </div>
        ))}
      </div>
 
    </div>
    <button 
        className={`${styles.button} ${styles.btnGreen} `} 
        disabled={!selectedLevel} 
        onClick={handleStartGame}
      >
        Start Spelling Game
      </button>
  </div>
);

export default LevelSelection;