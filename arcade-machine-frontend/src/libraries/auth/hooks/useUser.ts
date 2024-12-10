import { use } from "react";
import { UserContext } from "../../../providers/UserProvider";

export const useUser = () => {
  const context = use(UserContext);
  if(!context) {
    throw new Error("useUser debe estar dentro del proveedor UserProvider");
  }
  return context;
};
