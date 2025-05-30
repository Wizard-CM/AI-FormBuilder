"use client";
import { signIn, signOut } from "next-auth/react";
import React from "react";

const Appbar = () => {
  return (
    <div>
      <div
        onClick={() => {
          signIn();
        }}
      >
        Login
      </div>
      <div
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </div>
    </div>
  );
};

export default Appbar;
