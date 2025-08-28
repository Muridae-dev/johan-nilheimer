"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { AlbumPhoto } from "@/sanity/schemaTypes/albumType";

gsap.registerPlugin(Flip);

const CONFIG = {
  scrollInterval: 100,
  gridItemSize: 50,
  scrollMultiplier: 0.2,
  snapDelay: 200,
  tickEase: 0.1,
  flip: { duration: 0.4, ease: "power2.inOut" },
};

export default function PhotoGrid({ photos }: { photos: AlbumPhoto[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentImage, setCurrentImage] = useState<AlbumPhoto | null>();
  const [showCurrentImage, setShowCurrentImage] = useState<boolean>(false);

  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const lastTouchX = useRef(0);
  const snapTimeout = useRef<NodeJS.Timeout>(null);
  const rafId = useRef<number | null>(null);

  const setPositions = useCallback((index: number) => {
    const grid = gridRef.current;
    const box = boxRef.current;
    if (!grid || !box) return;

    const { gridItemSize } = CONFIG;

    if (window.innerWidth > 768) {
      const gridCenter =
        Math.round(window.innerHeight / 2 / gridItemSize) * gridItemSize -
        gridItemSize;

      grid.style.setProperty(
        "transform",
        `translateY(${gridCenter - index * gridItemSize}px)`
      );

      box.style.setProperty("top", `${gridCenter}px`);
      box.style.setProperty("bottom", "unset");
      box.style.setProperty("right", `${grid.offsetWidth / 2}px`);
      box.style.setProperty("left", "unset");
    } else {
      const gridCenter =
        Math.round(window.innerWidth / 2 / gridItemSize) * gridItemSize;

      grid.style.setProperty(
        "transform",
        `translateX(${gridCenter - index * gridItemSize}px)`
      );

      box.style.setProperty("left", `${gridCenter}px`);
      box.style.setProperty("right", "unset");
      box.style.setProperty("top", "unset");
      box.style.setProperty("bottom", `${grid.offsetHeight / 2 + 24}px`);
    }
  }, []);

  const tick = useCallback(() => {
    const { tickEase, scrollInterval } = CONFIG;

    scrollCurrent.current +=
      (scrollTarget.current - scrollCurrent.current) * tickEase;

    const index = scrollCurrent.current / scrollInterval;
    setPositions(index);

    if (isPreviewMode) rafId.current = requestAnimationFrame(tick);
  }, [setPositions, isPreviewMode]);

  useEffect(() => {
    if (!isPreviewMode) return;

    const { scrollInterval, scrollMultiplier, snapDelay } = CONFIG;

    const onScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault();
      snapTimeout.current && clearTimeout(snapTimeout.current);

      let deltaY;

      if ("deltaY" in e) {
        deltaY = e.deltaY;
        snapTimeout.current = setTimeout(() => {
          scrollTarget.current =
            Math.round(scrollTarget.current / scrollInterval) * scrollInterval;
        }, snapDelay);
      } else if (e.touches && e.touches.length) {
        const touch = e.touches[0];
        if (!lastTouchX.current) lastTouchX.current = touch.clientX;

        deltaY = (lastTouchX.current - touch.clientX) * 10;
        lastTouchX.current = touch.clientX;
      }

      const index = scrollTarget.current / scrollInterval;

      if (deltaY && index <= photos.length - 1 && index >= 0) {
        scrollTarget.current += deltaY * scrollMultiplier;
      }

      if (scrollTarget.current < 0) scrollTarget.current = 0;
      if (index > photos.length - 1)
        scrollTarget.current = (photos.length - 1) * scrollInterval;

      const snapped = Math.round(index);

      if (photos[snapped]) {
        setCurrentImage(photos[snapped]);
      }
    };

    const onTouchEnd = () => {
      lastTouchX.current = 0;

      snapTimeout.current = setTimeout(() => {
        const snapped = Math.round(scrollTarget.current / scrollInterval);
        scrollTarget.current = snapped * scrollInterval;
        if (photos[snapped]) setCurrentImage(photos[snapped]);
      }, snapDelay);
    };

    window.addEventListener("wheel", onScroll, { passive: false });
    window.addEventListener("touchmove", onScroll, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", () =>
      setPositions(scrollTarget.current / scrollInterval)
    );

    return () => {
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", () =>
        setPositions(scrollTarget.current / scrollInterval)
      );
    };
  }, [isPreviewMode, currentImage, photos, setPositions]);

  useEffect(() => {
    if (isPreviewMode) {
      tick();
    } else if (rafId.current && !isPreviewMode) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, [isPreviewMode, tick]);

  const gridFlip = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const state = Flip.getState(grid.querySelectorAll(".photo-item"));
    setIsPreviewMode((prev) => !prev);

    gsap.to(grid, {
      gap: isPreviewMode ? "24px" : "0px",
      duration: 0,
    });

    grid.classList.toggle("single-mode");
    grid.classList.toggle("side-spacing");
    boxRef.current?.classList.toggle("hidden");
    document.querySelector("footer")?.classList.toggle("hidden");
    document.querySelector("header")?.classList.toggle("hidden");

    grid.style.setProperty("transform", "unset");
    grid.style.setProperty("--rows", String(photos.length));

    Flip.from(state, {
      ...CONFIG.flip,
      absolute: true,
      onComplete: () => setShowCurrentImage((prev) => !prev),
    });
  }, [isPreviewMode, photos.length]);

  const handleClick = ({
    image,
    index,
  }: {
    image: AlbumPhoto;
    index: number;
  }) => {
    const { scrollInterval } = CONFIG;

    !isPreviewMode && gridFlip();
    setCurrentImage(image);
    scrollTarget.current = index * scrollInterval;
    setPositions(index);
  };

  return (
    <>
      {isPreviewMode && currentImage && showCurrentImage && (
        <>
          <button
            onClick={() => {
              gridFlip();
            }}
            className="z-99 absolute underline min-w-[32px] aspect-square top-[8px] right-[12px] cursor-pointer md:-translate-x-[100%]"
          >
            Close
          </button>
          <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full h-full md:translate-0 md:top-[64px] md:left-0 md:w-[90%] md:h-[calc(100vh-64px-64px-24px)]">
            <Image
              src={urlFor(currentImage)
                .width(3000)
                .auto("format")
                .quality(80)
                .url()}
              alt={currentImage.alt || "Home page photo"}
              className="object-contain"
              fill
              sizes="90vw"
            />
          </div>{" "}
        </>
      )}

      <div className="min-h-[calc(100vh-84px)] relative h-full top-[84px] overflow-hidden">
        <div
          ref={boxRef}
          className="z-9 absolute translate-y-1/2 md:translate-y-0 md:translate-x-1/2 hidden border border-white w-[50px] h-[50px] md:w-[100px] md:h-[50px]"
        />
        <section
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-4 side-spacing gap-[24px] md:relative md:top-0"
        >
          {photos.map((image, index) => (
            <div
              key={image._key}
              className="photo-item relative min-h-0 flex justify-center items-center cursor-pointer"
              onClick={() => handleClick({ image, index })}
            >
              <Image
                src={urlFor(image).width(1200).auto("format").quality(80).url()}
                alt={image.alt || "Home page photo"}
                width={600}
                height={600}
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
