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
      title: "Zero Accounts. Zero Cloud.",
      description:
        "No email signups, no authentication servers, no telemetry spying. Silk runs entirely offline on your local Windows system. Your gameplay and microphone audio stay strictly on your machine.",
    },
    {
      icon: Cpu,
      title: "Native GPU Hardware Acceleration",
      description:
        "Direct integration with NVIDIA NVENC, AMD AMF, and Intel QuickSync. Video encoding happens on dedicated silicon on your GPU with practically 0% drop in gaming framerates.",
    },
    {
      icon: Radio,
      title: "Multi-Track WASAPI Audio",
      description:
        "Record desktop game audio and your microphone into completely independent audio tracks inside standard MP4/MKV. Adjust voice or game sound separately in Premiere, DaVinci, or Vegas.",
    },
    {
      icon: Tv,
      title: "Sub-Millisecond In-Game HUD",
      description:
        "Instant confirmation of saved clips with a native DirectX/GDI overlay. Never alt-tab or wonder whether your clip was saved during intense competitive rounds.",
    },
    {
      icon: Layers,
      title: "Strictly Bounded Memory Engine",
      description:
        "Engineered in Rust with deterministic memory allocation. Verified in 8-hour endurance stress tests. Zero memory leaks, zero crash buildup during all-night gaming sessions.",
    },
    {
      icon: FolderArchive,
      title: "Game Folders & Clip Library",
      description:
        "Clips are organized beneath your selected directory into tidy game folders. Built-in player allows scrubbing, quick renaming, bookmarking against auto-purge, and one-click reveal in Windows Explorer.",
    },
    {
      icon: Palette,
      title: "Built-In Theme Engine",
      description:
        "Customize Silk with Classic Dark, Ember Warm Neon, or Vamp Cyberpunk styles. Includes custom pixel-art and modern vector icons to match your desktop aesthetic.",
    },
    {
      icon: Terminal,
      title: "100% Free & Open Source",
      description:
        "Created with pride by Scarlet. Transparent Rust + Tauri + React codebase. No proprietary DRM, no ads, no paywalled high-bitrate settings.",
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 transition-colors"
            style={{
              backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
              borderColor: "var(--site-border, rgba(168, 85, 247, 0.2))",
              color: "var(--site-accent, #a855f7)",
              borderWidth: "1px",
            }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Engineered for Gamers & Creators</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4" style={{ color: "var(--site-text, #ffffff)" }}>
            Everything you need. <br className="hidden sm:inline" />
            <span
              className="bg-clip-text text-transparent transition-all duration-300"
              style={{
                backgroundImage: "linear-gradient(135deg, var(--site-accent, #c084fc), #ffffff, var(--site-accent-hover, #e879f9))",
              }}
            >
              None of the baggage.
            </span>
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
            Compare Silk to bloated video suites. Silk does one thing with extreme precision: instant replays that never drop frames or crash.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between"
                style={{
                  backgroundColor: "var(--site-surface, #11121d)",
                  borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.06))",
                }}
              >
                <div>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center border mb-5 group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
                      borderColor: "var(--site-border, rgba(168, 85, 247, 0.2))",
                      color: "var(--site-accent, #a855f7)",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3
                    className="text-base font-bold mb-2 transition-colors"
                    style={{ color: "var(--site-text, #ffffff)" }}
                  >
                    {feat.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
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
