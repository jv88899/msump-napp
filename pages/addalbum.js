import { supabase } from "@/utils/supabase";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "../styles/Signup.module.css";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AddAlbum() {
  const [uploading, setUploading] = React.useState(false);
  const [albumTitle, setAlbumTitle] = React.useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const router = useRouter();

  const successfulAlbumAdded = () =>
    toast.success("Album has been successfully added!");

  async function onSubmit(formData) {
    try {
      const {
        albumTitle,
        albumArtist,
        recordLabel,
        releaseYear,
        albumImageName,
      } = formData;

      const { data, error } = await supabase
        .from("albums")
        .insert({
          id: uuidv4(),
          title: albumTitle,
          artist: albumArtist,
          record_label: recordLabel,
          release_year: releaseYear,
          album_image: albumImageName,
        })
        .select();

      if (data) console.log(data);
      if (error) console.log(error);

      if (data && !error) successfulAlbumAdded();
      if (data && !error) router.push("/albums");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <div>
          <h1>Add Album</h1>
          <Link href="/albums">Albums</Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <label htmlFor="albumtitle">Album Title</label>
            <input
              onChange={(e) => setAlbumTitle(e.event.target.value)}
              {...register("albumTitle", {
                required: "Album title is required",
                minLength: {
                  value: 1,
                  message: "Album must have a title",
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.albumTitle?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="albumartist">Album Artist</label>
            <input
              {...register("albumArtist", {
                required: "Album artist is required",
                minLength: {
                  value: 1,
                  message: "Album must have an artist",
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.albumArtist?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="recordlabel">Record Label</label>
            <input
              {...register("recordLabel", {
                minLength: {
                  value: 1,
                  message: "Record label must have more than 1 character",
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.recordLabel?.message}</div>
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="releaseyear">Release Year</label>
            <input
              {...register("releaseYear", {
                minLength: {
                  value: 4,
                  message: "Release year must be 4 digits",
                },
                maxLength: {
                  value: 4,
                  message: "Release year must be 4 digits",
                },
              })}
              type="text"
            />
          </div>
          <div className={styles.wrapper}>
            <label htmlFor="albumimagename">Album Image Name</label>
            <input
              {...register("albumImageName", {
                minLength: {
                  value: 1,
                  message: "Album image name must have more than 1 character",
                },
              })}
              type="text"
            />
            <div className={styles.error}>{errors.albumImageName?.message}</div>
          </div>

          <div className={styles.wrapper}>
            <button type="submit">Add Album</button>
          </div>
        </form>
      </div>
    </div>
  );
}
