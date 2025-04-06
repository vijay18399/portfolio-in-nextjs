import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/styles/dulingo.module.css";

const GameBoardSkeleton = () => {
  return (
    <div className={styles.gameContainer}>
      <div className={styles.gameCard}>
        <div className={styles.gameHeader}>
          <Skeleton width={20} height={20} circle />
          <div className={styles.progressContainer}>
            <Skeleton height={8} width="100%" />
          </div>
        </div>

        <div className={styles.gameContent}>
          <Skeleton height={32} width={200} style={{ marginBottom: 16 }} />
          <Skeleton  height={100} width={100} style={{ marginBottom: 24 }} />

          <div className={styles.inputContainer}>
            {Array(5)
              .fill()
              .map((_, index) => (
                <Skeleton
                  key={index}
                  height={40}
                  width={40}
                  style={{ marginRight: 8 }}
                />
              ))}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <Skeleton height={40} width={100} style={{ marginRight: 16 }} />
          <Skeleton height={40} width={100} />
        </div>
      </div>
    </div>
  );
};

export default GameBoardSkeleton;
