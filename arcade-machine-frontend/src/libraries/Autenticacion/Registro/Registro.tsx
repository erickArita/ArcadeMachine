import { Input } from "@nextui-org/react";
import { LoginRegistroBase } from "../../../components/LoginRegistroBase";
import "./registro.css";
import { Section } from "../../../components/Section";
export const Registro = () => (
  <Section>
    <LoginRegistroBase title="Registrarse">
      <Input
        labelPlacement="outside"
        type="text"
        label="Usuario"
        placeholder="Ingresa tu nombre de usuario"
        size="lg"
        radius="sm"
      />
      <Input
        labelPlacement="outside"
        type="text"
        label="Correo"
        placeholder="Ingresa tu correo electronico"
        size="lg"
        radius="sm"
      />
      <Input
        labelPlacement="outside"
        type="password"
        label="Contraseña"
        placeholder="Ingresa tu contraseña"
        size="lg"
        radius="sm"
      />
    </LoginRegistroBase>
  </Section>
);
