import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { deleteToken } from "../libraries/auth/helpers/Token.helper";

export interface IError {
  Errors: string;
  StatusCode: number;
  Title: string;
}

export const ErrorLoggerMiddleware: Middleware =
  //@ts-ignore
  () => (next) => (action: Record<string, any>) => {
    const error = action?.payload?.data as unknown as IError;
    if (isRejectedWithValue(action)) {
      if (error?.StatusCode === 500) {
        toast.error(
          "Ocurrió un error en el servidor, por favor intente más tarde",
          {
            id: error?.StatusCode.toString(),
          }
        );
      }

      next(action);
    }

    if (error?.StatusCode) {
      toast.error(error?.Errors, { id: error?.StatusCode.toString() });
    }

    if (error?.Title?.toLowerCase().includes("Unauthorized".toLowerCase())) {
      deleteToken();
    }

    return next(action);
  };
