import { FC, PropsWithChildren } from "react";

export const Section: FC<
  PropsWithChildren & {
    className?: string;
    style?: React.CSSProperties;
  }
> = ({ children, className, style }) => {
  return (
    <section style={style} className={`h-full ${className}`}>
      {children}{" "}
    </section>
  );
};
