"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathName = usePathname();

  return (
    <footer
      className={`z-99 relative flex flex-col-reverse gap-[24px] w-full md:flex-row justify-between side-spacing pb-[14px] text-sm ${pathName === "/" && "homepage"}`}
      aria-label="Site footer"
    >
      <div className="flex flex-col">
        <p>© {new Date().getFullYear()} Johan Nilheimer</p>
        <p>
          Developed by:{" "}
          <a
            href="https://www.muridae.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Noah Lundberg
          </a>
        </p>
      </div>

      <address className="flex flex-col md:text-right not-italic">
        <a
          href="https://www.instagram.com/johan.nilheimer"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Johan Nilheimer on Instagram"
        >
          Instagram
        </a>
        <a
          href="mailto:johan.nilheimer@gmail.com"
          aria-label="Send an email to Johan Nilheimer"
        >
          johan.nilheimer@gmail.com
        </a>
      </address>
    </footer>
  );
}
