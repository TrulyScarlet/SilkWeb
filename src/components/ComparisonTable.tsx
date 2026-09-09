import { Check, X } from "lucide-react";
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
      detail: "Silk works immediately without email or login",
    },
    {
      feature: "100% Local-First (No Cloud)",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "No video uploads or telemetry to remote servers",
    },
    {
      feature: "Open Source Codebase",
      silk: true,
      shadowplay: false,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Transparent Rust + Tauri architecture on GitHub",
    },
    {
      feature: "Bounded Ring Buffer (Zero SSD Wear)",
      silk: true,
      shadowplay: true,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Streams kept in RAM ring buffer until hotkey save",
    },
    {
      feature: "Hardware-Accelerated (NVENC / AMF / QSV)",
      silk: true,
      shadowplay: true,
      obs: true,
      medal: true,
      steelseries: true,
      detail: "Offloads encoding to GPU hardware for zero game lag",
    },
    {
      feature: "Sub-Millisecond In-Game HUD Overlay",
      silk: true,
      shadowplay: true,
      obs: false,
      medal: true,
      steelseries: true,
      detail: "Confirms clip saved without alt-tabbing",
    },
    {
      feature: "Lightweight Memory Footprint (<120MB)",
      silk: true,
      shadowplay: false,
      obs: false,
      medal: false,
      steelseries: false,
      detail: "No Electron bloat, no heavy background helper daemons",
    },
    {
      feature: "Discrete Multi-Track Audio (Game + Mic)",
      silk: true,
      shadowplay: true,
      obs: true,
      medal: false,
      steelseries: false,
      detail: "Separate tracks in MP4/MKV for post-editing",
    },
  ];

  return (
    <section id="comparison" className="py-24 bg-[#0a0b12] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How does Silk Studio compare?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Built from scratch to give you the speed of ShadowPlay with the privacy of OBS, without the bloat of gaming social platforms.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#11121d] shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#161724]">
                <th className="p-4 sm:p-5 text-sm font-semibold text-zinc-300">Feature</th>
                <th className="p-4 sm:p-5 text-sm font-bold text-purple-300 bg-purple-950/30 border-x border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <SilkLogo size={18} color="#c084fc" />
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
                  <td className="p-4 sm:p-5 font-medium text-white">
                    <div>{row.feature}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{row.detail}</div>
                  </td>

                  {/* Silk Studio */}
                  <td className="p-4 sm:p-5 bg-purple-950/20 border-x border-purple-500/20 font-semibold text-purple-300">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Check className="w-4 h-4 text-purple-400" />
                      <span className="text-white text-xs font-bold">Yes</span>
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
      </div>
    </section>
  );
}
