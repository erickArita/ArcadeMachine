import { FC, PropsWithChildren } from "react";
import { Section } from "./Section";
import { Navbar } from "./Navbar";
import { HeaderWaves } from "./HeaderWaves";
import { useAuth } from "../libraries/auth";
import { useUser } from "../providers/UserProvider";
import { useWaves } from "../providers/WavesProvider";

interface LayoutProps {
  renderNavbar?: boolean;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children,
  renderNavbar = true,
}) => {
  const { logOut } = useAuth();

  const { user } = useUser();

  const { waveColor } = useWaves();
  return (
    <Section className="w-full bg-white flex flex-col">
      <HeaderWaves color={waveColor} />
      <span className={` ${renderNavbar && "pt-[180px]"} flex-1 flex flex-col`}>
        {renderNavbar && (
          <Navbar cerrarSesion={logOut} userName={user?.username ?? ""} />
        )}
        {children}
      </span>
    </Section>
  );
};
