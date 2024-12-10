import { Outlet, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { GameLobbyFeature } from "./features/Lobby/GameLobbyFeature";
import { Juegos } from "./features/Lobby/Juegos";
import { PiedraPepelpTijera } from "./features/Ppt/PiedraPepelpTijera";
import { Login } from "./libraries/Autenticacion/Login/Login";
import { Registro } from "./libraries/Autenticacion/Registro/Registro";
import { RequiredAuth } from "./libraries/auth";
import { SignalRProvider } from "./providers/SignalProvider";
import { UserProvider } from "./providers/UserProvider";
import { WavesProvider } from "./providers/WavesProvider";
import { Ahorcado } from "./features/Hangman/Ahorcado";

export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    element: (
      <RequiredAuth loaderComponent={<p>loading</p>}>
        <UserProvider>
          <SignalRProvider>
            <WavesProvider>
              <Outlet />
            </WavesProvider>
          </SignalRProvider>
        </UserProvider>
      </RequiredAuth>
    ),
    children: [
      {
        path: "/",
        element: (
          <Layout>
            <Outlet />
          </Layout>
        ),
        children: [
          {
            index: true,
            element: <Juegos />,
          },
          {
            path: ":tipoJuego",
            element: <GameLobbyFeature />,
          },
        ],
      },
      {
        path: "partida/:partidaId/:tipoJugador/piedra-papel-tijeras",
        element: (
          <Layout renderNavbar={false}>
            <PiedraPepelpTijera />
          </Layout>
        ),
      },
      {
        path: "partida/:partidaId/:tipoJugador/ahorcado",
        element: (
          <Layout renderNavbar={false}>
            <Ahorcado />
          </Layout>
        ),
      },
      {
        path: "/ahorcado",
        element: (
          <Layout renderNavbar={false}>
            <Ahorcado />
          </Layout>
        ),
      },
    ],
  },
]);
