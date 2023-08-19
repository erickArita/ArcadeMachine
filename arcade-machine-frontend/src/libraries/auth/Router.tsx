import { Outlet, createBrowserRouter } from "react-router-dom";
import { RequiredAuth } from ".";
import { Login } from "../Autenticacion/Login/Login";
import { Registro } from "../Autenticacion/Registro/Registro";

const App = () => {
  return <div>Estoy Dentro</div>;
};

const OtroComponente = () => {
  return <div>Estoy Dentro</div>;
};

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
        <Outlet />
      </RequiredAuth>
    ),
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "otro",
        element: <OtroComponente />,
      },
    ],
  },
]);
