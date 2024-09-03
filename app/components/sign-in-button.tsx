"use cilent";

import { signInWithPopup, signOut } from "firebase/auth";
import React from "react";
import { auth, firebaseDB, provider } from "../utils/db";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function SignInButton() {
  const router = useRouter();

  async function handleSignIn() {
    console.log("Sign in with Google");

    try {
      const result = await signInWithPopup(auth, provider);
      const userUid = result.user.uid;
      const profileRef = doc(firebaseDB, "users", userUid);
      const profile = await getDoc(profileRef);

      // console.log("profileRef", profile.exists())

      if (result.user.email?.split("@")[1] !== "caldwell.edu") {
        alert("Please use your Caldwell University email address to sign in.");
        // sign out
        signOut(auth);

        return;
      }

      if (profile.exists()) {
        router.push("/profile");
      } else {
        router.push(`/profile/edit`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={() => handleSignIn()}
      className="flex gap-2 items-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors font-semibold"
    >
      <IconBrandGoogle className="h-5 w-5 text-neutral-800 dark:text-neutral-300 " />
      Sign In With Google
    </button>
  );
}
