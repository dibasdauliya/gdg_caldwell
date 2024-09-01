"use client";
import React from "react";
import Container from "../components/container";
import { auth, firebaseDB } from "../utils/db";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Header from "../components/header";
import { useRouter } from "next/navigation";
import { LabelInputContainer } from "../components/forms/label-input-container";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { collection, addDoc, query, where } from "firebase/firestore";
import { toast, Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const applicationSchema = z.object({
  position: z
    .enum(
      [
        "member",
        "secretary",
        "treasurer",
        "git",
        "event-coordinator",
        "dl",
        "mol",
        "pl",
        "cc",
      ],
      {
        required_error: "Please select a position",
        invalid_type_error: "Please select a valid position",
      }
    )
    .or(z.string())
    .refine((val) => val !== "", {
      message: "Please select a position",
    }),
  whyGdg: z.string().min(1, "Please answer this question"),
  positionQues: z.string().optional(),
  terms1: z.boolean().optional(),
});

type ApplicationData = z.infer<typeof applicationSchema>;

const positionQuestions: Record<string, string> = {
  secretary:
    "Imagine we are having a Git Workshop event next Wednesday 11-1. Write a short email to a professor of CS or any other department requesting him/her to promote our event.",
  treasurer:
    "How will you manage the budget? What programs or tools will you use?",
  git: "What initiatives would you propose to encourage and support more women in technology?",
  "event-coordinator":
    "Describe an tech event you would like to organize. How would you plan and execute it?",
  dl: "How would you ensure that GDG Caldwell's visual identity remains consistent across all platforms and events?",
  mol: "How would you use social media and other channels to increase GDG Caldwell's visibility on campus?",
  pl: "How would you capture and edit photos to best represent GDG Caldwell's events and activities?",
  cc: "What types of content would you create to engage our audience and promote GDG Caldwell's activities?",
};

export default function ApplyPage() {
  const [user, userLoading, userErr] = useAuthState(auth);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApplicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      position: "",
      whyGdg: "",
      positionQues: "",
    },
  });

  const position = watch("position");

  if (!user && !userLoading) {
    router.push(`/sign-in/?next=${location.pathname}`);
    return null;
  }
  const userQuery = user
    ? query(collection(firebaseDB, "users"), where("__name__", "==", user.uid))
    : null;

  const [userSnapshot, loading, error] = useCollection(userQuery);

  const profile = userSnapshot?.docs[0].data();

  const onSubmit = async (data: ApplicationData) => {
    if (data.position !== "member" && !data.positionQues) {
      toast.error("Please answer the question for the selected position.");
      return;
    }

    const { position, positionQues, ...rest } = data;
    const question = positionQuestions[position];
    const transformedData = {
      ...rest,
      position,
      positionQues:
        position !== "member" && positionQues
          ? { [question]: positionQues }
          : null,
      userId: user?.uid,
      createdAt: new Date(),
    };
    console.log(transformedData);
    return;
    try {
      await addDoc(collection(firebaseDB, "applications"), transformedData);
      //   toast.success("Application submitted successfully!");
      router.push("/apply/success");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className="bg-grid-black/[0.04] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>
        <Container className="relative z-30">
          <h1 className="text-3xl font-bold mt-8">
            Apply to Join <abbr title="Google Developers Group">GDG</abbr> On
            Campus: Caldwell University
          </h1>
          <p className="mt-4 text-lg">
            Together we learn, together we grow. Join us if you are interested!
          </p>

          <div className="mt-8">
            <p className="font-semibold">
              {!profile && "Loading..."}
              {profile?.firstname} {profile?.lastname}{" "}
              <small>
                <Link href="/profile/edit" className="underline">
                  edit
                </Link>
              </small>
            </p>
            <p>
              {profile?.major} &middot; {profile?.classyear}
            </p>
          </div>
          <form
            className="my-8 w-96 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <LabelInputContainer>
              <Label htmlFor="position">Select a Position</Label>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
                )}
              />
              {errors.position && (
                <p className="text-red-500">{errors.position.message}</p>
              )}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="whyGdg" className="leading-normal">
                Why do you want to join GDG Caldwell? What is your experience
                with technology?
              </Label>
              <Controller
                name="whyGdg"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder=""
                    className="w-full h-36 p-2 rounded-md"
                  />
                )}
              />
              {errors.whyGdg && (
                <p className="text-red-500">{errors.whyGdg.message}</p>
              )}
            </LabelInputContainer>

            {position !== "member" && position !== "" && (
              <LabelInputContainer>
                <Label htmlFor="positionQues" className="leading-normal">
                  {positionQuestions[position]}
                </Label>
                <Controller
                  name="positionQues"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder=""
                      className="w-full h-36 p-2 rounded-md"
                    />
                  )}
                />
                {errors.positionQues && (
                  <p className="text-red-500">{errors.positionQues.message}</p>
                )}
              </LabelInputContainer>
            )}

            <div className="items-top flex space-x-2">
              <Controller
                name="terms1"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="terms1"
                    checked={field.value}
                    onChange={(checked) => field.onChange(checked)}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                )}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I'm generally available Wednesdays 11-1 PM.
                </label>
                <p className="text-sm text-muted-foreground">
                  There are no classes scheduled during this time.
                </p>
              </div>
            </div>

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
