"use client";

import { User } from "@/models/user";
import { createContext, useContext, useState } from "react";

type LoggedInUserContextProviderProps = {
  children: React.ReactNode;
};

type LoggedInUserContext = {
  loggedInUser: User | null;
  setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const LoggedInUserContext = createContext<LoggedInUserContext | null>(null);

const LoggedInUserContextProvider = ({
  children,
}: LoggedInUserContextProviderProps) => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <LoggedInUserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserContextProvider;

export function useLoggedInUserContext() {
  const context = useContext(LoggedInUserContext);
  if (!context) {
    throw new Error(
      "useLoggedInUserContext must be used within a LoggedInUserProvider"
    );
  }

  return context;
}
