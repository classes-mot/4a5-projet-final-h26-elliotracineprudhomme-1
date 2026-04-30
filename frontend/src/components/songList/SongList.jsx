import { useEffect, useState } from "react";
import SongItem from "../songItem/SongItem";
import RatingScale from "../ratingScale/RatingScale.jsx";
import { useHttpClient } from "../../hooks/http-hook.js";
import "./SongList.css";
import Category from "../category/Category.jsx";
import { useTranslation } from "react-i18next";
import Loader from "../containers/LoadingCard";

const SongList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [activeCat, setActiveCat] = useState("");
  const [activeInput, setActiveInput] = useState("");
  const [loadedSongs, setLoadedSongs] = useState([]);
  const { sendRequest } = useHttpClient();

  // mélange la liste pour avoir un ordre différent à chaque fois
  // function shuffle() {
  //   let unTab = loadedSongs;
  //   let i = unTab.length, j, temp;
  //   while (--i > 0) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     temp = unTab[j];
  //     unTab[j] = unTab[i];
  //     unTab[i] = temp;
  //   }
  //   setLoadedSongs(unTab);
  // }





  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const reponse = await sendRequest(
          (import.meta.env.VITE_BACKEND_URL || "http//localhost:3000/api/") +
            "songs",
        );
        setLoadedSongs(reponse.songs);
        setIsLoading(false);
      } catch (err) {
        console.log("erreur lors de la recherche des chansons : ", err);
      }
    };
    fetchSongs();
  }, [sendRequest]);
  if (loadedSongs == undefined) {
    return (
      <div className="song-error-card">
        <h3>{t("error.title")}</h3>
        <p>{t("error.song")}</p>
      </div>
    );
  }
  let liste = [];
  switch (activeCat) {
    case "note":
      for (let i = 0; i < loadedSongs.length; i++) {
        if (loadedSongs[i].note == Number(activeInput)) {
          liste.push(loadedSongs[i]);
        }
      }
      break;
    case "titre":
      for (let i = 0; i < loadedSongs.length; i++) {
        if (loadedSongs[i].titre == activeInput) {
          liste.push(loadedSongs[i]);
        }
      }
      break;
    case "artiste":
      for (let i = 0; i < loadedSongs.length; i++) {
        if (loadedSongs[i].artiste == activeInput) {
          liste.push(loadedSongs[i]);
        }
      }
      break;
    case "album":
      for (let i = 0; i < loadedSongs.length; i++) {
        if (loadedSongs[i].album == activeInput) {
          liste.push(loadedSongs[i]);
        }
      }
      break;
    default:
      break;
  }
  if (liste.length == 0) {
    liste = loadedSongs;
  }

  return (
    <>
      <Category setActiveCat={setActiveCat} setActiveInput={setActiveInput} />
      <div className="spinner"> {isLoading && <Loader />}</div>
      <ul className="song-list">
        {liste.map((song) =>
          liste.length > 0 ? (
            <SongItem
              key={song.id}
              id={song.id}
              titre={song.titre}
              album={song.album}
              duree={song.duree}
              annee={song.annee}
              note={song.note}
              artiste={song.artiste}
              lien={song.lien}
            >
              <RatingScale value={song.note} />
            </SongItem>
          ) : null,
        )}
      </ul>
    </>
  );
};

export default SongList;
