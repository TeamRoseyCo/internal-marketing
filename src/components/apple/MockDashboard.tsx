interface MockDashboardProps {
  label: string;
  value: string;
  delta?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function MockDashboard({
  label,
  value,
  delta,
  theme = "light",
  className = "",
}: MockDashboardProps) {
  const bg = theme === "dark" ? "bg-[#1d1d1f]" : "bg-white";
  const text = theme === "dark" ? "text-[#f5f5f7]" : "text-[#1d1d1f]";
  const sub = theme === "dark" ? "text-[#9b9b9f]" : "text-[#6e6e73]";

  return (
    <div className={`rounded-[18px] p-8 shadow-xl ${bg} ${text} ${className}`}>
      <div className={`text-[13px] uppercase tracking-widest ${sub}`}>{label}</div>
      <div className="mt-3 text-[56px] leading-none font-semibold tracking-tight">
        {value}
      </div>
      {delta && (
        <div className="mt-3 text-[15px]" style={{ color: "#34c759" }}>
          {delta}
        </div>
      )}
      <svg
        viewBox="0 0 200 60"
        className="mt-6 w-full h-[60px]"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mockSpark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0071e3" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0071e3" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,45 L20,40 L40,42 L60,30 L80,28 L100,22 L120,18 L140,15 L160,8 L180,6 L200,2 L200,60 L0,60 Z"
          fill="url(#mockSpark)"
        />
        <path
          d="M0,45 L20,40 L40,42 L60,30 L80,28 L100,22 L120,18 L140,15 L160,8 L180,6 L200,2"
          fill="none"
          stroke="#0071e3"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
