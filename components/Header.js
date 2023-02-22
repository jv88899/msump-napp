import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <Link href="/">MSUMP</Link>
        <button className={styles.hamburgerMenuWrapper}>
          <div />
          <div />
        </button>
      </div>
    </header>
  );
}
