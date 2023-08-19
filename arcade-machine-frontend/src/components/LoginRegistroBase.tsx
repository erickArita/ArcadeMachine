import { Button, Image } from "@nextui-org/react";
import { Section } from "./Section";

import "./loginRegistroBase.css";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface LoginRegistroBaseProps {
  title: string;
  onCrearCuenta?: () => void;
  onIniciarSesion?: () => void;
  isLogin?: boolean;
}

export const LoginRegistroBase = ({
  title,
  onCrearCuenta,
  onIniciarSesion,
  isLogin,
  children,
}: LoginRegistroBaseProps & PropsWithChildren) => (
  <div className="login h-full">
    <div className="seccion__left">
      <div className="w-1/2 lg:w-96  ">
        <Image src="/LogoGif.gif"  />
      </div>
    </div>
    <div className="section__right">
      <h1 className={`title ${isLogin ? "login" : "registro"}`}>{title}</h1>
      <div className="form">
        {children}
        {isLogin && (
          <Button
            radius="sm"
            color="secondary"
            size="lg"
            className="bg-gradient-to-tl
                    from-indigo-500
                    to-fuchsia-500
                    text-white
                      shadow-lg"
            onClick={onIniciarSesion}
            type="submit"
          >
            Iniciar sesión
          </Button>
        )}

        <Button
          className="bg-gradient-to-tr
          from-pink-500
          to-yellow-500
        text-white shadow-lg"
          radius="sm"
          size="lg"
          onClick={onCrearCuenta}
          type="button"
        >
          Crear Cuenta
        </Button>

        <div className="flex justify-end">
          {!isLogin && (
            <span>
              ◀
              <Link to="/login" className="hover:underline">
                Iniciar sesión
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);
