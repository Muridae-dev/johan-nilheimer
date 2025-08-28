import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

export default async function Home() {
  const { data: homepageData } = await sanityFetch({
    query: HOME_PAGE_QUERY,
  });
  const photo = homepageData?.homePagePhoto;

  return (
    <figure className="absolute w-full h-screen md:w-[calc(100%-150px)] md:h-[calc(100vh-150px)] md:left-1/2 md:top-1/2 md:-translate-1/2">
      {photo && (
        <>
          <Image
            src={urlFor(photo)
              .width(1000)
              .height(1500)
              .fit("crop")
              .auto("format")
              .quality(100)
              .url()}
            alt={photo.alt || "Home page photo"}
            fill
            priority
            sizes="100vw"
            className="md:hidden object-cover"
          />
          <Image
            src={urlFor(photo)
              .width(3000)
              .fit("crop")
              .auto("format")
              .quality(100)
              .url()}
            alt={photo.alt || "Home page photo"}
            fill
            priority
            sizes="100vw"
            className="hidden md:inline object-cover"
          />
          <figcaption className="absolute top-1/2 left-1/2 -translate-1/2 text-center w-[90%] text-white">
            {homepageData.title}
          </figcaption>
        </>
      )}
    </figure>
  );
}
