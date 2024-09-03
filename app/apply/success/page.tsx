import FollowInsta from "@/app/components/follow-insta";
import SubPageLayout from "@/app/components/sub-page-layout";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Successpage() {
  return (
    <SubPageLayout className="space-y-5">
      <h1 className="text-3xl md:text-4xl font-bold mt-8 relative z-30">
        Application Submitted
      </h1>
      <p className="max-w-2xl">
        Thank you for applying to the GDG On Campus: Caldwell University. We
        will review your application and get back to you shortly.
      </p>
      <p>
        If any questions, please contact{" "}
        <a className="underline" href="mailto:ddauliya@caldwell.edu">
          ddauliya@caldwell.edu
        </a>
        .
      </p>
      <p>
        <Link
          href="/apply/status"
          className={buttonVariants({ variant: "secondary" })}
        >
          View Application Status
        </Link>
      </p>

      <FollowInsta />
    </SubPageLayout>
  );
}
