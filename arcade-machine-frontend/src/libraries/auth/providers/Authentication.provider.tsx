import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/authContext";
import {
  decodeToken,
  deleteToken,
  getToken,
  setToken,
} from "../helpers/Token.helper";
import { workerTask } from "../helpers/validationWorker";
import { ILoginResponse, useLoginMutation } from "../hooks/useLoginMutation";
import { useTaskScheduler } from "../hooks/useTaskSheduler";
import { ILoginFormRequest } from "../types/LogInRequest.type";
import { useInterval } from "../hooks/useInterval";
import { IRegisterFormRequest } from "../types/RegisterRequest";

interface IAuthenticationProvider {
  customLoginFn: (data: {
    username: string;
    password: string;
  }) => Promise<ILoginResponse>;
  refreshTokenFn?: (refreshToken: string) => Promise<ILoginResponse>;
  customRegisterFn: (data: IRegisterFormRequest) => Promise<ILoginResponse>;
  isDev?: boolean;
}

export const AuthenticationProvider: FC<
  PropsWithChildren<IAuthenticationProvider>
> = ({ children, customLoginFn, refreshTokenFn, isDev, customRegisterFn }) => {
  const { isAuthenticated, isExpiredToken, expireTime, refreshToken } =
    getToken();

  const [localIsAuthenticated, setLocalIsAuthenticated] =
    useState<boolean>(isAuthenticated);

  const [isLoading, setLoading] = useState<boolean>(false);

  const { login } = useLoginMutation({
    customLoginFn,
  });

  const handleLogout = useCallback(() => {
    if (isDev) {
      return;
    }
    deleteToken();
    setLocalIsAuthenticated(false);
  }, [isDev]);

  // Verify if the token its valid when the user enters the app
  const verifyToken = useCallback(() => {
    const { isAuthenticated } = getToken();

    setLocalIsAuthenticated(isAuthenticated);

    if (!isAuthenticated) {
      handleLogout();
      return;
    }
  }, [handleLogout]);

  //Validate is token is expired
  useEffect(() => {
    setLoading(true);
    verifyToken();
    setLoading(false);
  }, [verifyToken]);

  useInterval({
    callback: () => {
      verifyToken();
    },
    delay: 5000,
    stop: !localIsAuthenticated,
  });

  const handleRefreshToken = useCallback(
    async (refreshToken: string) => {
      if (!refreshTokenFn) {
        return;
      }
      try {
        console.log(refreshToken);

        const newCredentials = await refreshTokenFn(refreshToken);
        handleLogin(newCredentials.access_token);
      } catch (error) {
        handleLogout();
      }
    },
    [handleLogout, refreshTokenFn]
  );

  const launchTask = useTaskScheduler({
    name: "verifyToken",
    timeMs: expireTime,
  });

  useEffect(() => {
    if (!localIsAuthenticated || !isExpiredToken) {
      return;
    }

    launchTask(
      () => workerTask("verifyToken"),
      () => handleRefreshToken(refreshToken as string)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expireTime, localIsAuthenticated]);

  const handleLogin = (accessToken: string) => {
    const { exp } = decodeToken(accessToken);
    setToken(accessToken, exp);
    setLocalIsAuthenticated(true);
  };

  const onLogin = async ({ email: username, password }: ILoginFormRequest) => {
    setLoading(true);
    try {
      const { access_token } = await login({
        username,
        password,
      });
      if (access_token) handleLogin(access_token);
      setLoading(false);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  const onRegister = async ({
    email,
    password,
    userName: useaname,
  }: IRegisterFormRequest) => {
    setLoading(true);
    try {
      const { access_token } = await customRegisterFn({
        email,
        password,
        userName: useaname,
      });
      if (access_token) handleLogin(access_token);
      setLoading(false);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        logOut: handleLogout,
        login: onLogin,
        isAuthenticated: localIsAuthenticated,
        isLoading: isLoading,
        register: onRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
