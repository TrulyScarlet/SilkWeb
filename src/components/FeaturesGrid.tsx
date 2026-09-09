import { 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Tv, 
  Radio, 
  Zap, 
  FolderArchive,
  Palette,
  Terminal
} from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      icon: ShieldCheck,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      title: "Zero Accounts. Zero Cloud.",
      description:
        "No email signups, no authentication servers, no telemetry spying. Silk runs entirely offline on your local Windows system. Your gameplay and microphone audio stay strictly on your machine.",
    },
    {
      icon: Cpu,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
      title: "Native GPU Hardware Acceleration",
      description:
        "Direct integration with NVIDIA NVENC, AMD AMF, and Intel QuickSync. Video encoding happens on dedicated silicon on your GPU with practically 0% drop in gaming framerates.",
    },
    {
      icon: Radio,
      color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
      title: "Multi-Track WASAPI Audio",
      description:
        "Record desktop game audio and your microphone into completely independent audio tracks inside standard MP4/MKV. Adjust voice or game sound separately in Premiere, DaVinci, or Vegas.",
    },
    {
      icon: Tv,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      title: "Sub-Millisecond In-Game HUD",
      description:
        "Instant confirmation of saved clips with a native DirectX/GDI overlay. Never alt-tab or wonder whether your clip was saved during intense competitive rounds.",
    },
    {
      icon: Layers,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      title: "Strictly Bounded Memory Engine",
      description:
        "Engineered in Rust with deterministic memory allocation. Verified in 8-hour endurance stress tests. Zero memory leaks, zero crash buildup during all-night gaming sessions.",
    },
    {
      icon: FolderArchive,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      title: "Game Folders & Clip Library",
      description:
        "Clips are organized beneath your selected directory into tidy game folders. Built-in player allows scrubbing, quick renaming, bookmarking against auto-purge, and one-click reveal in Windows Explorer.",
    },
    {
      icon: Palette,
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
      title: "Built-In Theme Engine",
      description:
        "Customize Silk with Classic Dark, Ember Warm Neon, or Vamp Cyberpunk styles. Includes custom pixel-art and modern vector icons to match your desktop aesthetic.",
    },
    {
      icon: Terminal,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      title: "100% Free & Open Source",
      description:
        "Created with pride by Scarlet. Transparent Rust + Tauri + React codebase. No proprietary DRM, no ads, no paywalled high-bitrate settings.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Engineered for Gamers & Creators</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Everything you need. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
              None of the baggage.
            </span>
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Compare Silk to bloated video suites. Silk does one thing with extreme precision: instant replays that never drop frames or crash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-[#11121d] border border-white/[0.06] hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-900/10 flex flex-col justify-between"
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${feat.color} group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
