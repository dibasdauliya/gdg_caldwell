"use client";
import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, realtimeDB } from "../utils/db";
import { useRouter } from "next/navigation";
import { UpcomingEventType } from "@/sanity/schema-types";
import { client } from "@/sanity/lib/client";
import Container from "../components/container";
import FormComponent from "./form";
import { onValue, ref } from "firebase/database";

interface SubmittedWork {
  email: string;
  learned: string;
  url: string;
  timestamp: number;
  event: string;
}

const PostLinks: React.FC = () => {
  const [user, userLoading, userErr] = useAuthState(auth);
  const [pageData, setPageData] = useState<UpcomingEventType[]>([]);
  const router = useRouter();
  const [submittedWorks, setSubmittedWorks] = useState<SubmittedWork[]>([]);

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/sign-in");
    } else {
      fetchData();
      fetchSubmittedWorks();
    }
  }, [user, userLoading, router]);

  async function fetchData() {
    const query = `*[_type == "upcomingEvents"]{
      _id,
      title,
    }`;
    const upcomingEvents = await client.fetch(query);
    console.log({ upcomingEvents });
    setPageData(upcomingEvents);
  }

  function fetchSubmittedWorks() {
    const worksRef = ref(realtimeDB, `events`);
    onValue(worksRef, (snapshot) => {
      const data = snapshot.val();
      console.log({ data });
      if (data) {
        const works: SubmittedWork[] = [];
        Object.values(data).forEach((event: any) => {
          Object.values(event).forEach((submission: any) => {
            if (submission.email === user?.email) {
              works.push(submission as SubmittedWork);
            }
          });
        });
        setSubmittedWorks(works);
        console.log({ userWorks: works });
      }
    });
  }

  return (
    <>
      <Header />
      <Container className="min-h-[calc(100vh-140px)]">
        <h1 className="text-2xl font-bold">Submit your work</h1>
        <FormComponent email={user?.email} events={pageData} />
        <h1 className="text-2xl font-bold mt-6">Submitted work</h1>
        {submittedWorks.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {submittedWorks.map((work, index) => (
              <li key={index} className="border p-4 rounded-md">
                <p>
                  <strong>Title:</strong> {work.event || "Unknown"}
                </p>
                <p>
                  <strong>Learned:</strong> {work.learned}
                </p>
                <p>
                  <strong>URL:</strong>{" "}
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {work.url}
                  </a>
                </p>
                <p>
                  <strong>Submitted on:</strong>{" "}
                  {new Date(work.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4">No submitted works yet.</p>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default PostLinks;
