import "./SongForm.css";

import { useState } from "react";
import { AuthContext } from "../../context/app-context";
import { useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook.js";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CreateSongForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [emptyTitle, setIsTitleEmpty] = useState(false);
  const [emptyAlbum, setIsAlbumEmpty] = useState(false);
  const [emptyArtist, setIsArtistEmpty] = useState(false);
  const [emptyLink, setIsLinkEmpty] = useState(false);
  const [emptyYear, setIsYearEmpty] = useState(false);
  const [emptyLength, setIsLengthEmpty] = useState(false);
  const [emptyRating, setIsRatingEmpty] = useState(false);

  async function addSongSubmitHandler(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    // vérif des données :
    if (data.title == "") {
      setIsTitleEmpty(true);
      return;
    }
    if (data.album == "") {
      setIsAlbumEmpty(true);
      return;
    }

    if (data.artist == "") {
      setIsArtistEmpty(true);
      return;
    }

    if (data.link == "") {
      setIsLinkEmpty(true);
      return;
    }

    if (data.year == "") {
      setIsYearEmpty(true);
      return;
    }

    if (data.length == "") {
      setIsLengthEmpty(true);
      return;
    }

    if (data.rating == "") {
      setIsRatingEmpty(true);
      return;
    }

    const newSong = {
      titre: data.title,
      album: data.album,
      annee: data.year,
      duree: data.length,
      note: data.rating,
      artiste: data.artist,
      lien: data.link,
    };
    try {
      const response = await sendRequest(   import.meta.env.VITE_BACKEND_URL + "songs",
        "POST",
        JSON.stringify(newSong),
        {
          Authorization: "Bearer " + auth.token,
        },
      );
      if (!response) {
        console.log("une erreur s'est produite.");
      } else {
        console.log("Ajout fonctionnel");
        navigate("/songs");
      }
    } catch (err) {
      console.log("Erreur lors de l'ajout : ", err);
    }
    event.target.reset();
  }
  return (
    <>
      <div className="song-form-card">
        <h1>{t("createSong.title")}</h1>
        <form className="song-form" onSubmit={addSongSubmitHandler}>
          <div className="label-input">
            <label htmlFor="title">{t("createSong.song-title")}</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder={t("createSong.title-placeholder")}
            />
            {emptyTitle ? (
              <p className="form-error">{t("createSong.empty-title")}</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="album">Album</label>
            <input id="album" type="text" name="album" placeholder="album" />
            {emptyAlbum ? (
              <p className="form-error">{t("createSong.empty-album")}</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="artist">{t("createSong.song-artist")}</label>
            <input
              id="artist"
              type="text"
              name="artist"
              placeholder={t("createSong.artist-placeholder")}
            />
            {emptyArtist ? (
              <p className="form-error">{t("createSong.empty-artist")}</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="link">{t("createSong.song-link")}</label>
            <input
              id="link"
              type="text"
              name="link"
              placeholder={t("createSong.link-placeholder")}
            />
            {emptyLink ? (
              <p className="form-error">{t("createSong.empty-link")}</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="year">{t("createSong.song-year")}</label>
            <input
              id="year"
              type="number"
              name="year"
              placeholder={t("createSong.year-placeholder")}
            />
            {emptyYear ? (
              <p className="form-error">{t("createSong.empty-year")}</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="length">{t("createSong.song-length")}</label>
            <input
              id="length"
              type="text"
              name="length"
              placeholder="XminXsec"
            />
            {emptyLength ? (
              <p className="form-error">{t("createSong.empty-length")}</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="rating">{t("createSong.song-rating")}</label>
            <input
              id="rating"
              type="number"
              name="rating"
              placeholder={t("createSong.rating-placeholder")}
            />
            {emptyRating ? (
              <p className="form-error">{t("createSong.empty-rating")}</p>
            ) : null}
          </div>

          <div>
            <button type="reset">{t("createSong.reset")}</button>
            <button type="submit">{t("createSong.save")}</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateSongForm;
