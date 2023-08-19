import { useCallback, useState } from 'react';
import { IError } from '../types/Error.type';

export const useResetPasswordMutation = ({
  resetPasswordFn,
}: {
  resetPasswordFn: (data: {
    id: string;
    oldPassword: string;
    newPassword: string;
  }) => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const resetPassword = useCallback(
    async (data: { id: string; oldPassword: string; newPassword: string }) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError('');
        setIsSuccess(false);

        await resetPasswordFn?.(data);

        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        setError((e as IError).message.title);

        throw (e as IError).message.title;
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
