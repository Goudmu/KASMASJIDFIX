"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import SignIn from "./login";

const HomeProvider = () => {
  return (
    <SessionProvider>
      <SignIn />
    </SessionProvider>
  );
};

export default HomeProvider;
