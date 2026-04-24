import { ReactNode } from "react";

export type TileTheme = "dark" | "black" | "light";
export type TileVariant = "A" | "B" | "C";

interface TileProps {
  theme?: TileTheme;
  variant?: TileVariant;
  eyebrow?: string;
  headline: ReactNode;
  tagline?: ReactNode;
  ctas?: ReactNode;
  media?: ReactNode;
  mediaPosition?: "below" | "above" | "background";
  textAlign?: "top" | "center" | "bottom";
  id?: string;
  className?: string;
}

const themeClass: Record<TileTheme, string> = {
  dark: "ac-tile-dark",
  black: "ac-tile-black",
  light: "ac-tile-light",
};

export function Tile({
  theme = "dark",
  variant = "A",
  eyebrow,
  headline,
  tagline,
  ctas,
  media,
  mediaPosition = "below",
  textAlign = "top",
  id,
  className = "",
}: TileProps) {
  const minH =
    variant === "A"
      ? "min-h-[320px] md:min-h-[380px]"
      : variant === "B"
      ? "min-h-[300px]"
      : "min-h-[220px]";

  const justify =
    textAlign === "center"
      ? "justify-center"
      : textAlign === "bottom"
      ? "justify-end"
      : "justify-start";

  return (
    <section
      id={id}
      data-ac-theme={theme}
      className={`ac-tile ${themeClass[theme]} ${minH} ${justify} ${className}`}
    >
      {mediaPosition === "background" && media && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          {media}
        </div>
      )}
      {mediaPosition === "above" && media && (
        <div className="relative z-10 w-full max-w-5xl mb-10">{media}</div>
      )}
      <div className="relative z-10 flex flex-col items-center max-w-4xl" data-ac-reveal>
        {eyebrow && <div className="ac-eyebrow">{eyebrow}</div>}
        <h2 className="ac-headline">{headline}</h2>
        {tagline && <p className="ac-subhead">{tagline}</p>}
        {ctas && <div className="ac-cta-row">{ctas}</div>}
      </div>
      {mediaPosition === "below" && media && (
        <div className="relative z-10 w-full max-w-5xl mt-10">{media}</div>
      )}
    </section>
  );
}
