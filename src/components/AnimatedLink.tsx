"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import React, { forwardRef } from "react";

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedLink = forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    const router = useRouter();
    const currentPath = usePathname();
    const targetPath = href.toString();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      const transitionElement = document.querySelector("#transition-element");
      if (transitionElement && currentPath !== targetPath) {
        gsap.to(transitionElement, {
          x: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            router.push(targetPath);
          },
        });
      } else {
        if (currentPath === targetPath) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          router.push(targetPath);
        }
      }
    };

    return (
      <Link
        ref={ref}
        href={targetPath}
        onClick={handleClick}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

AnimatedLink.displayName = "AnimatedLink";

export default AnimatedLink;
