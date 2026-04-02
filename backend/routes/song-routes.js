import express from "express";
import { check } from "express-validator";
import songsController from "../controllers/song-controllers.js";
import checkAuth from "../middleware/check-auth.js";

const songRoutes = express.Router();

songRoutes.get("/", songsController.getSongs);
songRoutes.get("/:songID", songsController.getSongById);
songRoutes.patch(
  "/:songID",
  checkAuth,
  [
    check("titre").not().isEmpty(),
    check("album").not().isEmpty(),
    check("annee").not().isEmpty(),
    check("duree").not().isEmpty(),
    check("note").not().isEmpty(),
    check("artiste").not().isEmpty(),
    check("lien").not().isEmpty(),
  ],
  songsController.updateSong,
);
songRoutes.delete("/:songID", checkAuth, songsController.deleteSong);
songRoutes.post(
  "/",
  checkAuth,
  [
    check("titre").not().isEmpty(),
    check("album").not().isEmpty(),
    check("annee").not().isEmpty(),
    check("duree").not().isEmpty(),
    check("note").not().isEmpty(),
    check("artiste").not().isEmpty(),
    check("lien").not().isEmpty(),
  ],
  songsController.createSong,
);

export default songRoutes;
