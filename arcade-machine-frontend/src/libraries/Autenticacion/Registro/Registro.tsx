import { Input } from "@nextui-org/react";
import "./registro.css";
import { Section } from "../../../components/Section";
import { LoginRegistroBase } from "../../../components/LoginRegistroBase/LoginRegistroBase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./registroSchema";
import { useAuth } from "../../auth";
import { Navigate } from "react-router-dom";
import { CustomError } from "../../../services/authFunctions";

interface IFormInputs {
  userName: string;
  email: string;
  password: string;
}

const filterErrors = (errors: CustomError[]) => {
  const errorByField: Record<string, string[]> = {
    password: [],
    email: [],
    userName: [],
  };

  errors.forEach((error) => {
    if (error.code.includes("Password")) {
      errorByField.password.push(error.description as unknown as string);
    }
    if (error.code.includes("Email")) {
      errorByField.email.push(error.description as unknown as string);
    }
    if (error.code.includes("UserName")) {
      errorByField.userName.push(error.description as unknown as string);
    }
  });

  return errorByField;
};

export const Registro = () => {
  const { register: onRegister, isAuthenticated, errors } = useAuth();
  const { handleSubmit, register, formState } = useForm<IFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (e: IFormInputs) => {
    onRegister(e);
  };

  const { email, password, userName } = filterErrors(errors);

  if (isAuthenticated) {
    return <Navigate to="/" state={{ fromLogin: true }} />;
  }

  return (
    <Section>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <LoginRegistroBase title="Registrarse">
          <Input
            labelPlacement="outside"
            type="text"
            label="Usuario"
            placeholder="Ingresa tu nombre de usuario"
            size="lg"
            radius="sm"
            {...register("userName")}
            errorMessage={formState.errors.userName?.message || userName[0]}
          />
          <Input
            labelPlacement="outside"
            type="text"
            label="Correo"
            placeholder="Ingresa tu correo electronico"
            size="lg"
            radius="sm"
            {...register("email")}
            errorMessage={formState.errors.email?.message || email[0]}
          />
          <Input
            labelPlacement="outside"
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            size="lg"
            radius="sm"
            {...register("password")}
            errorMessage={formState.errors.password?.message || password[0]}
          />
        </LoginRegistroBase>
      </form>
    </Section>
  );
};
