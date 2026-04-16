import "./SongForm.css";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/app-context";
import { useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook.js";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ModifySongForm = () => {
    const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const songID = useParams().songID;
  const [loadedSong, setLoadedSong] = useState(null);
  console.log("1-la chanson : ", loadedSong);
  const [emptyTitle, setIsTitleEmpty] = useState(false);
  const [emptyAlbum, setIsAlbumEmpty] = useState(false);
  const [emptyArtist, setIsArtistEmpty] = useState(false);
  const [emptyLink, setIsLinkEmpty] = useState(false);
  const [emptyYear, setIsYearEmpty] = useState(false);
  const [emptyLength, setIsLengthEmpty] = useState(false);
  const [emptyRating, setIsRatingEmpty] = useState(false);

  async function modifySongSubmitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
  }
  const { sendRequest } = useHttpClient();
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const reponse = await sendRequest(
          `http://localhost:5000/api/songs/${songID}`,
        );
        setLoadedSong(reponse.song);
        console.log("2-la chanson ", loadedSong);
      } catch (err) {
        console.log("erreur lors de la recherche de la chanson : ", err);
      }
    };
    fetchSong();
  }, [sendRequest]);
  if (loadedSong == undefined) {
    console.log("3-la chanson ", loadedSong);
    return (
      <div className="song-error-card">
        <h3>Une erreur s'est produite</h3>
        <p>Aucune chanson trouvee.</p>
      </div>
    );
  }

  return (
    <>
      <div className="song-form-card">
        <h1>{loadedSong.titre}</h1>
        <form className="song-form" onSubmit={modifySongSubmitHandler}>
          <div className="label-input">
            <label htmlFor="title">{t("modifySong.song-title")}</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="title"
              defaultValue={loadedSong.titre}
            />
            {emptyTitle ? (
              <p className="form-error">please specify the title.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="album">{t("modifySong.song-album")}</label>
            <input
              id="album"
              type="text"
              name="album"
              placeholder="album"
              defaultValue={loadedSong.album}
            />
            {emptyAlbum ? (
              <p className="form-error">please specify the album.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="artist">{t("modifySong.song-artist")}</label>
            <input
              id="artist"
              type="text"
              name="artist"
              placeholder="artist"
              defaultValue={loadedSong.artiste}
            />
            {emptyArtist ? (
              <p className="form-error">please specify the artist.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="link">{t("modifySong.song-link")}</label>
            <input
              id="link"
              type="text"
              name="link"
              placeholder="Spotify link"
              defaultValue={loadedSong.lien}
            />
            {emptyLink ? (
              <p className="form-error">please enter the link.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="year">{t("modifySong.song-year")}</label>
            <input
              id="year"
              type="number"
              name="year"
              placeholder="year of release"
              defaultValue={loadedSong.annee}
            />
            {emptyYear ? (
              <p className="form-error">please specify the year of release.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="length">{t("modifySong.song-length")}</label>
            <input
              id="length"
              type="text"
              name="length"
              placeholder="XminXsec"
              defaultValue={loadedSong.duree}
            />
            {emptyLength ? (
              <p className="form-error">
                please specify the length of the song.
              </p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="rating">{t("modifySong.song-rating")}</label>
            <input
              id="rating"
              type="number"
              name="rating"
              placeholder="out of 5"
              defaultValue={loadedSong.note}
            />
            {emptyRating ? (
              <p className="form-error">please rate the song.</p>
            ) : null}
          </div>

          <div>
            <button type="reset">{t("modifySong.reset")}</button>
            <button type="submit">{t("modifySong.save")}</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default ModifySongForm;
