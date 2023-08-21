import { Outlet, createBrowserRouter } from "react-router-dom";
import { RequiredAuth } from ".";
import { Layout } from "../../components/Layout";
import { Juegos } from "../../features/Juegos";
import { Login } from "../Autenticacion/Login/Login";
import { Registro } from "../Autenticacion/Registro/Registro";
import { SignalRProvider } from "../../providers/SignalProvider";
import { UserProvider } from "../../providers/UserProvider";

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
    ],
  },
]);
