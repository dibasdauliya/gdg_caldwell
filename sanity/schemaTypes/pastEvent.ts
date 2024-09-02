import { defineType, defineField } from "sanity";

export const pastEvent = defineType({
  name: "pastEvents",
  title: "Past Event",
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
    defineField({
      name: "formID",
      title: "Google Form *Editor* ID",
      description: `This is the ID of the Google Form that is used to EDIT the form. This is not the ID of the form that is used to view the form. Add caldwell-cs-club@cs-club-420803.iam.gserviceaccount.com as an editor to the form.`,
      type: "string",
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
      name: "mainImage",
      title: "Main image",
      description:
        'DO NOT use upload button. Use the "Select" button to select an image from the media library.',
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
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
