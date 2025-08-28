import PhotoGrid from "@/components/PhotoGrid";
import { sanityFetch } from "@/sanity/lib/live";
import { ALBUM_QUERY_SLUG } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: albumData } = await sanityFetch({
    query: ALBUM_QUERY_SLUG,
    params: { slug },
  });

  if (!albumData) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100dvh)] md:min-h-[calc(100dvh-64px)] w-full relative overflow-hidden">
      {albumData.photos && <PhotoGrid photos={albumData.photos} />}
    </div>
  );
}
