import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SongItem from "./SongItem";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../context/app-context";
import "@testing-library/jest-dom";

const testSong = {
  titre: "unTitre",
  album: "",
  annee: 0,
  duree: "",
  note: 0,
  artiste: "unArtiste",
  lien: "",
};

const context = {
  isLoggedIn: true,
  login: vi.fn(),
  logout: vi.fn(),
};
describe("SongItem", () => {
  it("affiche le titre et l'artiste fourni", () => {
    render(
      <AuthContext.Provider value={context}>
        <MemoryRouter>
          <SongItem
            titre={testSong.titre}
            album={testSong.album}
            annee={testSong.annee}
            duree={testSong.duree}
            note={testSong.note}
            artiste={testSong.artiste}
            lien={testSong.lien}
          />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText(testSong.titre)).toBeInTheDocument();
    expect(screen.getByText(testSong.artiste)).toBeInTheDocument();
  });
});

describe("SongItem", () => {
  it("affiche la section d'option selon le context", () => {
    render(
      <AuthContext.Provider value={context}>
        <MemoryRouter>
          <SongItem
            titre={testSong.titre}
            album={testSong.album}
            annee={testSong.annee}
            duree={testSong.duree}
            note={testSong.note}
            artiste={testSong.artiste}
            lien={testSong.lien}
          />
        </MemoryRouter>
      </AuthContext.Provider>,
    );
    expect(screen.getByText("...")).toBeInTheDocument(); // le bouton
    expect(screen.getByAltText("delete-song-button")).toBeInTheDocument(); // l'image
  });
});
