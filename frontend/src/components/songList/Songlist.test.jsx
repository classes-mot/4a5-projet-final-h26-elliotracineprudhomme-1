import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import SongList from "./SongList";

vi.mock("../songItem/SongItem", () => ({
  default: ({ titre, artiste }) => (
    <div>
      <h3>{titre}</h3>
      <p>{artiste}</p>
    </div>
  ),
}));

globalThis.fetch = vi.fn();
describe("Composant SongList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("affiche la liste de chansons après le fetch", async () => {
    const mockSongs = [
      {
        titre: "Crazy Train",
        artiste: "Ozzy Osbourne",
      },
      {
        titre: "Leper Mesiah",
        artiste: "Metallica",
      },
    ];
    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ songs: mockSongs }),
    });

    render(
      <MemoryRouter>
        <SongList/>
      </MemoryRouter>,
    );
    const songList = await screen.findAllByRole("song-list");
    expect(await screen.findByText("Crazy Train")).toBeInTheDocument();
    expect(await screen.findByText("Leper Mesiah")).toBeInTheDocument();
    expect(songList.length).toBe(2);
  });
});
