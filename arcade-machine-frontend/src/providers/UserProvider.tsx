import {
  FC,
  PropsWithChildren,
  createContext} from "react";
import { Loader } from "../components/Loader";
import { useGetUserDataQuery } from "../features/api/autentication/autorizacion";
import { AuthenticationResponse } from "../features/api/autentication/models/AutenticationResponse";
import { useAuth } from "../libraries/auth";

interface UserProviderProps {
  user: AuthenticationResponse | undefined;
  isLoading: boolean;
}

export const UserContext = createContext<UserProviderProps | null>(null);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, token } = useAuth();
  const { data, isFetching } = useGetUserDataQuery(undefined, {
    skip: isLoading || !token,
  });

  return (
    <UserContext
      value={{
        user: data,
        isLoading: isFetching,
      }}
    >
      <Loader isLoading={isLoading}>{children}</Loader>
    </UserContext>
  );
};
