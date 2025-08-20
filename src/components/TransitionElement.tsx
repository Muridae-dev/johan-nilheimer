"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TransitionElement() {
  const pathName = usePathname();

  useEffect(() => {
    const transitionElement = document.querySelector("#transition-element");

    if (transitionElement) {
      const style = window.getComputedStyle(transitionElement);
      const matrix = new WebKitCSSMatrix(style.transform);

      const currentX = matrix.m41;

      if (currentX === 0) {
        gsap.to(transitionElement, {
          x: "-100%",
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(transitionElement, { x: "100%" });
          },
        });
      }
    }
  }, [pathName]);
  return (
    <div
      id="transition-element"
      className="fixed top-0 left-0 h-screen w-screen bg-white z-999"
    ></div>
  );
}
