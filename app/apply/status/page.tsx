"use client";

import SubPageLayout from "@/app/components/sub-page-layout";
import { auth, firebaseDB } from "@/app/utils/db";
import { buttonVariants } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { collection, query, where } from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export default function Statuspage() {
  const [user] = useAuthState(auth);

  const [applicationsSnapshot, loading, error] = useCollection(
    user
      ? query(
          collection(firebaseDB, "applications"),
          where("userId", "==", user.uid)
        )
      : null
  );

  return (
    <SubPageLayout>
      <h1 className="text-3xl md:text-4xl font-bold mt-8 relative z-30">
        My Applications
      </h1>
      <p className="max-w-2xl mt-4">
        All the applications you have submitted are listed below.
      </p>

      <section className="my-8 space-y-3">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        {!loading && !applicationsSnapshot?.docs.length && (
          <CardSpotlight className="max-w-lg p-4 text-white relative z-30">
            <div className="relative z-30">
              <p className="mb-3">
                You haven&apos;t applied for any positions yet.
              </p>
              <Link
                className={buttonVariants({ variant: "secondary" })}
                href="/apply"
              >
                Apply Now
              </Link>
            </div>
          </CardSpotlight>
        )}

        {applicationsSnapshot?.docs.map((doc) => {
          const application = doc.data();
          return (
            <CardSpotlight
              key={doc.id}
              className="max-w-lg p-4 text-white relative z-30 flex justify-between items-center"
            >
              <div className="relative z-30">
                <h3 className="text-lg font-semibold">
                  Applied for{" "}
                  {application.position[0].toUpperCase() +
                    application.position.slice(1)}{" "}
                  position
                </h3>
                <p className="text-sm mt-1">
                  Applied on{" "}
                  {application.createdAt.toDate().toLocaleDateString("en-US")}
                </p>
                <p className="mt-2">
                  Status: {application.status || "Reviewing"}
                </p>
              </div>

              {/* <Link
                    href={`/application/${doc.id}`}
                    className="relative z-30 flex gap-1 items-center text-sm"
                  >
                    View Details
                    <ChevronRight />
                  </Link> */}
            </CardSpotlight>
          );
        })}
      </section>
    </SubPageLayout>
  );
}
