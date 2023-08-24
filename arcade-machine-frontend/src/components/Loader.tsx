import { PropsWithChildren } from "react";
import { RenderIf } from "./RenderIf";
import { CircularProgress } from "@nextui-org/react";

export const Loader = ({
  isLoading,
  children,
}: PropsWithChildren<{ isLoading?: boolean }>) => {
  return (
    <>
      <RenderIf condition={!!isLoading}>
        <CircularProgress color="primary" />
      </RenderIf>
      <RenderIf condition={!isLoading}>{children}</RenderIf>
    </>
  );
};
