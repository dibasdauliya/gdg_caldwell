"use client";

import React from "react";
import Header from "../components/header";
import Container from "../components/container";
import SignInButton from "../components/sign-in-button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/db";
import SignOutButton from "../components/sign-out-button";

export default function SignInPage() {
  const [user, userLoading, userErr] = useAuthState(auth);

  return (
    <>
      <Header />

      <main>
        <Container>
          <h1 className="text-3xl font-bold my-8">
            Sign In using your Caldwell Email Address
          </h1>

          {userLoading ? (
            <p>Loading...</p>
          ) : user ? (
            <SignOutButton />
          ) : (
            <SignInButton />
          )}
        </Container>
      </main>
    </>
  );
}
