import AnimatedLink from "@/components/AnimatedLink";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ALBUMS_QUERY_ALL } from "@/sanity/lib/queries";
import Image from "next/image";

export default async function Albums() {
  const { data: albumData } = await sanityFetch({
    query: ALBUMS_QUERY_ALL,
  });

  return (
    <div className="min-h-[calc(100vh-54px)]">
      <section className="w-full h-full gap-[24px] grid grid-cols-1 md:grid-cols-2 px-[24px] pt-[84px] pb-[64px] md:pb-0">
        {albumData.map((album) => (
          <AnimatedLink
            key={album.title}
            className="!no-underline hover:!underline"
            href={`/albums/${album.slug!.current}`}
          >
            <figure className="relative mx-auto md:mx-0 h-[calc(100vh-54px*2-84px)] w-full aspect-square md:aspect-video">
              <Image
                src={urlFor(album.albumImage!)
                  .width(1000)
                  .height(1500)
                  .fit("crop")
                  .auto("format")
                  .quality(100)
                  .url()}
                alt={album.albumImage!.alt || "Home page photo"}
                fill
                priority
                sizes="100vw"
                className="md:hidden object-cover"
              />
              <Image
                src={urlFor(album.albumImage!)
                  .width(3000)
                  .fit("crop")
                  .auto("format")
                  .quality(100)
                  .url()}
                alt={album.albumImage!.alt || "Home page photo"}
                fill
                priority
                sizes="100vw"
                className="hidden md:inline object-cover"
              />
            </figure>
            <div className="text-center pt-[8px]">{album.title}</div>
          </AnimatedLink>
        ))}
      </section>
    </div>
  );
}
