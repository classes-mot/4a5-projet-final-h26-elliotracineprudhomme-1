import { use, useContext } from "react";
import { AuthContext } from "../../context/app-context.js";
import { Link } from "react-router-dom";

const SongItem = (props) => {
  // const auth = useContext(AuthContext);
  return (
    <>
      <div>
        <h6>{props.titre}</h6>
        <p>{props.artiste}</p>
        <p>{props.album}</p>
        <p>{props.duree}</p>
      </div>
      <div>{props.children}</div>
    </>
  );
};
export default SongItem;
