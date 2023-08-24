import { FC, PropsWithChildren, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useGetUserDataQuery } from "../features/api/autentication/autorizacion";
import { useAuth } from "../libraries/auth";
import { AuthenticationResponse } from "../features/api/autentication/models/AutenticationResponse";
import { Loader } from "../components/Loader";

interface UserProviderProps {
  user: AuthenticationResponse | undefined;
  isLoading: boolean;
}

const UserContext = createContext<UserProviderProps | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe estar dentro del proveedor UserProvider");
  }
  return context;
};

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { logOut, isLoading } = useAuth();
  const { data, isFetching, isError } = useGetUserDataQuery(undefined, {
    skip: isLoading,
  });
  console.log(isError);

  if (isError && !isLoading) {
    logOut();
    return <Navigate to="/" />;
  }

  return (
    <UserContext.Provider
      value={{
        user: data,
        isLoading: isFetching,
      }}
    >
      <Loader isLoading={isLoading}>{children}</Loader>
    </UserContext.Provider>
  );
};
