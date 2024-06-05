"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import SignatureForm from "./signatureForm";

const SignatureProvider = () => {
  return (
    <SessionProvider>
      <SignatureForm />
    </SessionProvider>
  );
};

export default SignatureProvider;
