import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ClockIcon, MapPin } from "lucide-react";
import React from "react";

export default function UpcomingCard() {
  return (
    <CardSpotlight className="w-80 p-4 text-white relative z-30">
      <p className="text-xl font-bold relative z-20 mb-2">
        Introduction to Git and GitHub
      </p>
      <div className="my-3 space-y-2 relative z-20">
        <p className="flex gap-2 items-center">
          <ClockIcon size={20} />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}{" "}
          at 6-7 PM
        </p>
        <p className="flex gap-2 items-center">
          <MapPin size={20} />
          Werner Hall 101
        </p>
      </div>
      <p className="text-lg relative z-20 text-white">
        Learn how to use Git and GitHub to manage your code and collaborate with
        others.
      </p>

      {/* button */}
      <div className="mt-4 relative z-20">
        <button className="px-4 py-2 text-black bg-white text-sm rounded-md">
          Register
        </button>
      </div>
    </CardSpotlight>
  );
}
