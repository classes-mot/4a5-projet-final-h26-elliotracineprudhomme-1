import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  album: { type: String, required: true },
  annee: { type: Number, required: true },
  duree: { type: String, required: true },
  note: { type: Number, required: true },
  artiste: { type: String, required: true },
  lien: { type: String, required: true },
});
export const Song = mongoose.model("Song", songSchema);
