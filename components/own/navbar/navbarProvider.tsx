"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import NavbarComponent from "./navbar";

const NavbarProvider = () => {
  return (
    <SessionProvider>
      <NavbarComponent />
    </SessionProvider>
  );
};

export default NavbarProvider;
