"use client";

import { SessionProvider } from "next-auth/react";

type AuthContextProps = {
  children: React.ReactNode;
};

export const AuthContext: React.FC<AuthContextProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
