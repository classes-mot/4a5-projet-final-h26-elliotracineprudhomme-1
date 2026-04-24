import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import SongList from "./SongList";
import i18n from "../../../i18nTest.js";
import { I18nextProvider } from "react-i18next";

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
        <I18nextProvider i18n={i18n}>
        <SongList/>
        </I18nextProvider>
    );
  waitFor(() => {  expect(screen.findByText("Crazy Train")).toBeInTheDocument();});
  waitFor(() => {  expect(screen.findByText("Leper Mesiah")).toBeInTheDocument();});
  });
});
