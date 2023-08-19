import { useNavigate } from "react-router-dom";
import { LoginRegistroBase } from "../../../components/LoginRegistroBase";
import { Input } from "@nextui-org/react";
import { Section } from "../../../components/Section";

export const Login = () => {
  const navigate = useNavigate();

  const onCrearCuenta = () => {
    navigate("/registro");
  };

  const onIniciarSesion = () => {
    console.log("Iniciar sesion");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <Section>
      <form onSubmit={onSubmit} className="h-full">
        <LoginRegistroBase
          title="Bienvenido a ArcadeMachine!"
          onCrearCuenta={onCrearCuenta}
          onIniciarSesion={onIniciarSesion}
          isLogin
        >
          <Input
            labelPlacement="outside"
            type="text"
            label="Usuario"
            placeholder="Ingresa tu nombre de usuario"
            size="lg"
            radius="sm"
            name="usuario"
          />
          <Input
            labelPlacement="outside"
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            size="lg"
            name="contrasena"
            radius="sm"
          />
        </LoginRegistroBase>
      </form>
    </Section>
  );
};
