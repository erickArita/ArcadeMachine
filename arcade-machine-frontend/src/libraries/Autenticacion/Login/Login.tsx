import { Navigate, useNavigate } from "react-router-dom";
import { LoginRegistroBase } from "../../../components/LoginRegistroBase";
import { Input } from "@nextui-org/react";
import { Section } from "../../../components/Section";
import { useAuth } from "../../auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./loginSchema";

interface IFormInputs {
  userName: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, register, formState } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const { login, isAuthenticated } = useAuth();

  const onCrearCuenta = () => {
    navigate("/registro");
  };

  const onSubmit = async (data: IFormInputs) => {
    await login({
      email: data.userName,
      password: data.password,
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" state={{ fromLogin: true }} />;
  }

  const userRegister = register("userName");
  const passwordRegister = register("password");

  return (
    <Section>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <LoginRegistroBase
          title="Bienvenido a ArcadeMachine!"
          onCrearCuenta={onCrearCuenta}
          isLogin
        >
          <Input
            labelPlacement="outside"
            type="text"
            label="Usuario"
            placeholder="Ingresa tu nombre de usuario"
            size="lg"
            radius="sm"
            {...userRegister}
            errorMessage={formState.errors.userName?.message}
          />
          <Input
            labelPlacement="outside"
            type="password"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            size="lg"
            radius="sm"
            {...passwordRegister}
            errorMessage={formState.errors.password?.message}
          />
        </LoginRegistroBase>
      </form>
    </Section>
  );
};
