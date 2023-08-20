import { Button, Image } from "@nextui-org/react";
import { UserIcon } from "./iconst";

interface NavbarProps {
  userName?: string;
}

export const Navbar = ({ userName = "Erick_Ar" }: NavbarProps) => (
  <nav className="flex justify-between w-full px-unit-4xl items-center">
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
        radius="sm"
        size="lg"
      >
        Cerrar Sesión
      </Button>
    </div>
  </nav>
);
