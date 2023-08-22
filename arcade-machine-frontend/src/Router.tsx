import { Outlet, createBrowserRouter } from "react-router-dom";
import { RequiredAuth } from "./libraries/auth";
import { Layout } from "./components/Layout";
import { Juegos } from "./features/Juegos";
import { Login } from "./libraries/Autenticacion/Login/Login";
import { Registro } from "./libraries/Autenticacion/Registro/Registro";
import { SignalRProvider } from "./providers/SignalProvider";
import { UserProvider } from "./providers/UserProvider";
import { GameLobbyFeature } from "./features/GameLobbyFeature";

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
            <Layout>
              <Outlet />
            </Layout>
          </SignalRProvider>
        </UserProvider>
      </RequiredAuth>
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
]);
