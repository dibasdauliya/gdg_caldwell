import { defineType, defineField } from "sanity";

export const upcomingEvent = defineType({
  name: "upcomingEvents",
  title: "Upcoming Events",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    }),
    // defineField({
    //   name: 'mainImage',
    //   title: 'Main image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    // }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "eventDate",
      title: "Event is on",
      type: "datetime",
    }),
    defineField({
      name: "location",
      title: "Location of the event (eg. Werner Lecture Hall, Room 101)",
      type: "string",
    }),
    defineField({
      name: "registrationLink",
      title: "Registration link",
      description:
        "Add caldwell-cs-club@cs-club-420803.iam.gserviceaccount.com as an editor to the form.",
      type: "url",
    }),
    defineField({
      name: "formID",
      title: "Google Form *Editor* ID",
      description:
        "This is the ID of the Google Form that is used to edit the form. This is not the ID of the form that is used to view the form.",
      type: "string",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      description: "Home page will only show the text of the first paragraph",
      title: "Short description about the event",
      type: "array",
      of: [
        {
          type: "block",
          // Only allow these block styles
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
          ],
          // Only allow numbered lists
          lists: [{ title: "Numbered", value: "number" }],
          marks: {
            // Only allow these decorators
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              // underline
              { title: "Underline", value: "underline" },
            ],
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
