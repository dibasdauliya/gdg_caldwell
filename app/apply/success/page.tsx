import Container from "@/app/components/container";
import FollowInsta from "@/app/components/follow-insta";
import Header from "@/app/components/header";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Successpage() {
  return (
    <>
      <Header />
      <main className="container mx-auto bg-grid-black/[0.04] relative h-[400px]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>

        <Container className="space-y-5">
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
        </Container>
      </main>
    </>
  );
}
