"use client";
import React, { useState } from "react";
import Container from "../components/container";
import SignInButton from "../components/sign-in-button";
import { auth, firebaseDB } from "../utils/db";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../components/header";
import { useRouter } from "next/navigation";
import { LabelInputContainer } from "../components/forms/label-input-container";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { collection, addDoc } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";

const applicationSchema = z.object({
  position: z.enum([
    "member",
    "secretary",
    "treasurer",
    "git",
    "event-coordinator",
    "dl",
    "mol",
    "pl",
    "cc",
  ]),
  allQues: z.string().min(1, "Please answer this question"),
  secretaryQues: z.string().optional(),
});

type ApplicationData = z.infer<typeof applicationSchema>;

export default function ApplyPage() {
  const [user, userLoading, userErr] = useAuthState(auth);
  const router = useRouter();
  const [formData, setFormData] = useState<ApplicationData>({
    position: "member",
    allQues: "",
    secretaryQues: "",
  });

  if (!user && !userLoading) {
    router.push(`/sign-in/?next=${location.pathname}`);
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement> | string,
    field: keyof ApplicationData
  ) => {
    if (typeof e === "string") {
      setFormData((prev) => ({ ...prev, [field]: e }));
    } else {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const validatedData = applicationSchema.parse(formData);

      if (validatedData.position !== "secretary") {
        delete validatedData.secretaryQues;
      }

      const docRef = await addDoc(collection(firebaseDB, "applications"), {
        ...validatedData,
        userId: user?.uid,
        createdAt: new Date(),
      });

      toast.success("Application submitted successfully!");
      router.push("/application-success");
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        console.error("Error submitting application:", error);
        toast.error("Failed to submit application. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-3xl font-bold mt-8">
            Apply to Join <abbr title="Google Developers Group">GDG</abbr> On
            Campus: Caldwell University
          </h1>
          <p className="mt-4 text-lg">
            Together we learn, together we grow. Join us if you are interested!
          </p>
          <form className="my-8 w-96 space-y-6" onSubmit={handleSubmit}>
            <LabelInputContainer>
              <Label>Select a Position</Label>
              <Select
                onValueChange={(value) => handleChange(value, "position")}
                value={formData.position}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="treasurer">Treasurer</SelectItem>
                    <SelectItem value="git">Girl in Tech Lead</SelectItem>
                    <SelectItem value="event-coordinator">
                      Event Coordinator
                    </SelectItem>
                    <SelectItem value="dl">Design Lead</SelectItem>
                    <SelectItem value="mol">
                      Marketing and Outreach Lead
                    </SelectItem>
                    <SelectItem value="pl">Photography Lead</SelectItem>
                    <SelectItem value="cc">Content Creator</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="allQues" className="leading-normal">
                Why do you want to join GDG Caldwell? What is your experience
                with technology?
              </Label>
              <Textarea
                id="allQues"
                name="allQues"
                placeholder=""
                className="w-full h-36 p-2 rounded-md"
                value={formData.allQues}
                onChange={(e) => handleChange(e, "allQues")}
              />
            </LabelInputContainer>

            {formData.position === "secretary" && (
              <LabelInputContainer>
                <Label htmlFor="secretaryQues" className="leading-normal">
                  Imagine we are having a Git Workshop event next Wednesday
                  11-1. Write a short email to a professor of CS or any other
                  department so he/she can help to promote our event.
                </Label>
                <Textarea
                  id="secretaryQues"
                  name="secretaryQues"
                  placeholder=""
                  className="w-full h-36 p-2 rounded-md"
                  value={formData.secretaryQues}
                  onChange={(e) => handleChange(e, "secretaryQues")}
                />
              </LabelInputContainer>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit Application
            </button>
          </form>
        </Container>
      </main>
      <Toaster />
    </>
  );
}
