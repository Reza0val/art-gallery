import { defineField, defineType } from "sanity";

export const artwork = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({ name: "artist", title: "Artist", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "genre", title: "Genre", type: "string" }),
    defineField({ name: "material", title: "Material", type: "string" }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: [
          "Abstract",
          "Minimal",
          "Figurative",
          "Monochrome",
          "Color Field",
          "Contemporary",
        ],
      },
    }),
    defineField({
      name: "availability",
      title: "Availability",
      type: "string",
      options: {
        list: ["Available", "Sold", "Not for sale"],
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "featured", title: "Featured", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "artist", media: "image" },
  },
});
