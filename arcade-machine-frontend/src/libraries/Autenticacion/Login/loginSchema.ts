import { string, object } from "yup";

export const loginSchema = object().shape({
  userName: string().required("El nombre de usuario es requerido"),
  password: string().required("La contraseña es requerida"),
});
