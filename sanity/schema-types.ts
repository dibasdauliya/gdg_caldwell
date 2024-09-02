export interface UpcomingEventType {
  _id?: string;
    title: string;
    eventDate?: string; // ISO date string
    startEndTime: string;
    location: string;
    registrationLink: string;
    formId: string;
    content: string;
  }