import { useEffect, useState } from "react";
import SongList from "../songList/SongList";
import { useHttpClient } from "../hooks/http-hook";


const Songs = () => {
  const [loadedSongs, setLoadedSongs] = useState([]);
  const { error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await sendRequest("http://localhost:5000/api/songs");
        setLoadedSongs(res.songs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSongs();
  }, [sendRequest]);
  return (
    <>
      <SongList items={"loadedSongs"} />
    </>
  );
};
export default Songs;
