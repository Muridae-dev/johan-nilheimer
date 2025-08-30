import ContactForm from "@/components/ContactForm";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { CONTACT_PAGE_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

export default async function Kontakt() {
  const { data: pageData } = await sanityFetch({
    query: CONTACT_PAGE_QUERY,
  });

  const photo = pageData?.mainImage;

  return (
    <div className="flex flex-col-reverse md:flex-row-reverse md:absolute items-center md:gap-[24px] pt-[84px] md:pt-0 md:top-[64px] md:h-[calc(100vh-73px-54px-10px)] side-spacing">
      <div className="md:w-1/2 flex flex-col gap-[24px] py-[24px]">
        <h1 className="text-4xl font-bold">Kontakt</h1>
        {pageData?.description}

        <ContactForm />
      </div>
      <figure className="relative w-full aspect-square md:aspect-auto md:w-1/2 md:h-full overflow-hidden">
        {photo && (
          <Image
            src={urlFor(photo)
              .width(2000)
              .height(2000)
              .fit("crop")
              .auto("format")
              .quality(95)
              .url()}
            alt={photo.alt || "About page photo"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </figure>
    </div>
  );
}
