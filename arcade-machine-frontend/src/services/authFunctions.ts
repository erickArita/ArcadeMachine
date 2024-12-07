/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from "react-hot-toast";
import { API_URL } from "../globals/environment";

export interface Auth {
  token: string;
  expiration: Date;
}

export interface BackendResponse<T> {
  status: string;
  data: T;
}

export const login = async ({
  password,
  username,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(API_URL + "/api/Authentication/Login", {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      userName: username,
      password: password,
    }),
  });
  const data = (await response.json()) as BackendResponse<Auth>;
  //@ts-ignore
  if (data?.value?.status === "Error") {
    //@ts-ignore
    toast.error(data.value.message);
  }

  return {
    access_token: data.data.token,
    expired_in: data.data.expiration,
  };
};

export interface CustomError {
  code: string;
  description: string;
}

export const register = async ({
  email,
  password,
  userName,
}: {
  userName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(API_URL + "/api/Authentication/register", {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: userName,
      password: password,
      email: email,
    }),
  });

  const data = (await response.json()) as BackendResponse<Auth>;
  let errors: CustomError[] = [];
  // @ts-ignore
  if (data?.value?.status === "Error") {
    // @ts-ignore
    if (data.value.data === null) {
      // @ts-ignore
      toast.error(data.value.message);
    } else {
      // @ts-ignore
      errors = data.value.data as CustomError[];
    }
    throw errors;
  }

  return {
    access_token: data.data.token,
    expired_in: data.data.expiration,
    errors: errors,
  };
};
