"use client";
import { SessionProvider } from "next-auth/react";

const UserPageProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default UserPageProvider;
