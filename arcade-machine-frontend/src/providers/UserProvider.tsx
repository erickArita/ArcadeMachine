import { FC, PropsWithChildren, createContext, useContext } from "react";
import { useGetUserDataQuery } from "../features/api/autentication/autorizacion";
import { AuthenticationResponse } from "../features/api/autentication/models/Autenticationresponse";

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
  const { data, isFetching } = useGetUserDataQuery();
  return (
    <UserContext.Provider
      value={{
        user: data,
        isLoading: isFetching,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
