import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ALBUM_QUERY_SLUG } from "@/sanity/lib/queries";
import Image from "next/image";
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
    <section className="grid grid-cols-1 md:grid-cols-4 side-spacing gap-[24px] py-[84px]">
      {albumData.photos.map((album) => (
        <div
          className="relative max-h-[600px] md:max-h-[300px] flex justify-center items-center"
          key={album._key}
        >
          <Image
            src={urlFor(album).width(800).auto("format").quality(100).url()}
            alt={album.alt || "Home page photo"}
            width={600}
            height={600}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ))}
    </section>
  );
}
