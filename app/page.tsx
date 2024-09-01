import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/spotlight";
import Image from "next/image";
import { AnimatedTooltips } from "./components/tooltips";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Container from "./components/container";
import { ClockIcon, MapPin } from "lucide-react";
import UpcomingCard from "./components/event-cards/upcoming";
import HeroSection from "./components/hero";
import { Boxes } from "@/components/ui/background-boxes";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="p-16 mx-auto bg-slate-100 bg-grid-black/[0.1] relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <h2 className="font-bold text-3xl text-center relative">
          Upcoming Events
        </h2>

        <Container className="mt-8 flex gap-4 flex-wrap justify-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <UpcomingCard />
          <UpcomingCard />
          <UpcomingCard />
          <UpcomingCard />
        </Container>
      </section>

      <section className="p-16 mx-auto bg-black min-h-96 relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />

        <h2 className="font-bold text-3xl text-center relative z-20 text-white">
          Past Events
        </h2>

        <Container className="mt-8 flex gap-4 flex-wrap justify-center relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <UpcomingCard />
          <UpcomingCard />
          <UpcomingCard />
          <UpcomingCard />
        </Container>
      </section>

      <Footer />
    </>
  );
}
