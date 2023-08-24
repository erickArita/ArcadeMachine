import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
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
  const { isLoading, token } = useAuth();
  const { data, isFetching } = useGetUserDataQuery(undefined, {
    skip: isLoading || !token,
  });

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
