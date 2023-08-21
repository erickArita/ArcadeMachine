import { FC, PropsWithChildren } from "react";
import { Section } from "./Section";
import { Navbar } from "./Navbar";
import { HeaderWaves } from "./HeaderWaves";
import { useAuth } from "../libraries/auth";
import { useUser } from "../providers/UserProvider";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { logOut } = useAuth();

  const { user } = useUser();
  return (
    <Section className="w-full bg-white flex flex-col">
      <HeaderWaves />
      <Navbar cerrarSesion={logOut} userName={user?.username ?? ""} />
      {children}
    </Section>
  );
};
