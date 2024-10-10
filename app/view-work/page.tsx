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
import { ref, onValue } from "firebase/database";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

interface Submission {
  id: string;
  learned: string;
  url: string;
  email: string;
}

const PostLinks: React.FC = () => {
  const [user, userLoading, userErr] = useAuthState(auth);
  const [pageData, setPageData] = useState<UpcomingEventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<UpcomingEventType | null>(
    null
  );
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) {
      router.push("/sign-in");
    } else {
      fetchData();
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

  useEffect(() => {
    if (!selectedEvent) return;
    const submissionsRef = ref(realtimeDB, `events/${selectedEvent._id}`);
    onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      const eventSubmissions: Submission[] = data
        ? Object.entries(data).map(([id, submission]: [string, any]) => ({
            id,
            ...submission,
          }))
        : [];
      setSubmissions(eventSubmissions);
    });
  }, [selectedEvent]);

  return (
    <>
      <Header />
      <Container className="min-h-[calc(100vh-140px)] mt-8">
        <h1 className="text-2xl font-bold mb-4">Select an Event</h1>
        <Select
          onValueChange={(value) => {
            const event = pageData.find((event) => event.title === value);
            setSelectedEvent(event || null);
          }}
        >
          <SelectTrigger>Select an Event</SelectTrigger>
          <SelectContent>
            {pageData.map((event) => (
              <SelectItem key={event._id} value={event.title}>
                {event.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedEvent && (
          <div>
            <h1 className="text-2xl font-bold mt-6">
              Submissions for {selectedEvent.title} [{submissions.length}]
            </h1>
            <ul className="flex gap-4 flex-wrap mt-8">
              <AnimatePresence>
                {submissions.map((submission) => (
                  <motion.li
                    key={submission.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 p-3 rounded-md"
                  >
                    <p>
                      URL:{" "}
                      <a
                        href={submission.url}
                        className="text-blue-500"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {submission.url}
                      </a>
                    </p>
                    <p>Submitted by: {submission.email}</p>
                    <p>
                      Learned:
                      <button
                        className="ml-2 border text-xs p-1 rounded-md"
                        onClick={() => alert(submission.learned)}
                      >
                        View
                      </button>
                    </p>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default PostLinks;
