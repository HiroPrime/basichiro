import Image from "next/image";
import ScrollParallax from "./ScrollParallax";

const PILLS = ["Creator", "Artist", "Designer", "Developer"];

export default function BioSection() {
  return (
    <section className="relative px-4 pt-2 pb-14">
      {/* Photo/name card, with the rocket peeking off its bottom-left corner,
          the pill stack anchored off its bottom-right, and the face-sticker
          stack peeking out between the two. */}
      <div className="relative">
        <Image
          src="/design/bio-photo-card.webp"
          alt="BasicHiro, Jacob Lovell"
          width={1100}
          height={575}
          className="w-full h-auto block"
        />

            <ScrollParallax
              xRange={[-55, 55]}
              yRange={[70, -70]}
              rotateRange={[-6, 6]}
              className="absolute -left-[4%] bottom-[-22%] z-20 w-[24%]"
            >
          <Image
            src="/design/rocket.webp"
            alt=""
            width={600}
            height={464}
            className="w-full h-auto -rotate-[20deg] drop-shadow-[2px_3px_0_rgba(0,0,0,0.2)]"
          />
        </ScrollParallax>

        <div className="absolute left-[32%] top-[88%] z-20 w-[26%]">
          <Image
            src="/design/face-sticker-stack.webp"
            alt=""
            width={700}
            height={828}
            className="w-full h-auto"
          />
        </div>

        <div className="absolute right-0 top-[90%] z-10 flex w-[46%] flex-col gap-[8px]">
          {PILLS.map((label) => (
            <div
              key={label}
              className="zine-pixel-thin rounded-full border-[3px] border-black bg-white px-3 py-1 text-center text-base sm:text-lg leading-tight"
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Spacer to account for the pill stack + sticker overlap below the card. */}
      <div className="h-[150px] sm:h-[170px]" aria-hidden="true" />

      <div className="relative mt-2">
        <div className="pr-[32%] sm:pr-[30%]">
          <p className="zine-marker zine-marker-pop text-[var(--zine-green)] text-4xl sm:text-5xl">
            HI
          </p>
          <p className="zine-marker uppercase text-center leading-snug text-[15px] sm:text-base mt-1">
            I am <span className="text-[var(--zine-pink)]">Jacob Lovell</span>. I create
            things.
          </p>
          <p className="zine-marker uppercase text-center leading-snug text-[15px] sm:text-base mt-6">
            I have come to know myself as not just one thing, but many. A product
            designer. A graphic designer, an artist, an illustrator, a game designer,
            a package designer, a layout artist, a surface designer, and the list
            continues to grow.
          </p>
        </div>

        <div className="absolute right-0 top-0 w-[30%] sm:w-[28%] text-right">
          <span className="zine-pixel-thin text-xl sm:text-2xl">ME ↙</span>
          <Image
            src="/design/me-partner-photo.webp"
            alt="Jacob and his partner"
            width={900}
            height={912}
            className="w-full h-auto rounded-2xl mt-1"
          />
        </div>
      </div>

      <div className="zine-marker zine-marker-pop uppercase text-center leading-[1.05] mt-10">
        <p className="text-[var(--zine-pink)] text-2xl sm:text-3xl">I See The Challenge</p>
        <p className="text-[var(--zine-green)] text-4xl sm:text-5xl">And</p>
        <p className="text-[var(--zine-pink)] text-2xl sm:text-3xl">I Beat The Challenge</p>
      </div>
    </section>
  );
}
