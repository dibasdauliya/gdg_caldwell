import Container from "@/app/components/container";
import Header from "@/app/components/header";
import React from "react";

export default function SubPageLayout({
    children,
}: {
    children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="container mx-auto bg-grid-black/[0.1] relative min-h-[400px]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)]"></div>

        <Container className="space-y-5">
          {children}
        </Container>
      </main>
    </>
  );
}
