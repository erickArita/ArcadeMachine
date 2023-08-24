import React, { PropsWithChildren } from "react";

interface Props {
  condition: boolean;
  children: React.ReactNode;
}

export const RenderIf = ({ children, condition }: PropsWithChildren<Props>) => {
  return condition ? <>{children}</> : null;
};
