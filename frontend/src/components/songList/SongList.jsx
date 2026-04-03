import { useState } from "react";
import "./SongList.css";
import Category from "../category/Category";
import SongItem from "../songItem/SongItem";
import RatingScale from "../ratingScale/RatingScale";

const SongList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <h3>Aucune chanson n'a été trouvée...</h3>
      </div>
    );
  }

  return (
    <div className="">
      <ul className="">
        {props.items.map((song) => {
          <li key={song.id}>
            <SongItem
              titre={song.titre}
              artiste={song.artiste}
              album={song.album}
              duree={song.duree}
            >
              <RatingScale value={song.note} />
            </SongItem>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default SongList;
