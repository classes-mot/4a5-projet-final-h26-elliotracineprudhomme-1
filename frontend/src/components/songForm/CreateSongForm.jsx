import "./SongForm.css";

import { useState } from "react";
import { AuthContext } from "../../context/app-context";
import { useContext } from "react";
import { useHttpClient } from '../../hooks/http-hook.js';

const CreateSongForm = () => {
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

    await sendRequest(
      "http://localhost:5000/api/songs",
      "POST",
      JSON.stringify(newSong),
      {
        Authorization: 'Bearer ' + auth.token,
      },
    );
    event.target.reset();
  }
  return (
    <>
      <div className="song-form-card">
        <h1>New song</h1>
        <form className="song-form" onSubmit={addSongSubmitHandler}>
          <div className="label-input">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" placeholder="title" />
            {emptyTitle ? (
              <p className="form-error">please specify the title.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="album">Album</label>
            <input id="album" type="text" name="album" placeholder="album" />
            {emptyAlbum ? (
              <p className="form-error">please specify the album.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="artist">Artist</label>
            <input id="artist" type="text" name="artist" placeholder="artist" />
            {emptyArtist ? (
              <p className="form-error">please specify the artist.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="link">Link</label>
            <input
              id="link"
              type="text"
              name="link"
              placeholder="Spotify link"
            />
            {emptyLink ? (
              <p className="form-error">please enter the link.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              name="year"
              placeholder="year of release"
            />
            {emptyYear ? (
              <p className="form-error">please specify the year of release.</p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="length">Length</label>
            <input
              id="length"
              type="text"
              name="length"
              placeholder="XminXsec"
            />
            {emptyLength ? (
              <p className="form-error">
                please specify the length of the song.
              </p>
            ) : null}
          </div>

          <div className="label-input">
            <label htmlFor="rating">Rating</label>
            <input
              id="rating"
              type="number"
              name="rating"
              placeholder="out of 5"
            />
            {emptyRating ? (
              <p className="form-error">please rate the song.</p>
            ) : null}
          </div>

          <div>
            <button type="reset">reset</button>
            <button type="submit">save</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default CreateSongForm;
