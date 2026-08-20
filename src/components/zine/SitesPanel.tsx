import Image from "next/image";
import ScrollParallax from "./ScrollParallax";

type Tile = {
  href: string;
  label: string;
  img: string;
  mask: string;
  width: number;
  height: number;
};

const PRIME_PORTAL: Tile = {
  href: "https://primeportal.nexus",
  label: "Prime Portal",
  img: "nav-prime-portal",
  mask: "nav-mask-prime-portal",
  width: 1000,
  height: 491,
};
const CORE_NODE: Tile = {
  href: "https://corenode.nexus",
  label: "Core Node",
  img: "nav-core-node",
  mask: "nav-mask-core-node",
  width: 800,
  height: 676,
};
const GRIMM_FRACTURE: Tile = {
  href: "https://grimmfracture.nexus",
  label: "Grimm Fracture",
  img: "nav-grimm-fracture",
  mask: "nav-mask-grimm-fracture",
  width: 800,
  height: 683,
};
const SAVE_POINT: Tile = {
  href: "https://savepoint.nexus",
  label: "Save Point",
  img: "nav-save-point",
  mask: "nav-mask-save-point",
  width: 1000,
  height: 487,
};

function NavTile({ tile }: { tile: Tile }) {
  return (
    <a
      href={tile.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${tile.label}`}
      className="group relative block"
    >
      <Image
        src={`/design/${tile.img}.webp`}
        alt={tile.label}
        width={tile.width}
        height={tile.height}
        className="w-full h-auto block"
      />
      <Image
        src={`/design/${tile.mask}.webp`}
        alt=""
        aria-hidden="true"
        width={tile.width}
        height={tile.height}
        className="absolute inset-0 h-full w-full object-fill opacity-0 transition-opacity duration-200 pointer-events-none group-hover:opacity-45 group-focus-visible:opacity-45"
      />
    </a>
  );
}

export default function SitesPanel() {
  return (
    <section className="relative px-4 py-10">
      <div className="text-center zine-marker leading-none mb-6">
        <span className="text-[var(--zine-green)] text-3xl sm:text-4xl mr-2">Check This</span>
        <span className="text-[var(--zine-pink)] text-3xl sm:text-4xl">Stuff Out</span>
      </div>

      <div className="relative">
        <div className="rounded-[28px] bg-black px-4 pt-8 pb-6">
          <p className="zine-pixel-thin text-[var(--zine-pink)] text-center text-base sm:text-lg -rotate-2 mb-4">
            AI Impowered Workflows – Cursor / Gemini / ETC...
          </p>

          <div className="flex flex-col gap-3">
            <NavTile tile={PRIME_PORTAL} />
            <div className="grid grid-cols-2 gap-3">
              <NavTile tile={CORE_NODE} />
              <NavTile tile={GRIMM_FRACTURE} />
            </div>
            <NavTile tile={SAVE_POINT} />
          </div>
        </div>

            <ScrollParallax
              xRange={[-45, 45]}
              rotateRange={[-4, 4]}
              className="absolute -right-3 sm:-right-7 -bottom-10 sm:-bottom-12 z-20 w-24 sm:w-28"
            >
          <Image
            src="/design/ghost-detective.webp"
            alt=""
            width={600}
            height={850}
            className="w-full h-auto drop-shadow-[2px_3px_0_rgba(0,0,0,0.25)]"
          />
        </ScrollParallax>
      </div>
    </section>
  );
}
