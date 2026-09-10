import { Check, X, Info } from "lucide-react";
import { SilkLogo } from "./SilkLogo";

export function ComparisonTable() {
  const comparisons = [
    {
      feature: "Zero Account Required",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Ready to clip immediately; no email, registration, or login ever prompted",
    },
    {
      feature: "100% Local-First (No Telemetry)",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Zero video uploads to cloud servers and zero behavioral analytics",
    },
    {
      feature: "Open Source Codebase",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Transparent, auditable Rust + Tauri architecture hosted publicly on GitHub",
    },
    {
      feature: "RAM-Only Bounded Buffer (Zero SSD Wear)",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Buffers frames purely in system RAM; does not burn continuous SSD write cycles while idle",
    },
    {
      feature: "Universal GPU Support (NVIDIA, AMD, Intel)",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: true,
      steelseries: true,
      detail: "Hardware acceleration across all vendors (ShadowPlay is locked to NVIDIA only)",
    },
    {
      feature: "Discrete Multi-Track Audio (Game + Mic)",
      silk: true,
      shadowplay: true,
      obs: true,
      medal: true,
      steelseries: true,
      detail: "Records separate audio streams for game and voice into MP4/MKV for post-editing",
    },
    {
      feature: "In-Game Save HUD Notification",
      silk: true,
      shadowplay: true,
      obs: false,
      medal: true,
      steelseries: true,
      detail: "Instant visual toast confirms clip is saved without having to alt-tab",
    },
    {
      feature: "Lightweight Resource Footprint (<100MB)",
      silk: true,
      shadowplay: false,
      obs: false,
      medal: false,
      steelseries: false,
      detail: "No heavy Electron/Chromium runtime or multiple helper background daemons",
    },
    {
      feature: "No Social Feeds, Ads, or Upsells",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Pure clipping utility with zero promotional ads, social feeds, or premium upsells",
    },
  ];

  return (
    <section
      id="comparison"
      className="py-24 border-t transition-colors duration-300"
      style={{
        backgroundColor: "var(--site-surface, #0a0b12)",
        borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.06))",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--site-text, #ffffff)" }}>
            How does Silk Studio compare?
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
            Built from scratch to give you the speed of ShadowPlay with the privacy of OBS, without the bloat of gaming social platforms.
          </p>
        </div>

        {/* Comparison Table */}
        <div
          className="overflow-x-auto rounded-2xl border shadow-2xl transition-colors duration-300"
          style={{
            backgroundColor: "var(--site-surface-raised, #11121d)",
            borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.08))",
          }}
        >
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                <th className="p-4 sm:p-5 text-sm font-semibold text-zinc-300">Feature</th>
                <th
                  className="p-4 sm:p-5 text-sm font-bold border-x transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.15))",
                    borderColor: "var(--site-border, rgba(168, 85, 247, 0.2))",
                    color: "var(--site-accent, #c084fc)",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <SilkLogo size={18} color="var(--site-accent, #c084fc)" />
                    <span>Silk Studio</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 text-xs font-medium text-zinc-400">NVIDIA ShadowPlay</th>
                <th className="p-4 sm:p-5 text-xs font-medium text-zinc-400">OBS Studio</th>
                <th className="p-4 sm:p-5 text-xs font-medium text-zinc-400">Medal.tv</th>
                <th className="p-4 sm:p-5 text-xs font-medium text-zinc-400">SteelSeries GG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-xs sm:text-sm">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-medium" style={{ color: "var(--site-text, #ffffff)" }}>
                    <div>{row.feature}</div>
                    <div className="text-[11px] mt-0.5 opacity-70" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                      {row.detail}
                    </div>
                  </td>

                  {/* Silk Studio */}
                  <td
                    className="p-4 sm:p-5 border-x font-semibold transition-colors duration-300"
                    style={{
                      backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.08))",
                      borderColor: "var(--site-border, rgba(168, 85, 247, 0.2))",
                      color: "var(--site-accent, #c084fc)",
                    }}
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <Check className="w-4 h-4" style={{ color: "var(--site-accent, #a855f7)" }} />
                      <span className="text-xs">Yes</span>
                    </div>
                  </td>

                  {/* ShadowPlay */}
                  <td className="p-4 sm:p-5 text-zinc-400">
                    {row.shadowplay ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400/80" />
                    )}
                  </td>

                  {/* OBS */}
                  <td className="p-4 sm:p-5 text-zinc-400">
                    {row.obs ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400/80" />
                    )}
                  </td>

                  {/* Medal */}
                  <td className="p-4 sm:p-5 text-zinc-400">
                    {row.medal ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400/80" />
                    )}
                  </td>

                  {/* SteelSeries */}
                  <td className="p-4 sm:p-5 text-zinc-400">
                    {row.steelseries ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <X className="w-4 h-4 text-red-400/80" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Honest, transparent disclosure callout */}
        <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-400">
          <Info className="w-4 h-4 text-zinc-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Every app listed has its own strengths: <strong>OBS Studio</strong> is the gold standard for full broadcasting and scene customization, <strong>Medal.tv</strong> provides cloud sharing and community editing, and <strong>SteelSeries GG</strong> integrates complex virtual audio routing. <strong>Silk Studio</strong> is built for players who want instant replays with zero accounts, zero cloud dependencies, pure local storage, and minimal system overhead.
          </p>
        </div>
      </div>
    </section>
  );
}
