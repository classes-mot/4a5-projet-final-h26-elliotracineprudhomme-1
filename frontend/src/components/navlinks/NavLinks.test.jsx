import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import NavLinks from "./NavLinks";
import { AuthContext } from "../../context/app-context.js";
import { BrowserRouter } from "react-router-dom";
import i18n from "../../../i18nTest.js";
import { I18nextProvider } from "react-i18next";
const mockAuthContextLoggedOut = {
  isLoggedIn: true,
  userId: null,
  token: null,
  login: vi.fn(),
  logout: vi.fn(),
};
const mockAuthContextLoggedIn = {
  isLoggedIn: true,
  userId: null,
  token: null,
  login: vi.fn(),
  logout: vi.fn(),
};

describe("Composant NavLinks", () => {
  it("affiche les éléments demandés lorsque l'utilisateur est déconnecté", () => {
    render(
      <AuthContext.Provider value={mockAuthContextLoggedOut}>
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </AuthContext.Provider>,
    );
     waitFor(() => {
      expect(screen.getAllByAltText("link-to-songs")).toBeInTheDocument();
    }); // option pour ajouter une chanson
     waitFor(() => {
      expect(screen.getAllByAltText("link-to-login")).toBeInTheDocument();
    }); // option pour se déconnecter
  });

  it("affiche les éléments demandés lorsque l'utilisateur est connecté", () => {
    render(
      <AuthContext.Provider value={mockAuthContextLoggedIn}>
        <BrowserRouter>
          <NavLinks />
        </BrowserRouter>
      </AuthContext.Provider>,
    );
   waitFor(() => { expect(screen.getAllByAltText("link-to-add")).toBeInTheDocument(); });// option pour ajouter une chanson
   waitFor(() => { expect(screen.getAllByAltText("link-to-logout")).toBeInTheDocument();}); // option pour se déconnecter
  });
});

