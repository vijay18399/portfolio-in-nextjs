import React from "react";
import { X,Check } from "lucide-react";
import "react-loading-skeleton/dist/skeleton.css";
import { Volume, Volume1, Volume2 } from "lucide-react";
import { Audio as AudioIcon } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/features/page/wordSlice";
import SpellBeeSkeletonLoader from "./SpellBeeSkeletonLoader";
import styles from "@/styles/dulingo.module.css";
import AudioPlayer from "@/components/spell-bee/AudioPlayer"
const GameBoard = ({
  endGame,
  userInput,
  handleInputChange,
  handleSubmit,
  handleNextQuestion,
  handleSkipQuestion,
  attempts,
}) => {
  const { words, loading, currentWordIndex } = useSelector(
    (state) => state.word
  );
  const dispatch = useDispatch();
  const currentWord = words[currentWordIndex];
  const wordStatus = currentWord?.status;

  if (loading) {
    return <SpellBeeSkeletonLoader />;
  }

  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameCard}>
        <div className={styles.gameHeader}>
          <X onClick={endGame} style={{ cursor: "pointer" }} />
          <div className={styles.progressContainer}>
            <div
              className={styles.progressBar}
              style={{ width: `${(currentWordIndex / words.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className={styles.gameContent}>
          <h1 className={styles.questionText}>Complete the word.</h1>
          <AudioPlayer audioSrc={currentWord?.voice} size={50} className="myCustomStyle" />
          <div className={styles.inputContainer}>
            {userInput.map((letter, index) => (
              <input
                disabled={['success', 'fail', 'skipped'].includes(wordStatus)}
                key={index}
                className={styles.letterInput}
                id={`input-${index}`}
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e) => handleInputChange(index, e.target.value)}
                aria-label={`Letter ${index + 1} of the word`}
              />
            ))}
          </div>

          {!words[currentWordIndex]?.isCorrect && attempts > 0 && (
            <p className={styles.attemptsMessage}>
              Incorrect! Attempts: {attempts}
            </p>
          )}
        </div>
        <div className={styles.bottomBar}>
              <button
                className={`${styles.button} ${styles.btnOrange}`}
                onClick={handleSkipQuestion}
              >
                Skip 
              </button>
              <button
                disabled={userInput.some((letter) => letter === "")}
                className={`${styles.button} ${styles.btnGreen}`}
                onClick={handleSubmit}
              >
                Submit
              </button>

        </div>
        {['success', 'fail', 'skipped'].includes(wordStatus) && (
            <div
              className={`${styles.feedBack} ${
                wordStatus === 'success'
                  ? styles.success
                  : wordStatus === 'fail'
                  ? styles.fail
                  : styles.skipped
              }`}
            >
              <div className={styles.feedbackIcon}>
                {wordStatus === 'success' && <span className={styles.correctIcon}><Check strokeWidth={8} /></span>}
                {wordStatus === 'fail' && <span className={styles.wrongIcon}><X strokeWidth={8} /></span>}
                {wordStatus === 'skipped' && <span className={styles.skippedIcon}><X strokeWidth={8} /></span>}
              </div>

              <div className={styles.feedbackText}>
                {wordStatus === 'success' && (
                  <>
                    <p className={styles.feedbackMessage}>Awesome! 🎉</p>
                    <p><strong>Word:</strong> {currentWord?.word}</p>
                    <p><strong>Meaning:</strong> {currentWord?.definition}</p>
                  </>
                )}
                {wordStatus === 'fail' && (
                  <>
                    <p className={styles.feedbackMessage}>Incorrect!</p>
                    <p><strong>Correct Answer:</strong> {currentWord?.word}</p>
                    <p><strong>Meaning:</strong> {currentWord?.definition}</p>
                  </>
                )}
                {wordStatus === 'skipped' && (
                  <>
                    <p className={styles.feedbackMessage}>Skipped!</p>
                    <p><strong>Correct Answer:</strong> {currentWord?.word}</p>
                    <p><strong>Meaning:</strong> {currentWord?.definition}</p>
                  </>
                )}
              </div>

              <button
                    className={`${styles.button} ${
                      wordStatus === 'success'
                        ? styles.btnGreen
                        : wordStatus === 'fail'
                        ? styles.btnRed
                        : styles.btnOrange
                    }`}
                    onClick={handleNextQuestion}
                  >
                Continue
              </button>
            </div>
          )}

        
      </div>
    </div>
  );
};

export default GameBoard;