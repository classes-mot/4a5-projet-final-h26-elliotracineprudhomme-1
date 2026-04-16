import { useContext } from "react";
import { Link } from "react-router-dom";
import "./SongItem.css";
import { AuthContext } from "../../context/app-context.js";
import { useHttpClient } from "../../hooks/http-hook";
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

  // const auth = useContext(AuthContext);
  return (
    <li className="song-card">
      <div className="song-card-upper-section">
        <h3>{props.titre}</h3>
        <p>{props.artiste}</p>
        <p>{props.album}</p>
        <p>{props.duree}</p>
      </div>
      <div className="song-card-lower-section">
        {props.children}
        <div className="song-card-options">
          {auth.isLoggedIn ? (
            <Link to="/">
              <button>...</button>
            </Link>
          ) : null}
          <img
            onClick={() => deleteSong()}
            src={Ximage}
            alt="delete-song-button"
          />
        </div>
      </div>
    </li>
  );
};
export default SongItem;
