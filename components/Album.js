import React from "react";
import TinderCard from "react-tinder-card";
import styles from "../components/Album.module.css";

export default function Album({ album }) {
  const { album_image, title, artist } = album;

  function onCardLeftScreen(direction) {
    if (direction === "left") {
      console.log("direction", direction);
    }

    if (direction === "right") {
      console.log("direction", direction);
    }
  }

  return (
    <TinderCard
      onCardLeftScreen={onCardLeftScreen}
      preventSwipe={["up", "down"]}
      className={styles.swipe}
    >
      <div className={styles.albumWrapper}>
        <div
          className={styles.albumImage}
          style={{
            backgroundImage: `url(/media/album-covers/albums/${album_image})`,
          }}
        >
          <h2 className={styles.albumTitle}>{title}</h2>
          <h3 className={styles.albumArtist}>{artist}</h3>
        </div>
      </div>
    </TinderCard>
  );
}
