import { Input } from "@nextui-org/react";
import "./registro.css";
import { Section } from "../../../components/Section";
import { LoginRegistroBase } from "../../../components/LoginRegistroBase/LoginRegistroBase";

export const Registro = () => {
  const onSubmit = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log(data);
  };

  return (
    <Section>
      <form onSubmit={onSubmit} className="h-full">
        <LoginRegistroBase title="Registrarse">
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
            type="text"
            label="Correo"
            placeholder="Ingresa tu correo electronico"
            size="lg"
            radius="sm"
            name="correo"
          />
          <Input
            labelPlacement="outside"
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            size="lg"
            radius="sm"
            name="contrasena"
          />
        </LoginRegistroBase>
      </form>
    </Section>
  );
};
