import { object, string } from "yup";

export const registerSchema = object().shape({
  userName: string().required("El nombre de usuario es requerido"),
  password: string().required("La contraseña es requerida"),
  email: string().email().required("El email es requerido"),
});
