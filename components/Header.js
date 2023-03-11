import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [navigationMenuVisible, setNavigationMenuVisible] =
    React.useState(false);

  return (
    <>
      {navigationMenuVisible ? <NavigationMenu /> : null}
      <header className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <Link href="/">MSUMP</Link>
          <Hamburger
            onToggle={(toggled) => {
              if (toggled) {
                setNavigationMenuVisible(true);
              } else {
                setNavigationMenuVisible(false);
              }
            }}
          />
        </div>
      </header>
    </>
  );
}

function NavigationMenu() {
  return (
    <div className={styles.navigationMenuWrapper}>
      <Link href="/">
        <h2>MSUMP</h2>
      </Link>
      <Link href="/">
        <p>Dashboard</p>
      </Link>
      <button>Sign Out</button>
    </div>
  );
}
