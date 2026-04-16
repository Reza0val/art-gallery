import { getArtworks } from "@/lib/queries";
import GalleryClient from "./gallery-client";

export default async function Page() {
  const artworks = await getArtworks();
  return <GalleryClient artworks={artworks} />;
}
