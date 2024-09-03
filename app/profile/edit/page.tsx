"use client";
import Container from "@/app/components/container";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Header from "@/app/components/header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseDB } from "@/app/utils/db";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { LabelInputContainer } from "@/app/components/forms/label-input-container";
import SubPageLayout from "@/app/components/sub-page-layout";
import { useRouter } from "next/navigation";
import { ProfileData, profileSchema } from "@/app/utils/types";

export default function EditProfile() {
  const [user, userLoading, userErr] = useAuthState(auth);
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
  const router = useRouter();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = profileSchema.safeParse(profileData);

    if (!result.success) {
      const errorMessages = result.error.errors
        .map((err) => err.message)
        .join(", ");
      console.error(result.error.errors);
      toast.error(`Please check your inputs and try again: ${errorMessages}`);
      return;
    }

    if (user) {
      try {
        await setDoc(doc(firebaseDB, "users", user.uid), result.data);
        toast.success("Profile updated successfully!");
        router.push("/profile");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  if (userLoading) return <div>Loading...</div>;
  if (userErr) return <div>Error: {userErr.message}</div>;
  if (!user) return router.push("/sign-in");

  return (
    <SubPageLayout>
      <main className="relative z-30">
          <h1 className="text-3xl font-bold mt-8">Edit Profile</h1>

          <form className="my-8 w-96" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input
                  id="firstname"
                  name="firstname"
                  placeholder="Tyler"
                  type="text"
                  value={profileData.firstname}
                  onChange={handleChange}
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input
                  id="lastname"
                  name="lastname"
                  placeholder="Durden"
                  type="text"
                  value={profileData.lastname}
                  onChange={handleChange}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                placeholder="projectmayhem@fc.com"
                type="email"
                value={profileData.email}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="classyear">Class Year</Label>
              <Input
                id="classyear"
                name="classyear"
                placeholder="Freshman - Class of 2028"
                type="text"
                value={profileData.classyear}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="major">Major</Label>
              <Input
                id="major"
                name="major"
                placeholder="Computer Science"
                type="text"
                value={profileData.major}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <div className="flex items-center gap-1">
                <span>https://linkedin.com/in/</span>
                <Input
                  id="linkedin"
                  name="linkedin"
                  placeholder="tylerdurden"
                  type="text"
                  value={profileData.linkedin}
                  onChange={handleChange}
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="github">GitHub</Label>
              <div className="flex items-center gap-1">
                <span>https://github.com/</span>
                <Input
                  id="github"
                  name="github"
                  placeholder="tylerdurden"
                  type="text"
                  value={profileData.github}
                  onChange={handleChange}
                />
              </div>
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="bio">About you in third person</Label>
              <Textarea
                id="bio"
                name="bio"
                placeholder="She is majoring in Computer Science and loves to code."
                className="w-full h-24 p-2 rounded-md shadow-sm dark:bg-zinc-800 dark:text-white"
                value={profileData.bio}
                onChange={handleChange}
              />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Save Profile
              <BottomGradient />
            </button>
          </form>
      </main>
      <Toaster />
    </SubPageLayout>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
