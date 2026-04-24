interface MockSearchResultProps {
  query?: string;
  site?: string;
  title?: string;
  description?: string;
  position?: number;
  className?: string;
}

export function MockSearchResult({
  query = "premium marketing agency",
  site = "roseyco.com",
  title = "Rosey Co. | Growth engineered for serious brands",
  description = "Results-focused SEO, social, and paid advertising across six markets. Fees pause until you see traction. No long contracts.",
  position = 1,
  className = "",
}: MockSearchResultProps) {
  return (
    <div className={`rounded-[18px] bg-white p-6 shadow-xl max-w-2xl mx-auto text-left ${className}`}>
      <div className="flex items-center gap-3 rounded-full border border-[#d2d2d7] px-4 py-2 text-[#1d1d1f]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="7" stroke="#6e6e73" strokeWidth="2" />
          <path d="M20 20l-3.5-3.5" stroke="#6e6e73" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="text-[14px]">{query}</span>
      </div>
      <div className="mt-6 text-[12px] text-[#6e6e73]">
        About 1,340,000 results &middot; Position #{position}
      </div>
      <div className="mt-4">
        <div className="text-[12px] text-[#6e6e73]">{site}</div>
        <div className="text-[18px] text-[#1a0dab] font-medium mt-1">{title}</div>
        <div className="text-[13px] text-[#4d5156] mt-1 leading-snug">{description}</div>
      </div>
    </div>
  );
}
