import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import { RouterProvider } from "react-router-dom";
import { Router } from "./Router.tsx";
import "./index.css";
import { AuthenticationProvider } from "./libraries/auth/index.ts";
import { login, register } from "./services/authFunctions.ts";
import { Provider } from "react-redux";
import store from "./store/store.ts";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <div>
        <Toaster />
      </div>
      <Provider store={store}>
        <AuthenticationProvider
          customLoginFn={login}
          customRegisterFn={register}
        >
          <main className="dark  text-foreground bg-background  min-h-full ">
            <div className="w-full h-full">
              <RouterProvider router={Router} />
            </div>
          </main>
        </AuthenticationProvider>
      </Provider>
    </NextUIProvider>
  </React.StrictMode>
);
