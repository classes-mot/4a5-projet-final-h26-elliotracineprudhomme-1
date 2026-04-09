import { useState } from "react";
import "./SongList.css";
import Category from "../category/Category";
import SongItem from "../songItem/SongItem.jsx";
import RatingScale from "../ratingScale/RatingScale";
import { Link } from "react-router-dom";
import deleteSong from "../../assets/img/X.png";
// simplifier ****************
const songs = [
  {
    id: 1,
    titre: "The Dying Illusion",
    album: "Chapter VI",
    annee: 2008,
    duree: "5min52sec",
    note: 5,
    artiste: "Candlemass",
    lien: "https://open.spotify.com/intl-fr/track/4PiRCQMRUUpVOHLP9LiW5f?si=6013ccc013944b4a",
  },
  {
    id: 2,
    titre: "Crazy Train",
    album: "Blizzard of Ozz",
    annee: 1980,
    duree: "4min53sec",
    note: 4,
    artiste: "Ozzy Osbourne",
    lien: "https://open.spotify.com/intl-fr/track/7ACxUo21jtTHzy7ZEV56vU?si=f4effc4d3de54f15",
  },
];
const SongList = () => {
  if (songs == undefined) {
    return (
      <div className="song-error-card">
        <h3>Oh oh ...</h3>
        <p>Il n'y a aucune chanson.</p>
      </div>
    );
  }
  return (
    <>
      <ul className="song-list">
        <li className="song-card">
          <div className="song-card-upper-section">
            <h2>{songs[0].titre}</h2>
            <p>{songs[0].artiste}</p>
            <p>○</p>
            <p>{songs[0].album}</p>
            <p id="length">{songs[0].duree}</p>
          </div>
          <div className="song-card-lower-section">
            <RatingScale value={songs[0].note} />
            <div className="song-card-options">
              <Link to={`/edit/${songs[0].id}`}>
                <button>...</button>
              </Link>
              <img src={deleteSong} alt="delte-icon" />
            </div>
          </div>
        </li>
        <li className="song-card">
          <div className="song-card-upper-section">
            <h2>{songs[1].titre}</h2>
            <p>{songs[1].artiste}</p>
            <p>○</p>
            <p>{songs[1].album}</p>
            <p id="length">{songs[1].duree}</p>
          </div>
          <div className="song-card-lower-section">
            <RatingScale value={songs[1].note} />
            <div className="song-card-options">
              <Link to={`/edit/${songs[0].id}`}>
                <button>...</button>
              </Link>
              <img src={deleteSong} alt="delete-icon"/>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default SongList;
