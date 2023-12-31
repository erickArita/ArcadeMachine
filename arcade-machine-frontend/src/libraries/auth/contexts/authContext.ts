import { createContext } from "react";
import { StateWithToken } from "../types/StateWithToken.type";
import { TCredentials } from "../types/Credentials.type";
import { IRegisterFormRequest } from "../types/RegisterRequest";
import { CustomError } from "../../../services/authFunctions";

type TInitStateWithLoader = Omit<StateWithToken, "token" | "isExpiredToken">;

type TInitialStateActions = {
  logOut: () => void;
  login: (params: TCredentials) => Promise<void>;
  register: (params: IRegisterFormRequest) => Promise<void>;
  token: string;
  errors: CustomError[];
};

const initialState = {} as TInitStateWithLoader & TInitialStateActions;

export const AuthContext = createContext<
  TInitStateWithLoader & TInitialStateActions
>(initialState);
