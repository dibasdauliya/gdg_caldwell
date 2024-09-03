import React from 'react'
import SubPageLayout from '../components/sub-page-layout'
import UpcomingCard from '../components/event-cards/upcoming';
import { UpcomingEventType } from '@/sanity/schema-types';
import { client } from '@/sanity/lib/client';

export const revalidate = 0;

async function getUpcomingEvents(): Promise<UpcomingEventType[]> {
  const query = `*[_type == "upcomingEvents"]{
  _id,
  title,
  eventDate,
  startEndTime,
  location,
  registrationLink,
  formID,
  "content":content[0].children[0].text,
  }
  `;
  const upcomingEvents = await client.fetch(query);
  return upcomingEvents;
}

export default async function UpcomingEvent() {
    const upcomingEvents = await getUpcomingEvents();

  return (
    <SubPageLayout>
        <h2 className="font-bold text-3xl relative my-8">
          Upcoming Events
        </h2>

        {upcomingEvents.map((event) => {
            // console.log({ event });
            return (
              <UpcomingCard
                key={event._id}
                title={event.title}
                content={event.content}
                eventDate={event.eventDate}
                startEndTime={event.startEndTime}
                location={event.location}
                registrationLink={event.registrationLink}
                formId={event.formId}
              />
            );
          })}
    </SubPageLayout>
  )
}