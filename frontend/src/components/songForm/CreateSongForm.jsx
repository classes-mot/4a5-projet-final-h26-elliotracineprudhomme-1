import "./SongForm.css";

import { useState } from "react";
import { AuthContext } from "../../context/app-context";
import { useContext } from "react";

const CreateSongForm = () => {
  const auth = useContext(AuthContext);

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

    const newSong = {
      //...
    };

    await sendRequest(
      "http://localhost:5000/api/songs",
      "POST",
      JSON.stringify(newSong),
      {
        Authorization: "Bearer " + auth.token,
      },
    );
    event.target.reset();
  }
  return (
    <>
      <div className="song-form-card">
        <h1>new song</h1>
        <form className="song-form" onSubmit={addSongSubmitHandler}>
          <div className="label-input">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" name="title" placeholder="title" />
          </div>
          <div className="label-input">
            <label htmlFor="album">Album</label>
            <input id="album" type="text" name="album" placeholder="album" />
          </div>
          <div className="label-input">
            <label htmlFor="artist">Artist</label>
            <input id="artist" type="text" name="artist" placeholder="artist" />
          </div>

          <div className="label-input">
            <label htmlFor="link">Link</label>
            <input
              id="link"
              type="url"
              name="link"
              placeholder="Spotify link"
            />
          </div>

          <div className="label-input">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              type="number"
              name="year"
              placeholder="year of release"
            />
          </div>

          <div className="label-input">
            <label htmlFor="length">Length</label>
            <input
              id="length"
              type="number"
              name="length"
              placeholder="XminXsec"
            />
          </div>

          <div className="label-input">
            <label htmlFor="rating">Rating</label>
            <input
              id="rating"
              type="number"
              name="rating"
              placeholder="out of 5"
            />
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
