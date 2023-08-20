import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "..";

export const RequiredAuth = ({
  children,
  loaderComponent,
  redirectTo,
}: PropsWithChildren<{
  loaderComponent: JSX.Element;
  redirectTo?: string;
}>) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to={redirectTo ? redirectTo : "/login"} replace />;
  }

  if (isLoading) return loaderComponent;

  return <> {children} </>;
};
