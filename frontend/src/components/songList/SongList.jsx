import { useEffect, useState } from "react";
import SongItem from "../songItem/SongItem";
import RatingScale from "../ratingScale/RatingScale.jsx";
import { useHttpClient } from "../../hooks/http-hook.js";
import "./SongList.css";
const SongList = () => {
  const [loadedSongs, setLoadedSong] = useState([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    //ne pas faire de fonction asynchrone dans useEffect qui retourne une promise, useEffect n'aime pas ca..
    const fetchSongs = async () => {
      try {
        const reponse = await sendRequest("http://localhost:5000/api/songs");
        setLoadedSong(reponse.songs);
      } catch (err) {
        console.log("erreur lors de la recherche des chansons : ", err);
      }
    };
    fetchSongs();
  }, [sendRequest]);
  if (loadedSongs == undefined) {
    return (
      <div className="song-error-card">
        <h3>Une erreur s'est produite</h3>
        <p>Aucune chanson trouvee.</p>
      </div>
    );
  }
  console.log(loadedSongs);
  return (
    <>
      <ul className="song-list">
        {loadedSongs.map((song) => (
          <SongItem
            key={song.id}
            id={song.id}
            titre={song.titre}
            album={song.album}
            duree={song.duree}
            note={song.note}
            artiste={song.artiste}
            lien={song.lien}
          >
            <RatingScale value={song.note} />
          </SongItem>
        ))}
      </ul>
    </>
  );
};

export default SongList;
