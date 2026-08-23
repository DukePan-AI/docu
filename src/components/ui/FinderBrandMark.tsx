import { useId } from "react";

interface FinderBrandMarkProps {
  size?: number;
  className?: string;
  subtle?: boolean;
}

export function FinderBrandMark({ size = 28, className = "", subtle = false }: FinderBrandMarkProps) {
  const gradientId = useId().replace(/:/g, "");
  const accentId = useId().replace(/:/g, "");

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label="Finder brand mark"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="8" x2="56" y1="8" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor={subtle ? "#f5f9ff" : "#edf5ff"} />
            <stop offset="1" stopColor={subtle ? "#dfeafc" : "#d9e8ff"} />
          </linearGradient>
          <linearGradient id={accentId} x1="18" x2="52" y1="16" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#245fb4" />
            <stop offset="1" stopColor="#123f7a" />
          </linearGradient>
        </defs>

        <rect x="6" y="6" width="52" height="52" rx="16" fill={`url(#${gradientId})`} />
        <rect x="6" y="6" width="52" height="52" rx="16" fill="none" stroke="rgba(30, 90, 168, 0.18)" strokeWidth="1.5" />

        <path
          d="M21 17h18.5c4.7 0 8.5 3.8 8.5 8.5v1.5c0 4.7-3.8 8.5-8.5 8.5H30v8.5h14.5c4.7 0 8.5 3.8 8.5 8.5v1.5c0 4.7-3.8 8.5-8.5 8.5H21V46h13.5v-8.5H21V29.5h13.5v-8.5H21V17Z"
          fill={`url(#${accentId})`}
          opacity="0.96"
        />

        <path
          d="M22 18.5h12.5c3.3 0 6 2.7 6 6v1.8c0 3.3-2.7 6-6 6H29.5v6.9h7.5c3.3 0 6 2.7 6 6v1.8c0 3.3-2.7 6-6 6H22V45h9.5v-7H22v-8.2h9.5v-6.8H22v-4.5Z"
          fill="rgba(255,255,255,0.82)"
          opacity="0.95"
        />

        <path
          d="M41.5 18.5L48 16.5v14L41.5 18.5Z"
          fill="rgba(30,90,168,0.18)"
        />
      </svg>
    </div>
  );
}
