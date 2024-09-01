import Container from "@/app/components/container";
import Header from "@/app/components/header";
import React from "react";

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto bg-grid-black/[0.1] relative h-[400px]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>

        <Container className="space-y-5">
          <h1 className="text-3xl md:text-4xl font-bold mt-8 relative z-30">
            Our Team
          </h1>
          <p className="max-w-2xl">Coming soon...</p>
        </Container>
      </main>
    </>
  );
}
