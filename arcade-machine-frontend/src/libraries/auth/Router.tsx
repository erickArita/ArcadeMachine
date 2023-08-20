import { Outlet, createBrowserRouter } from "react-router-dom";
import { RequiredAuth } from ".";
import { Layout } from "../../components/Layout";
import { Login } from "../Autenticacion/Login/Login";
import { Registro } from "../Autenticacion/Registro/Registro";
import { CardContainer } from "../games/CardContainer/CardContainer";

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
        <Layout>
          <Outlet />
        </Layout>
      </RequiredAuth>
    ),
    children: [
      {
        index: true,
        element: <CardContainer />,
      },
    ],
  },
]);
