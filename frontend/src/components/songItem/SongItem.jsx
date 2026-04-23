import { useContext } from "react";
import { Link } from "react-router-dom";
import "./SongItem.css";
import { AuthContext } from "../../context/app-context.js";
import Ximage from "../../assets/img/X.png";
const SongItem = (props) => {
  const auth = useContext(AuthContext);
  // const { sendRequest } = useHttpClient();
  async function deleteSong() {
    try {
      await fetch(`http://localhost:5000/api/songs/${props.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  const song = {
    titre: props.titre,
    album: props.album,
    annee: props.annee,
    duree: props.duree,
    note: props.note,
    artiste: props.artiste,
    lien: props.lien,
  };
  return (
    <li className="song-card">
      <div className="song-card-upper-section">
        <h3 onClick={}>{props.titre}</h3>
        <p>{props.artiste}</p>
        <p>{props.album}</p>
        <p>{props.duree}</p>
      </div>
      <div className="song-card-lower-section">
        {props.children}
        <div className="song-card-options">
          {auth.isLoggedIn ? (
            <>
              <Link to={`/edit/${props.id}`}>
                <button>...</button>
              </Link>
              <img
                onClick={() => deleteSong()}
                src={Ximage}
                alt="delete-song-button"
              />
            </>
          ) : null}
        </div>
      </div>
    </li>
  );
};
export default SongItem;
