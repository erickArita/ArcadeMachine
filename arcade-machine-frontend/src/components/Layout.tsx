import { FC, PropsWithChildren } from "react";
import { Section } from "./Section";
import { Navbar } from "./Navbar";
import { HeaderWaves } from "./HeaderWaves";

export const Layout: FC<PropsWithChildren> = ({ children }) => (
  <Section className="w-full bg-white flex flex-col">
    <HeaderWaves />
    <Navbar />
    {children}
  </Section>
);
