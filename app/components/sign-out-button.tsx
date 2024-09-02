import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/db";

export default function SignOutButton() {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors font-semibold"
    >
      Sign Out
    </button>
  );
}
