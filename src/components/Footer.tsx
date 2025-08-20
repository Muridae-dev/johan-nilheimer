export default function Footer() {
  return (
    <footer
      className="w-full flex justify-between px-[24px] pb-[12px]"
      aria-label="Site footer"
    >
      <div className="flex flex-col">
        <p>© {new Date().getFullYear()} Johan Nilheimer</p>
        <p>
          Developed by: <a href="https://www.muridae.dev/">Noah Lundberg</a>
        </p>
      </div>

      <address className="flex flex-col text-right not-italic">
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
