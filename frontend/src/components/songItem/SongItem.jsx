import { useContext } from "react";
import { Link } from "react-router-dom";
import "./SongItem.css";
import { AuthContext } from "../../context/app-context.js";
import Ximage from "../../assets/img/X.png";
import { useTranslation } from "react-i18next";

const SongItem = (props) => {
  const { t } = useTranslation();
  const auth = useContext(AuthContext);
  async function deleteSong() {
    try {
      await fetch(
        import.meta.env.VITE_BACKEND_URL + `songs/${props.id}`, 
        {
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
        <Link to={props.lien}><h3>{props.titre}</h3></Link>
        <p>{props.artiste}</p>
        <p>{props.album}</p>
        <p>{props.duree}</p>
      </div>
      <div className="song-card-lower-section">
        {props.children}
        <div className="song-card-options">
          {auth.isLoggedIn ? (
            <>
              <Link to={`/songs/edit/${props.id}`}>
                <button id="edit-btn" title={t("song-item.btn")}>...</button>
              </Link>
              <img
                onClick={() => deleteSong()}
                src={Ximage}
                alt={t("song-item.img-alt")}
                title={t("song-item.img")}
              />
            </>
          ) : null}
        </div>
      </div>
    </li>
  );
};
export default SongItem;
