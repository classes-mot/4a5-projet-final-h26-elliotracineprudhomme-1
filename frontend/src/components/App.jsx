import RootLayout from "./containers/RootLayout";
import ErrorPage from "./containers/ErrorPage";
import CreateSongForm from "./songForm/CreateSongForm.jsx";
import ModifySongForm from "./songForm/ModifySongForm.jsx";
import RegisterForm from "./register/RegisterForm";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../context/app-context.js";
import SongList from "./songList/SongList.jsx";
import LoginForm from "./login/LoginForm.jsx";

const routerLoggedIn = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <SongList /> },
      { path: "/songs", element: <SongList /> },
      { path: "/edit/:songID", element: <ModifySongForm /> },
      { path: "/add", element: <CreateSongForm /> },
      { path: "/login", element: <Navigate to="/songs" replace /> },
      { path: "/register", element: <Navigate to="/songs" replace /> },
    ],
  },
]);

const routerLoggedOut = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <SongList /> },
      { path: "/songs", element: <SongList /> },
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },
]);

const App = () => {
  const storedIsLoggedIn = sessionStorage.getItem("isLoggedIn");
  const storedUserId = sessionStorage.getItem("userId");

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    storedIsLoggedIn === "true" ? true : false,
  );

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    setIsLoggedIn(true);
    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("userId", uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setIsLoggedIn(false);
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.setItem("userId", null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userId,
        login,
        logout,
      }}
    >
      <RouterProvider router={isLoggedIn ? routerLoggedIn : routerLoggedOut} />
    </AuthContext.Provider>
  );
};

export default App;
