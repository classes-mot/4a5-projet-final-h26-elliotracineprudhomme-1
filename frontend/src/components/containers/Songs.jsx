import { useEffect, useState } from "react";
import SongList from "../songList/SongList";
import { useHttpClient } from "../../hooks/http-hook.js";

const songs = [
  {
    titre: "The Dying Illusion",
    album: "Chapter VI",
    annee: 2008,
    duree: "5min52sec",
    note: 9,
    artiste: "Candlemass",
    lien: "https://open.spotify.com/intl-fr/track/4PiRCQMRUUpVOHLP9LiW5f?si=6013ccc013944b4a",
  },
  {
    titre: "Crazy Train",
    album: "Blizzard of Ozz",
    annee: 1980,
    duree: "4min53sec",
    note: 9,
    artiste: "Ozzy Osbourne",
    lien: "https://open.spotify.com/intl-fr/track/7ACxUo21jtTHzy7ZEV56vU?si=f4effc4d3de54f15",
  },
];

const Songs = () => {
  const [loadedSongs, setLoadedSongs] = useState([]);
  const { sendRequest } = useHttpClient();
  // setLoadedSongs(songs);
  // useEffect(() => {
  //   const fetchSongs = async () => {
  //     try {
  //       const res = await sendRequest("http://localhost:5000/api/songs");
  //       setLoadedSongs(res.songs);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchSongs();
  // }, [sendRequest]);

  return (
    <>
      <SongList items={songs} />
    </>
  );
};
export default Songs;
