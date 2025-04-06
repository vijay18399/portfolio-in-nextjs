import React from 'react';
import styles from '@/styles/dulingo.module.css';
import clsx from 'clsx';

const Word = ({ text, spoken, sentenceState, speakText, highlight }) => {
  const getClassNames = () => {
    return clsx(styles.word, {
      [styles.recording]: sentenceState === 'RECORDING',
      [styles.success]: sentenceState === 'SUCCESS',
      [styles.fail]: sentenceState === 'FAIL',
      [styles.spoken]: spoken,
      [styles.highlight]: highlight && sentenceState === 'RECORDING',
    });
  };

  return (
    <li style={{ background: sentenceState === 'FAIL' ? '#FAFAFA' : '' }} className={getClassNames()} onClick={() => speakText(text)}>
      {text}
    </li>
  );
};

export default Word;
