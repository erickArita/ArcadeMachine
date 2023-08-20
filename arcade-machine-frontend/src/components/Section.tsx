import { FC, PropsWithChildren } from "react";

export const Section: FC<PropsWithChildren> = ({ children }) => {
  return <section className="h-full">{children} </section>;
};
