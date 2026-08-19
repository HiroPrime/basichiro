import Image from "next/image";

/**
 * Logo + framed mosaic collage with the "A Lifetime Exploring..." headline
 * scrim, Amy Rose peeking in from the left, and the drippy skull peeking
 * from the top-right corner. Both peeking characters and the skull are
 * static (only the skull was explicitly confirmed as non-scroll-linked;
 * Amy Rose isn't one of the 4 confirmed scroll items either).
 */
export default function MastheadCollage() {
  return (
    <section className="relative px-4 pt-8 pb-6">
      <div className="flex justify-center mb-5">
        <Image
          src="/design/logo.webp"
          alt="BasicHiro"
          width={383}
          height={190}
          priority
          className="w-36 sm:w-44 h-auto"
        />
      </div>

      <div className="relative">
        <div className="absolute -left-5 sm:-left-9 top-8 z-20 w-20 sm:w-28 pointer-events-none">
          <Image
            src="/design/amy-peek.webp"
            alt=""
            width={700}
            height={1223}
            className="w-full h-auto drop-shadow-[2px_4px_0_rgba(0,0,0,0.18)]"
          />
        </div>

        <div className="absolute -right-3 sm:-right-6 -top-7 z-20 w-16 sm:w-20 rotate-[6deg] pointer-events-none">
          <Image
            src="/design/skull.webp"
            alt=""
            width={700}
            height={790}
            className="w-full h-auto"
          />
        </div>

        <div className="zine-frame relative overflow-hidden bg-white">
          <Image
            src="/design/masthead-collage.webp"
            alt="A mosaic of BasicHiro's characters, brands, and projects over the years"
            width={1400}
            height={654}
            priority
            className="w-full h-auto block"
          />
          <div className="absolute left-[36%] right-[8%] top-[15%] bottom-[6%] rounded-2xl bg-black/60 shadow-[6px_8px_0_rgba(0,0,0,0.22)] flex items-center justify-center px-3 py-4 text-center">
            <p className="zine-marker zine-marker-pop text-white text-[13px] sm:text-lg md:text-xl leading-[1.15] uppercase">
              A Lifetime
              <br /> Exploring
              <br /> Designing
              <br /> Creating
              <br /> Having Fun
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
