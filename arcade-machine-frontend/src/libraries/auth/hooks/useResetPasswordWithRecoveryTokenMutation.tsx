import { useCallback, useState } from "react";
import { API_URL } from "../../../globals/environment";

export const useResetPasswordWithRecoveryTokenMutation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const resetPassword = useCallback(
    async (data: {
      recoveryToken: string;
      email: string;
      newPassword: string;
    }) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError("");
        setIsSuccess(false);

        const response = await fetch(
          `${API_URL}/auth/reset-password-with-recovery-token`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (!response.ok) {
          throw await response.json();
        }

        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        setError((e as { Errors: string }).Errors);

        throw (e as { Errors: string }).Errors;
      }
    },
    []
  );

  return {
    resetPassword,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
