import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import NavLinks from "./NavLinks";
import { AuthContext } from "../../context/app-context.js";
import { MemoryRouter } from "react-router-dom";

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
                <MemoryRouter>
                    <NavLinks />
                </MemoryRouter>
            </AuthContext.Provider >);

    });
    expect(screen.getAllByAltText("link-to-main")).toBeInTheDocument(); // option pour ajouter une chanson
    expect(screen.getAllByAltText("link-to-login")).toBeInTheDocument(); // option pour se déconnecter
});

describe("Composant NavLinks", () => {
    it("affiche les éléments demandés lorsque l'utilisateur est connecté", () => {
        render(
            <AuthContext.Provider value={mockAuthContextLoggedIn}>
                <MemoryRouter>
                    <NavLinks />
                </MemoryRouter>
            </AuthContext.Provider >);

    });
    expect(screen.getAllByAltText("link-to-add")).toBeInTheDocument(); // option pour ajouter une chanson
    expect(screen.getAllByAltText("link-to-logout")).toBeInTheDocument(); // option pour se déconnecter
});