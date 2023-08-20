import { Outlet, createBrowserRouter } from "react-router-dom";
import { RequiredAuth } from ".";
import { Login } from "../Autenticacion/Login/Login";
import { Registro } from "../Autenticacion/Registro/Registro";
import { CardContainer } from "../games/CardContainer/CardContainer";

const App = () => {
  return <div>Estoy Dentro</div>;
};

const OtroComponente = () => {
  return <div>Estoy Dentro</div>;
};

export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <CardContainer />,
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
        element: <CardContainer />,
      },
    ],
  },
]);
