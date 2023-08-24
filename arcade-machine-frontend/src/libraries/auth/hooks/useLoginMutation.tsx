import { useCallback, useState } from "react";
import { IError } from "../types/Error.type";
import { CustomError } from "../../../services/authFunctions";

export interface ILoginResponse {
  access_token: string;
  expired_in: Date;
  error?: CustomError[];
}

interface ILoginMutation {
  customLoginFn: (data: {
    username: string;
    password: string;
  }) => Promise<ILoginResponse>;
}

export const useLoginMutation = ({ customLoginFn }: ILoginMutation) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [data, setData] = useState<ILoginResponse | undefined>(undefined);

  const login = useCallback(
    async (data: {
      username: string;
      password: string;
    }): Promise<ILoginResponse> => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError("");
        setIsSuccess(false);

        const res = await customLoginFn(data);

        const { access_token, expired_in } = res;

        setData({
          access_token: access_token,
          expired_in: expired_in,
        });
        setIsSuccess(true);
        setIsLoading(false);

        return {
          access_token: access_token,
          expired_in: expired_in,
        };
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        setError((e as IError).message.description);

        throw (e as IError).message;
      }
    },
    [customLoginFn]
  );

  return {
    login,
    isLoading,
    isError,
    error,
    isSuccess,
    data,
  };
};
