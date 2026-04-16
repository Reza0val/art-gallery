import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { artwork } from "./schemas/artwork";

export default defineConfig({
  name: "art-gallery",
  title: "Art Gallery",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [structureTool()],
  schema: {
    types: [artwork],
  },
});
