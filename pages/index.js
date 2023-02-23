import Head from "next/head";
import Image from "next/image";
import homeStyles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "@/components/Header";
import { supabase } from "@/utils/supabase";

export default function Home() {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session);
  });
  return (
    <>
      <Head>
        <title>My Still Untitled Music Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={homeStyles.wrapper}>
        <section className={homeStyles.splashScreenWrapper}>
          <div className={homeStyles.innerWrapper}>
            <Image
              src="/../public/media/icons/music_note_small.png"
              height={100}
              width={100}
              alt="3d music note"
              className={homeStyles.musicNoteSmallIcon}
            />
            <div className={homeStyles.aboutWrapper}>
              <h1 className={homeStyles.title}>A musical adventure.</h1>
              <div className={homeStyles.description}>
                Join us as we explore music and discover the greatest albums
                ever made.
              </div>
            </div>
            <div className={homeStyles.buttonWrapper}>
              <Link href="/" className={homeStyles.moreInformationButton}>
                What is this place?
              </Link>
              <Link href="/signup" className={homeStyles.signUpButton}>
                I&apos;ve heard enough, I&apos;m in!
              </Link>
            </div>
          </div>
        </section>
        <section className={homeStyles.aboutScreenWrapper}>
          <h2 className={homeStyles.aboutTitle}>What is this place?</h2>
          <p className={homeStyles.aboutDescription}>
            My Still Untitled Music Project is a collection of albums. But not
            just any albums. These albums are hand-selected every week.
          </p>
          <p className={homeStyles.aboutDescription}>
            We&apos;ve curated the list. Now all you have to do is vote.
          </p>
          <Link href="/signup">Sign up for free</Link>
        </section>
      </div>
    </>
  );
}
