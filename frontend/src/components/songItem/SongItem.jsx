import { use, useContext } from "react";
import { AuthContext } from "../../context/app-context.js";
import { Link } from "react-router-dom";
import "./SongItem.css";
const SongItem = (props) => {
  // const auth = useContext(AuthContext);
  return (
    <li className="song-card">
      <div className="song-card-upper-section">
        <h3>{props.titre}</h3>
        <p>{props.artiste}</p>
        <p>{props.album}</p>
        <p>{props.duree}</p>
      </div>
      <div className="song-card-lower-section">{props.children}</div>
    </li>
  );
};
export default SongItem;
