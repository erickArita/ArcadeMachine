import { createBrowserRouter } from "react-router-dom";
import { Login } from "./libraries/Autenticacion/Login/Login";
import { Registro } from "./libraries/Autenticacion/Registro/Registro";

export const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
]);
