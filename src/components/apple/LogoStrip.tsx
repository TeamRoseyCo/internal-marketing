interface Logo {
  name: string;
  /** optional SVG or image URL. If omitted, renders the name as a wordmark. */
  src?: string;
  /** optional Tailwind height override (default: h-8). */
  imgClassName?: string;
}

interface LogoStripProps {
  logos?: Logo[];
  label?: string;
  className?: string;
  reverse?: boolean;
}

// Real clients. Only Raha Resort has a logo image so far; the rest render as
// text wordmarks until logo files are added to /public/client-logos/.
const DEFAULT_LOGOS: Logo[] = [
  { name: "Raha Resort", src: "/client-logos/raha-resort.png", imgClassName: "h-16 md:h-20" },
  { name: "Fight Gecko" },
  { name: "World Kickboxing Association" },
  { name: "Acer Forestry" },
  { name: "KCF Homes" },
  { name: "VitalScore" },
  { name: "Davenport Florida Solar" },
  { name: "Texas Relocation Experts" },
  { name: "PUXX Nicotine" },
  { name: "RB Counselling" },
  { name: "Jet Select" },
];

export function LogoStrip({ logos = DEFAULT_LOGOS, label, className = "", reverse = false }: LogoStripProps) {
  const track = [...logos, ...logos];
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="text-center ac-caption uppercase tracking-widest mb-6">{label}</div>
      )}
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
          style={{ background: "linear-gradient(to right, var(--ac-tile-light), transparent)" }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
          style={{ background: "linear-gradient(to left, var(--ac-tile-light), transparent)" }}
          aria-hidden="true"
        />
        <ul
          className="ac-marquee-track flex gap-16 whitespace-nowrap py-2 w-max"
          style={reverse ? { animationDirection: "reverse" } : undefined}
        >
          {track.map((logo, i) => (
            <li key={`${logo.name}-${i}`} className="flex items-center h-16 md:h-20">
              {logo.src ? (
                <img
                  src={logo.src}
                  alt={logo.name}
                  className={`${logo.imgClassName ?? "h-8"} w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0`}
                />
              ) : (
                <span className="text-[22px] font-semibold tracking-tight text-[#6e6e73] opacity-80">
                  {logo.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
