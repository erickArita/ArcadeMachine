import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";

import { RouterProvider } from "react-router-dom";
import { Router } from "./Router.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider>
      <main className="dark text-foreground bg-background  min-h-full ">
        <div className="w-full h-full">
          <RouterProvider router={Router} />
        </div>
      </main>
    </NextUIProvider>
  </React.StrictMode>
);
