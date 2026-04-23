import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SongItem from "./SongItem";
import "@testing-library/jest-dom";
import { AuthContext } from "../../context/app-context.js";
import { MemoryRouter } from "react-router-dom";

describe("Composant SongItem", () => {
  it("affiche le titre fourni", () => {
    render(<SongItem title="Crazy Train" />);
    expect(screen.getByText("Crazy Train")).toBeInTheDocument();
  });
  it("affiche le titre, l'album et l'artiste fourni", () => {
    const testSong = {
      titre: "Crazy Train",
      album: "Blizzard of Ozz",
      annee: 1980,
      duree: "4min53sec",
      note: 4,
      artiste: "Ozzy Osbourne",
      lien: "https://open.spotify.com/intl-fr/track/7ACxUo21jtTHzy7ZEV56vU?si=f017384dac48455d",
    };

    render(
      <SongItem
        titre={testSong.titre}
        album={testSong.album}
        annee={testSong.annee}
        duree={testSong.duree}
        note={testSong.note}
        artiste={testSong.artiste}
        lien={testSong.lien}
      />,
    );

    expect(screen.getByText(testSong.titre)).toBeInTheDocument(); // le titre
    expect(screen.getByText(testSong.album)).toBeInTheDocument(); // l'album
    expect(screen.getByText(testSong.artiste)).toBeInTheDocument(); // l'artiste
  });
  it("Utilisateur connecté - affiche les options de modification et suppression", () => {
    const testSong = {
      titre: "Crazy Train",
      album: "Blizzard of Ozz",
      annee: 1980,
      duree: "4min53sec",
      note: 4,
      artiste: "Ozzy Osbourne",
      lien: "https://open.spotify.com/intl-fr/track/7ACxUo21jtTHzy7ZEV56vU?si=f017384dac48455d",
    };
    const mockAuthContextLoggedIn = {
      isLoggedIn: true,
      userId: null,
      token: null,
      login: vi.fn(),
      logout: vi.fn(),
    };

    render(
      <AuthContext.Provider value={mockAuthContextLoggedIn}>
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
  });
});
