import React, { useState, useEffect } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { MdMic, MdStopCircle } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import Word from "./Word";
import Feedback from "./Feedback";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import styles from "@/styles/dulingo.module.css";

const Sentence = ({ sentence, onSuccess, attemptdata }) => {
  const {
    isListening,
    isSupported,
    transcript,
    startListening,
    stopListening,
    setTranscript,
  } = useSpeechRecognition();

  const [words, setWords] = useState(
    sentence.split(" ").map((word) => ({ text: word, spoken: false }))
  );
  const [currentWordIndex, setCurrentWordIndex] = useState(null);
  const [timeTracks, setTimeTracks] = useState([]);
  const [attemptData, setAttemptData] = useState(attemptdata);
  const [sentenceState, setSentenceState] = useState(
    attemptdata ? "SUCCESS" : "IDLE"
  );

  const playAudio = (state) => {};

  let progress = (
    (words.filter((word) => word.spoken).length / words.length) *
    100
  ).toFixed(0);

  const resetSentence = () => {
    setWords(
      sentence.split(" ").map((word) => ({ text: word, spoken: false }))
    );
    setCurrentWordIndex(null);
    setSentenceState(attemptdata ? "SUCCESS" : "IDLE");
    setTranscript("");
    setTimeTracks([]);
  };

  const startSpeaking = () => {
    if (!isSupported) return;
    setTimeTracks([new Date().getTime()]);
    playAudio("START");
    setCurrentWordIndex(0);
    startListening();
    setSentenceState("RECORDING");
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const cleanText = (text) => text.replace(/[^\w\s]/gi, "").toLowerCase();

  useEffect(() => {
    resetSentence();
  }, [sentence]);

  useEffect(() => {
    if (transcript.trim() !== "" && isListening) {
      const transcriptWords = transcript
        .trim()
        .split(" ")
        .map((word) => word.toLowerCase());
      const currentWord = words[currentWordIndex];
      if (
        currentWord &&
        !currentWord.spoken &&
        transcriptWords.includes(cleanText(currentWord.text))
      ) {
        setWords((prevWords) => {
          setTimeTracks((tt) => {
            tt[currentWordIndex + 1] = new Date().getTime();
            return tt;
          });
          return prevWords.map((wordObj, index) => ({
            ...wordObj,
            spoken: index <= currentWordIndex,
            timeTaken:
              timeTracks[currentWordIndex + 1] - timeTracks[currentWordIndex],
          }));
        });
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }
    }
  }, [transcript, currentWordIndex, isListening]);

  useEffect(() => {
    const allWordsSpoken = words.every((wordObj) => wordObj.spoken);
    if (allWordsSpoken && isListening && sentenceState !== "SUCCESS") {
      stopListening();
      setSentenceState("SUCCESS");
      playAudio("SUCCESS");
      const data = {
        words: words,
        wpm: Math.round(
          (words.length /
            ((timeTracks[timeTracks.length - 1] - timeTracks[0]) / 1000)) *
            60
        ),
        completedIn: (
          (timeTracks[timeTracks.length - 1] - timeTracks[0]) /
          1000
        ).toFixed(1),
        cwc: words.filter((word) => word.spoken).length,
      };
      setAttemptData(data);
      onSuccess && onSuccess(data);
    } else if (
      !allWordsSpoken &&
      !isListening &&
      sentenceState === "RECORDING"
    ) {
      setSentenceState("FAIL");
      playAudio("FAIL");
    }
  }, [words, isListening]);

  return (
    <>
      {sentenceState !== "SUCCESS" && (
        <div className={styles.card}>
          <div className={styles.questionText}>
            {sentenceState === "SUCCESS"
              ? "Great Job"
              : sentenceState === "RECORDING"
              ? "Speak the highlighted Word"
              : words.length === 1
              ? "Speak The Word"
              : "Speak The Sentence"}
          </div>

          <div className={styles.wrapper}>
              <span
                className={styles.speakerIcon}
                onClick={() => speakText(sentence)}
              >
                <HiMiniSpeakerWave size={45} />
              </span>
            <ul className={styles.wordContainer}>
        
              {words.map((wordObj, index) => (
                <Word
                  speakText={speakText}
                  key={index}
                  highlight={index === currentWordIndex}
                  sentenceState={sentenceState}
                  text={wordObj.text}
                  spoken={wordObj.spoken}
                />
              ))}
            </ul>
          </div>

          {isListening &&
            sentenceState === "RECORDING" &&
            words.length !== 1 && (
              <div className={styles.progressContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${progress}%`,
                    background:
                      progress >= 100
                        ? "#4caf50"
                        : progress >= 50
                        ? "#ff9800"
                        : "#f44336",
                  }}
                >
                  <span>{progress}%</span>
                </div>
              </div>
            )}
        </div>
      )}
     {sentenceState === "SUCCESS" && <Feedback attemptData={attemptData} />}

      <div className={styles.buttonContainer}>
        {!isListening && sentenceState === "IDLE" && (
          <button
            className={`${styles.button} ${styles.btnGreen}`}
            disabled={!isSupported}
            onClick={startSpeaking}
          >
            {isSupported ? (
              <>
                <MdMic /> Tap to Speak
              </>
            ) : (
              "Browser Not Supported"
            )}
          </button>
        )}
        {isListening && sentenceState === "RECORDING" && (
          <button
            className={`${styles.button} ${styles.btnRed}`}
            onClick={stopListening}
          >
            <MdStopCircle /> Stop
          </button>
        )}
        {sentenceState === "FAIL" && (
          <button
            className={`${styles.button} ${styles.btnOrange}`}
            onClick={resetSentence}
          >
            <FaUndo /> Retry
          </button>
        )}
      </div>
    </>
  );
};

export default Sentence;
