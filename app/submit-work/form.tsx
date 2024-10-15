import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthState } from "react-firebase-hooks/auth";
import { push, ref, set } from "firebase/database";
import { realtimeDB } from "../utils/db";

// @ts-ignore
export default function FormComponent({ events, email }) {
  const [formData, setFormData] = useState({
    email: email || "",
    learned: "",
    url: "",
    selectedEvent: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.selectedEvent) {
      alert("Please select an event.");
      return;
    }

    try {
      // @ts-ignore
      const workRef = ref(realtimeDB, `events/${formData.selectedEvent._id}`);
      const newWorkRef = push(workRef);

      await set(newWorkRef, {
        email: formData.email,
        learned: formData.learned,
        url: formData.url,
        timestamp: Date.now(),
        // @ts-ignore
        event: formData.selectedEvent.title,
      });

      alert("Work submitted successfully!");

      setFormData({
        email: "",
        learned: "",
        url: "",
        selectedEvent: null,
      });

      // setFormData((prevData) => ({
      //   ...prevData,
      //   email: "",
      //   learned: "",
      //   url: "",
      // }));

      // alert("Work submitted successfully!");
    } catch (error) {
      console.error("Error submitting work: ", error);
      alert("Failed to submit work. Please try again.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    // @ts-ignore
    const selectedEvent = events.find((event) => event.title === value);
    setFormData({ ...formData, selectedEvent });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md my-8 bg-white">
      <div className="space-y-2">
        <Label htmlFor="event">Event</Label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger id="event">
            <SelectValue placeholder="Select a event" />
          </SelectTrigger>
          <SelectContent>
            {/*  @ts-ignore */}
            {events.map((event) => (
              <SelectItem key={event._id} value={event.title}>
                {event.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="learned">What You Learned</Label>
        <Textarea
          id="learned"
          name="learned"
          placeholder="Share what you've learned..."
          value={formData.learned}
          onChange={handleChange}
          required
          rows={5}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          type="url"
          id="url"
          name="url"
          placeholder="https://example.com"
          value={formData.url}
          onChange={handleChange}
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}
