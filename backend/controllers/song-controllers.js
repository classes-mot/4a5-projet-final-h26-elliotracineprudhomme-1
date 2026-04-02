import HttpError from "../util/http-error.js";
import { validationResult } from "express-validator";
import { Song } from "../models/song.js";

// méthode pour obtenir les chansons :
const getSongs = async (req, res, next) => {
  let songs;
  try {
    songs = await Song.find();
  } catch (err) {
    console.log(err);
    const erreur = new HttpError("Une erreur s'est produite.", 500);
    return next(err);
  }
  if (!songs) {
    return next(new HttpError("Les chansons n'ont pas été trouvés.", 404));
  }
  res.json({ chansons: songs.map((song) => song.toObject({ getters: true })) });
};

// méthode pour obtenir une chanson spécifique :
const getSongById = async (req, res, next) => {
  const songID = req.params.songID;

  let song;
  try {
    song = await Song.findById(songID);
  } catch (err) {
    console.log(err);
    const erreur = new HttpError("Une erreur s'est produite.", 500);
    return next(err);
  }

  if (!song) {
    return next(new HttpError("La chanson n'a pas été trouvée ...", 404));
  }

  res.json({ chanson: song.toObject({ getters: true }) });
};

// méthode pour créer une chanson :
const createSong = async (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    console.log("Une erreur s'est produite ... ", validationErrors);
    return next(
      new HttpError(
        "Les informations saisies ne sont pas valides. Vérifiez votre payload.",
        422,
      ),
    );
  }
  const { titre, album, annee, duree, note, artiste, lien } =
    req.body;
  const createdSong = new Song({
    titre,
    album,
    annee,
    duree,
    note,
    artiste,
    lien,
  });
  // ajout de la chanson dans la base de données :
  try {
    await createdSong.save();
  } catch (err) {
    const erreur = new HttpError(
      "l'ajout de la chanson dans la base de données a échoué.",
      500,
    );
  }
  // la chanson a été créée avec succès :
  res.status(201).json({ chanson: createdSong });
};

// méthode pour supprimer une chanson :
const deleteSong = async (req, res, next) => {
  const songID = req.params.songID;
  let song;
  try {
    song = await Song.findByIdAndDelete(songID);

    if (!song) {
      return res.status(404).json({ msg: "La chanson est introuvable." });
    }
    // la chanson a été supprimée avec succès :
    res.status(200).json({ msg: "La chanson a été supprimée." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Erreur lors de la suppression de la chanson." });
  }
};

// méthode pour modifier une chanson :
const updateSong = async (req, res, next) => {
  const songtoUpdate = req.body;
  const songID = req.params.songID;

  try {
    const updatedSong = await Song.findByIdAndUpdate(songID, songtoUpdate, {
      new: true,
    });
    if (!updatedSong) {
      return res.status(404).json({ message: "La chanson est introuvable." });
    }
    // la chanson a été mise à jour avec succès :
    res.status(200).json({ chanson: updatedSong.toObject({ getters: true }) });
  } catch (err) {
    res.status(500).json({ msg: "Erreur lors de la modification de la chanson." });
  }
};

export default {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
