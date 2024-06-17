import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type UserContextType =
  | {
      session: Session | null;
      isLoading: boolean;
    }
  | undefined;

export const UserContext = createContext<UserContextType>(undefined);

export function useUserContext() {
  const user = useContext(UserContext);

  if (user === undefined) {
    throw new Error("No User");
  }
  return user;
}
