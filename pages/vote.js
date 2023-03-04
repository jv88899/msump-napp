import Album from "@/components/Album";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import styles from "../styles/Vote.module.css";

const successfulUpvote = () => toast.success("Upvoted");
const successfulDownvote = () => toast.success("Downvoted");

export default function Vote() {
  const [albums, setAlbums] = React.useState([]);
  const [albumIndex, setAlbumIndex] = React.useState(0);
  const [currentAlbum, setCurrentAlbum] = React.useState(null);
  const [numberOfAlbums, setNumberOfAlbums] = React.useState(0);
  const [upvotes, setUpvotes] = React.useState(0);
  const [downvotes, setDownvotes] = React.useState(0);
  const [comments, setComments] = React.useState([]);
  const [allVotesUsed, setAllVotesUsed] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const { status, data, error, isLoading } = useQuery(
    ["albumInformation", albumIndex],
    async function getAllAlbumInformation() {
      const { data: allAlbums, error } = await supabase
        .from("albums")
        .select("*");

      const activeAlbum = allAlbums[albumIndex];
      const activeAlbumId = activeAlbum.id;

      const { data: upvotes, error: upvotesError } = await supabase
        .from("votes")
        .select("upvote");

      const { data: downvotes, error: downvotesError } = await supabase
        .from("votes")
        .select("downvote");

      const { data: userInfo, error: userInfoError } =
        await supabase.auth.getSession();

      console.log(userInfo);

      return [allAlbums, activeAlbum, upvotes, downvotes, userInfo];
    },
    { refetchOnWindowFocus: false }
  );

  React.useEffect(() => {
    if (status === "loading") return;
    if (status === "success") {
      console.log("data", data);
      setAlbums(data[0]);
      setNumberOfAlbums(data[0].length);
      setCurrentAlbum(data[1]);
      setUpvotes(data[2].length);
      setDownvotes(data[3].length);
      setUser(data[4].session.user);
    }
  }, [status, data, albums, albumIndex, currentAlbum, user]);

  function showComments() {}

  function showTrackList() {}

  async function handleUpvote() {
    await upvote();
  }

  async function handleDownvote() {
    await downvote();
  }

  async function upvote() {
    try {
      const { data: upvote, error: upvoteError } = await supabase
        .from("votes")
        .insert([
          {
            user_id: user.id,
            album_id: currentAlbum.id,
            upvote: true,
            downvote: false,
          },
        ]);

      console.log("upvote", upvote);
      console.log("error", upvoteError);

      successfulUpvote();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function downvote() {
    try {
      const { data: downvote, error: downvoteError } = await supabase
        .from("votes")
        .insert([
          {
            user_id: user.id,
            album_id: currentAlbum.id,
            upvote: false,
            downvote: true,
          },
        ]);

      console.log("downvote", downvote);
      console.log("error", downvoteError);

      successfulDownvote();
    } catch (error) {}
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.pageTitle}>Vote</h2>
      {error ? <span>Error {error.message}</span> : ""}

      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          {albumIndex < numberOfAlbums && !allVotesUsed ? (
            <>
              <div className={styles.albumContainer}>
                {currentAlbum && <Album album={currentAlbum} />}
                <div className={styles.albumInfoWrapper}>
                  <div className={styles.albumVotingInformationWrapper}>
                    <span className={styles.upvotesContainer}>+ {upvotes}</span>
                    <span className={styles.downvotesContainer}>
                      - {downvotes}
                    </span>
                  </div>
                  <div className={styles.albumCommentsWrapper}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.albumCommentIcon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      onClick={showComments}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                    <div className={styles.albumCommentCountContainer}>
                      {comments && comments.length}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.albumTrackListWrapper}>
                <button
                  className={styles.trackListButton}
                  onClick={showTrackList}
                >
                  View Track List
                </button>
              </div>
              <div className={styles.buttonWrapper}>
                <button onClick={handleDownvote}>
                  <svg
                    className={styles.thumbsDownIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                    />
                  </svg>
                </button>
                <button onClick={handleUpvote}>
                  <svg
                    className={styles.thumbsUpIcon}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <span>You have used all of your votes for today</span>
              <Link href="/">Return to Dashboard</Link>
            </>
          )}
        </>
      )}
    </div>
  );
}
