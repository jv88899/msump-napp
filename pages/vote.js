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

  const { status, data, error, isLoading } = useQuery(
    ["albumInformation", albumIndex],
    async function getAllAlbumInformation() {
      const { data: allAlbums, error } = await supabase
        .from("albums")
        .select("*");

      console.log("allAlbums", allAlbums);
      console.log("status", status);

      return [allAlbums];
    },
    { refetchOnWindowFocus: false }
  );

  React.useEffect(() => {
    if (status === "loading") return;
    if (status === "success") {
      setAlbums(data[0]);
      setNumberOfAlbums(data[0].length);
      setCurrentAlbum(albums[albumIndex]);
    }
  }, [status, data, albums, albumIndex, currentAlbum]);

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
                {currentAlbum && (
                  <>
                    <h3>{currentAlbum.title}</h3>
                  </>
                )}
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
