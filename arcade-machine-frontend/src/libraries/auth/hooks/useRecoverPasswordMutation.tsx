import { useCallback, useState } from 'react';
import { IError } from '../types/Error.type';

export const useRecoverPasswordMutation = ({
  recoverPasswordFn,
}: {
  recoverPasswordFn: (data: { email: string }) => Promise<void>;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const recoverPassword = useCallback(
    async (data: { email: string }) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError('');
        setIsSuccess(false);

        await recoverPasswordFn?.(data);

        setIsSuccess(true);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        setError((e as IError).message.title);

        throw (e as IError).message.title;
      }
    },
    [recoverPasswordFn]
  );

  return {
    recoverPassword,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
