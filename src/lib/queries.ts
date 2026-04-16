import { client, sanityConfigured } from "./sanity";

export type Artwork = {
  _id: string;
  title: string;
  artist: string;
  year: string;
  genre: string;
  material: string;
  style: string;
  availability: "Available" | "Sold" | "Not for sale";
  image: { asset: { _ref: string } } | null;
  description: string;
  featured: boolean;
  order: number;
};

const ARTWORKS_QUERY = `*[_type == "artwork"] | order(order asc) {
  _id,
  title,
  artist,
  year,
  genre,
  material,
  style,
  availability,
  image,
  description,
  featured,
  order
}`;

export async function getArtworks(): Promise<Artwork[]> {
  if (!sanityConfigured || !client) return [];
  return client.fetch(ARTWORKS_QUERY, {}, { next: { revalidate: 60 } });
}
