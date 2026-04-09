import Songs from "./containers/Songs.jsx";
import RootLayout from "./containers/RootLayout";
import ErrorPage from "./containers/ErrorPage";
import UpdateSong from "./containers/UpdateSong";
import NewSong from "./containers/NewSong";
import Auth from "./containers/Auth";
import RegisterForm from "./register/RegisterForm";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "../context/app-context.js";
import SongList from "./songList/SongList.jsx";

const routerLoggedIn = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <SongList /> },
      { path: "/songs", element: <SongList /> },
      { path: "/edit/:songID", element: <UpdateSong /> },
      { path: "/add", element: <NewSong /> },
      { path: "login", element: <Navigate to="/songs" replace /> },
      { path: "register", element: <Navigate to="/songs" replace /> },
    ],
  },
]);

const routerLoggedOut = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <SongList /> },
      { path: "/songs", element: <SongList /> },
      { path: "login", element: <Auth /> },
      { path: "register", element: <RegisterForm /> },
    ],
  },
]);

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);
  if (token !== null) {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: true,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <RouterProvider router={routerLoggedIn} />
      </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: false,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <RouterProvider router={routerLoggedOut} />
      </AuthContext.Provider>
    );
  }
};

export default App;
