import React, { useState } from "react";
import styles from "@/styles/dulingo.module.css";
import { Volume, Volume1, Volume2 } from "lucide-react";

export default function AudioPlayer({ audioSrc, size = 50, className = "" }) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleAudioPlay = () => {
    if (!audioSrc) return;

    const audio = new Audio(audioSrc);
    setIsAudioPlaying(true);

    audio.play();
    audio.onended = () => {
      setIsAudioPlaying(false);
    };
  };

  return (
    <button
      className={`${styles.audioButton} ${
        isAudioPlaying ? styles.playing : ""
      } ${className}`}
      onClick={handleAudioPlay}
      disabled={isAudioPlaying}
    >
      <div style={{
        width:`${size}px`,
        height:`${size}px`
      }} className={styles.volumeAnimation}>
        <Volume size={size} className={styles.volumeIcon} />
        <Volume1 size={size} className={styles.volumeIcon} />
        <Volume2 size={size} className={styles.volumeIcon} />
      </div>
    </button>
  );
}
