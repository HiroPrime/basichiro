import Image from "next/image";

const TILES = [
  { img: "grid-skull", label: "Skulls" },
  { img: "grid-potion-playerz", label: "Potion Playerz" },
  { img: "grid-mask-green", label: "Character study" },
  { img: "grid-amy-eyes", label: "Amy Rose fan art" },
  { img: "grid-cinnatwist", label: "CinnaTwist" },
  { img: "grid-fitstrides", label: "FitStrides" },
  { img: "grid-fruit-juice", label: "Packaging design" },
  { img: "grid-burger", label: "Illustration" },
  { img: "grid-leaf-logo", label: "Logo design" },
  { img: "grid-orange", label: "Illustration" },
  { img: "grid-luigi", label: "Luigi fan art" },
  { img: "grid-mario-noir", label: "Mario fan art" },
];

/**
 * Inert placeholder grid — tiles have no links yet ("Journey links go
 * nowhere for now"). Markup is ready to swap each tile for a real <a> once
 * individual project pages exist for these.
 */
export default function CreatorJourneyGrid() {
  return (
    <section className="relative px-4 py-10 text-center">
      <p className="zine-pixel-block text-[var(--zine-green)] text-lg sm:text-xl mb-1">
        Creator
      </p>
      <p className="zine-pixel-block text-[var(--zine-pink)] text-3xl sm:text-4xl mb-4">
        Journey
      </p>
      <p className="zine-pixel-thin text-xl sm:text-2xl mb-6 flex items-center justify-center gap-3">
        <span className="text-[var(--zine-green)]">&#9656;</span>
        1 Player
        <span className="text-[var(--zine-green)]">&#9666;</span>
      </p>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {TILES.map((tile) => (
          <div key={tile.img} aria-label={tile.label} className="block">
            <Image
              src={`/design/${tile.img}.webp`}
              alt={tile.label}
              width={400}
              height={400}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
