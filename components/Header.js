import { supabase } from "@/utils/supabase";
import Hamburger from "hamburger-react";
import Link from "next/link";
import React from "react";
import styles from "./Header.module.css";

export default function Header({ user }) {
  const [navigationMenuVisible, setNavigationMenuVisible] =
    React.useState(false);

  console.log("header", user);

  return (
    <>
      {navigationMenuVisible ? <NavigationMenu user={user} /> : null}
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

function NavigationMenu({ user }) {
  console.log("is there a user", Boolean(user));
  return (
    <div className={styles.navigationMenuWrapper}>
      <Link href="/">
        <h2>MSUMP</h2>
      </Link>
      <Link href="/">
        <p>Dashboard</p>
      </Link>
      {user ? (
        <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
      ) : (
        <Link href="/signup">Sign In</Link>
      )}
    </div>
  );
}
