import Sentence from '@/components/pronunciation/Sentence';
import React, { useState, useEffect } from 'react';
import InitScreen from '@/components/pronunciation/InitScreen';
import fs from 'fs';
import path from 'path';
import styles from '@/styles/dulingo.module.css'; // Adjust the path as needed

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'pronunciation.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  return { props: { data } };
}

export default function Pronunciation({ data }) {
  const [initScreen, setInitScreen] = useState(true);
  const [sentence, setSentence] = useState(null);
  const [sentences, setSentences] = useState(
    data?.map((s) => ({ isDone: false, text: s }))
  );
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    setSentence(sentences[trackIndex]);
  }, [trackIndex, sentences]);

  const onSuccess = () => {
    const updatedSentences = [...sentences];
    updatedSentences[trackIndex].isDone = true;
    setSentences(updatedSentences);
  };

  const resetSentences = () => {
    const resettedSentences = sentences.map((sentence) => ({
      ...sentence,
      isDone: false,
    }));
    setSentences(resettedSentences);
    setTrackIndex(0);
    setSentence(resettedSentences[0]);
  };

  const onNext = () => {
    const updatedSentences = [...sentences];
    if (updatedSentences.every((sentence) => sentence.isDone)) {
      resetSentences();
    } else {
      const nextIndex = (trackIndex + 1) % sentences.length;
      setTrackIndex(nextIndex);
    }
  };

  const onStart = () => {
    setInitScreen(false);
  };

  return (
    <>
      {initScreen && <InitScreen onStart={onStart} />}
      {!initScreen && (
        <>
          <div className={styles.container}>
            {sentence && <Sentence onSuccess={onSuccess} sentence={sentence.text} />}
            {sentence?.isDone && (
              <button
                className={`${styles.button} ${styles.btnGreen}`}
                onClick={onNext}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}
