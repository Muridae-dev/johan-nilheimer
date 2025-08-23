"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

export default function PhotoGrid({ photos }: { photos: any[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const isSingleRef = useRef(false);
  const [currentImage, setCurrentImage] = useState<null | any>();
  const [showCurrentImage, setShowCurrentImage] = useState<boolean>(false);
  const scrollRef = useRef(0);

  const scrollInterval = 100;
  const gridItemSize = 50;
  const scrollMultiplier = 0.2;
  let snapTimeout: ReturnType<typeof setTimeout>;

  useEffect(() => {
    const grid = gridRef.current;
    const box = boxRef.current;
    if (!grid || !box || !isSingleRef.current) return;

    box.classList.toggle("hidden");

    setPositions(Math.round(scrollRef.current / scrollInterval));

    const onScroll = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(snapTimeout);

      const index = scrollRef.current / scrollInterval;

      if (e.deltaY && index <= photos.length - 1 && index >= 0) {
        scrollRef.current += e.deltaY * scrollMultiplier;
      } else if (index < 0) {
        scrollRef.current = 0;
      } else if (index > photos.length - 1) {
        scrollRef.current = (photos.length - 1) * scrollInterval;
      }

      setPositions(index);

      if (
        photos[Math.round(index)] &&
        photos[Math.round(index)] !== currentImage
      ) {
        setCurrentImage(photos[Math.round(index)]);
      }

      snapTimeout = setTimeout(() => {
        scrollRef.current =
          Math.round(scrollRef.current / scrollInterval) * scrollInterval;
        setPositions(scrollRef.current / scrollInterval);

        if (
          photos[scrollRef.current / scrollInterval] &&
          photos[scrollRef.current / scrollInterval] !== currentImage
        ) {
          setCurrentImage(photos[scrollRef.current / scrollInterval]);
        }
      }, 200);
    };

    window.addEventListener("wheel", onScroll, { passive: false });
    window.addEventListener("resize", () =>
      setPositions(scrollRef.current / scrollInterval)
    );
    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("resize", () =>
        setPositions(scrollRef.current / scrollInterval)
      );
    };
  }, [isSingleRef.current]);

  const setPositions = (index: number) => {
    const grid = gridRef.current;
    const box = boxRef.current;

    if (box && grid) {
      if (window.innerWidth > 768) {
        const gridCenter =
          Math.round(window.innerHeight / 2 / gridItemSize) * gridItemSize -
          gridItemSize;

        gridRef.current?.style.setProperty(
          "transform",
          `translateY(${gridCenter - index * gridItemSize}px)`
        );

        box.style.setProperty("top", `${gridCenter}px`);
        box.style.setProperty("bottom", "unset");
        box.style.setProperty("right", `${grid.offsetWidth / 2}px`);
      } else {
        const gridCenter =
          Math.round(window.innerWidth / 2 / gridItemSize) * gridItemSize;

        gridRef.current?.style.setProperty(
          "transform",
          `translateX(${gridCenter - index * gridItemSize}px)`
        );

        box.style.setProperty("right", `${gridCenter - gridItemSize}px`);
        box.style.setProperty("top", "unset");
        box.style.setProperty("bottom", `${grid.offsetHeight / 2}px`);
      }
    }
  };

  const gridFlip = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const state = Flip.getState(grid.querySelectorAll(".photo-item"));

    // toggle mode flag
    isSingleRef.current = !isSingleRef.current;

    grid.style.setProperty("--rows", String(photos.length));

    gsap.to(grid, {
      gap: isSingleRef.current ? "0px" : "24px",
      duration: 0,
      ease: "power2.inOut",
    });

    // Desktop
    grid.classList.toggle("md:grid-cols-4");
    grid.classList.toggle("md:grid-cols-1");
    grid.classList.toggle("md:h-[calc(100vh-64px)]");
    grid.classList.toggle("md:w-[10%]");
    grid.classList.toggle("md:ml-auto");
    grid.classList.toggle("md:grid-rows-[repeat(var(--rows),50px)]");
    grid.classList.toggle("md:min-w-0");

    // Mobile
    grid.classList.toggle("grid-cols-1");
    grid.classList.toggle("h-[calc(10%+84px)]");
    grid.classList.toggle("grid-cols-[repeat(var(--rows),50px)]");
    grid.classList.toggle("absolute");
    grid.classList.toggle("bottom-0");
    grid.classList.toggle("left-0");
    grid.classList.toggle("min-w-[100vw]");

    // animate positions/sizes
    Flip.from(state, {
      duration: 0.4,
      ease: "power2.inOut",
      absolute: true,
      onComplete: () => setShowCurrentImage(true),
    });
  };

  const handleClick = ({ image, index }: { image: any; index: number }) => {
    !isSingleRef.current && gridFlip();
    setCurrentImage(image);
    scrollRef.current = index * scrollInterval;
  };

  return (
    <>
      {isSingleRef.current && currentImage && showCurrentImage && (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-[70vh] md:translate-0 md:top-[64px] md:left-0 md:w-[90%] md:h-[calc(100vh-64px-64px-24px)]">
          <Image
            src={urlFor(currentImage)
              .width(3000)
              .auto("format")
              .quality(100)
              .url()}
            alt={currentImage.alt || "Home page photo"}
            className="object-contain"
            fill
            sizes="90vw"
          />
        </div>
      )}

      <div className="min-h-[70vh] relative h-full top-[84px] overflow-hidden">
        <div
          ref={boxRef}
          className="z-9 absolute translate-y-1/2 md:translate-y-0 md:translate-x-1/2 hidden border border-white w-[50px] h-[50px] md:w-[100px] md:h-[50px]"
        />
        <section
          ref={gridRef}
          className="grid grid-cols-1 md:relative md:grid-cols-4 side-spacing gap-[24px] md:top-0"
        >
          {photos.map((image, index) => (
            <div
              key={image._key}
              className="photo-item relative min-h-0 flex justify-center items-center cursor-pointer"
              onClick={() => handleClick({ image, index })}
            >
              <Image
                src={urlFor(image)
                  .width(1200)
                  .auto("format")
                  .quality(100)
                  .url()}
                alt={image.alt || "Home page photo"}
                width={600}
                height={600}
                // IMPORTANT: let the image scale with the grid cell
                className="w-full h-full object-contain"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
