import AnimatedLink from "./AnimatedLink";

export default function Header() {
  return (
    <header
      className="flex fixed top-0 left-0 justify-between w-full px-[24px] pt-[12px]"
      aria-label="Site header"
    >
      <div>
        <AnimatedLink
          href="/"
          className="font-bold text-lg"
          aria-label="Go to homepage"
        >
          Johan Nilheimer
        </AnimatedLink>
      </div>

      <nav aria-label="Main navigation">
        <ul className="flex flex-col text-right">
          <li>
            <AnimatedLink href="/albums">Albums</AnimatedLink>
          </li>
          <li>
            <AnimatedLink href="/kontakt">Kontakt</AnimatedLink>
          </li>
          <li>
            <AnimatedLink href="/om">Om</AnimatedLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
