import { useState } from "react";
import "./SongList.css";
import Category from "../category/Category";
import SongItem from "../songItem/SongItem";
import RatingScale from "../ratingScale/RatingScale";
// simplifier ****************
const SongList = () => {
const songs = [
  {
    titre: "The Dying Illusion",
    album: "Chapter VI",
    annee: 2008,
    duree: "5min52sec",
    note: 9,
    artiste: "Candlemass",
    lien: "https://open.spotify.com/intl-fr/track/4PiRCQMRUUpVOHLP9LiW5f?si=6013ccc013944b4a",
  },
  {
    titre: "Crazy Train",
    album: "Blizzard of Ozz",
    annee: 1980,
    duree: "4min53sec",
    note: 9,
    artiste: "Ozzy Osbourne",
    lien: "https://open.spotify.com/intl-fr/track/7ACxUo21jtTHzy7ZEV56vU?si=f4effc4d3de54f15",
  },
];
if (songs == undefined) {
  return (<div className="song-error-card">
    <h3>Oh oh ...</h3>
    <p>Il n'y a aucune chanson.</p>
  </div>)
}
  return (
    <div className="">
        <ul className="">
          {songs.map((song) => {
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
