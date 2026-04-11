import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";

export function useAuth() {
  const Context = useContext(AuthContext);

  return Context;
}
