"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import SubPageLayout from "../components/sub-page-layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseDB } from "../utils/db";
import { useRouter } from "next/navigation";
import { ProfileData } from "../utils/types";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function MyProfile() {
  const [user, userLoading, userErr] = useAuthState(auth);
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileData>({
    firstname: user?.displayName?.split(" ")[0] || "",
    lastname: user?.displayName?.split(" ")[1] || "",
    email: user?.email || "",
    classyear: "",
    linkedin: "",
    github: "",
    major: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(firebaseDB, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data() as ProfileData;
          setProfileData(userData);
        }
      }
    };

    fetchUserData();
  }, [user]);

  if (!user && !userLoading) {
    router.push("/sign-in");
  }

  if (userLoading) {
    return <p>Loading...</p>;
  }
  return (
    <SubPageLayout>
      <div className="relative z-30 pb-8">
        <header className="flex gap-2 flex-wrap justify-between items-center max-w-2xl mt-8">
          <h1 className="text-3xl font-bold">
            Profile
            <small>
              <button
                onClick={() => router.push("/profile/edit")}
                className="text-sm text-blue-500 hover:text-blue-600 ml-3"
              >
                Edit
              </button>
            </small>
          </h1>

          {/* <Link href='/apply' className={buttonVariants({ variant: "secondary" })}>
            Apply
            </Link> */}
        </header>

        <div className="my-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {profileData.firstname}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <p className="mt-1 text-sm text-gray-900">{profileData.lastname}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 text-sm text-gray-900">{profileData.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Class Year
            </label>
            <p className="mt-1 text-sm text-gray-900">
              {profileData.classyear}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <a
              className="mt-1 text-sm text-blue-500 underline"
              href={`https://linkedin.com/in/${profileData.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profileData.linkedin}
            </a>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              GitHub
            </label>
            <a
              className="mt-1 text-sm text-blue-500 underline"
              href={`https://github.com/${profileData.github}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profileData.github}
            </a>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Major
            </label>
            <p className="mt-1 text-sm text-gray-900">{profileData.major}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <p className="mt-1 text-sm text-gray-900">{profileData.bio}</p>
          </div>
        </div>

        <Link
          href="/apply"
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 px-4 pt-2 pb-3 w-fit text-white rounded-md font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        >
          Apply
        </Link>
      </div>
    </SubPageLayout>
  );
}
