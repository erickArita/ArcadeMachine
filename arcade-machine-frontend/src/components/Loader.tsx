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
        <LoaderContaoner>
          <CircularProgress className="absolute" color="primary" />
        </LoaderContaoner>
      </RenderIf>
      <RenderIf condition={!isLoading}>{children}</RenderIf>
    </>
  );
};

export const LoaderContaoner = ({ children }: PropsWithChildren) => (
  <div className="relative flex justify-center items-center">{children}</div>
);
