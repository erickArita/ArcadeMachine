import { Button, Image } from "@nextui-org/react";
import { UserIcon } from "./iconst";

interface NavbarProps {
  userName?: string;
  cerrarSesion?: () => void;
}

export const Navbar = ({
  userName = "Erick_Ar",
  cerrarSesion,
}: NavbarProps) => (
  <nav className="flex justify-between container mx-auto  items-center">
    <Image src="/LogoGif.gif" width={60} alt="Logo" />

    <div className="flex items-center gap-4">
      <UserIcon />
      <p className="text-black text-md font-bold">{userName}</p>
      <Button
        className="bg-gradient-to-tr
      from-pink-500
      to-yellow-500
      font-semibold
      text-white shadow-lg"
        onClick={cerrarSesion}
        radius="sm"
        size="lg"
      >
        Cerrar Sesión
      </Button>
    </div>
  </nav>
);
