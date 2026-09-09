import React from "react";

export type SilkLogoProps = {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  theme?: "studio" | "classic" | "ember" | "vamp";
  badge?: boolean;
};

export function SilkLogo({
  size = 24,
  className = "",
  style,
  color = "currentColor",
  theme: _theme,
  badge = false,
}: SilkLogoProps) {
  const pixelGlyph = (
    <svg
      width={badge ? "68%" : size}
      height={badge ? "68%" : size}
      viewBox="0 0 32 32"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={badge ? "" : className}
      style={badge ? { display: "block" } : { display: "inline-block", verticalAlign: "middle", flexShrink: 0, ...style }}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x="12" y="3" width="8" height="1" />
      <rect x="10" y="4" width="12" height="1" />
      <rect x="8" y="5" width="16" height="1" />
      <rect x="7" y="6" width="8" height="1" />
      <rect x="17" y="6" width="8" height="1" />
      <rect x="6" y="7" width="6" height="1" />
      <rect x="20" y="7" width="6" height="1" />
      <rect x="6" y="8" width="4" height="1" />
      <rect x="22" y="8" width="5" height="1" />
      <rect x="7" y="9" width="2" height="1" />
      <rect x="23" y="9" width="2" height="1" />
      <rect x="19" y="10" width="11" height="1" />
      <rect x="19" y="11" width="11" height="1" />
      <rect x="20" y="12" width="9" height="1" />
      <rect x="21" y="13" width="7" height="1" />
      <rect x="22" y="14" width="5" height="1" />
      <rect x="23" y="15" width="2" height="1" />
      <rect x="7" y="16" width="2" height="1" />
      <rect x="5" y="17" width="5" height="1" />
      <rect x="4" y="18" width="7" height="1" />
      <rect x="3" y="19" width="9" height="1" />
      <rect x="2" y="20" width="11" height="1" />
      <rect x="2" y="21" width="11" height="1" />
      <rect x="7" y="22" width="2" height="1" />
      <rect x="23" y="22" width="2" height="1" />
      <rect x="5" y="23" width="5" height="1" />
      <rect x="22" y="23" width="4" height="1" />
      <rect x="6" y="24" width="6" height="1" />
      <rect x="20" y="24" width="6" height="1" />
      <rect x="7" y="25" width="8" height="1" />
      <rect x="17" y="25" width="8" height="1" />
      <rect x="8" y="26" width="16" height="1" />
      <rect x="10" y="27" width="12" height="1" />
      <rect x="12" y="28" width="8" height="1" />
    </svg>
  );

  if (!badge) {
    return pixelGlyph;
  }

  // Theme-reactive squircle app badge
  return (
    <div
      className={`silk-app-badge-squircle ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: "22%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        position: "relative",
        background: "linear-gradient(135deg, var(--site-surface-raised, #18181f), var(--site-surface, #121216))",
        border: "1px solid var(--site-border, rgba(168, 85, 247, 0.35))",
        boxShadow: "0 4px 16px var(--site-accent-glow, rgba(168, 85, 247, 0.25))",
        color: "var(--site-accent, #a855f7)",
        ...style,
      }}
    >
      {pixelGlyph}
    </div>
  );
}

export default SilkLogo;
