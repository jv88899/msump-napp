import React from "react";
import { supabase } from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";

export default function Albums() {
  const [albums, setAlbums] = React.useState([]);

  React.useEffect(() => {
    getAllAlbums();
  }, []);

  async function getAllAlbums() {
    const { data, error } = await supabase.from("albums").select();
    setAlbums(data);
    console.log(data);
    return data;
  }

  return (
    <>
      <h1>Albums</h1>
      <Link href="/addalbum">Add Album</Link>
      {albums.map((album) => (
        <div key={album.id}>
          <h1>{album.title}</h1>
          <Image
            src={`/media/album-covers/albums/${album.album_image}`}
            alt={`${album.title} album cover`}
            width={250}
            height={250}
          />
        </div>
      ))}
    </>
  );
}
