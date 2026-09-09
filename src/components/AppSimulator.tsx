import { useState, useEffect } from "react";
import { SilkLogo } from "./SilkLogo";
import { 
  Play, 
  Trash2, 
  Bookmark, 
  Volume2, 
  Sparkles, 
  Check, 
  X, 
  Minus, 
  Square, 
  Film,
  HardDrive
} from "lucide-react";

interface Clip {
  id: string;
  title: string;
  game: string;
  duration: string;
  size: string;
  timeAgo: string;
  protected: boolean;
  thumbnailGradient: string;
}

const INITIAL_CLIPS: Clip[] = [
  {
    id: "clip-1",
    title: "1v4 Clutch Mirage A Site",
    game: "Counter-Strike 2",
    duration: "0:45",
    size: "62.4 MB",
    timeAgo: "12m ago",
    protected: true,
    thumbnailGradient: "from-amber-950/70 via-stone-900 to-amber-900/40",
  },
  {
    id: "clip-2",
    title: "Triple Headshot Haven Long",
    game: "VALORANT",
    duration: "0:30",
    size: "41.8 MB",
    timeAgo: "1h ago",
    protected: false,
    thumbnailGradient: "from-rose-950/70 via-stone-900 to-red-900/40",
  },
  {
    id: "clip-3",
    title: "Malenia No Hit Phase 2",
    game: "Elden Ring",
    duration: "1:00",
    size: "88.1 MB",
    timeAgo: "3h ago",
    protected: true,
    thumbnailGradient: "from-yellow-950/70 via-stone-900 to-amber-800/40",
  },
  {
    id: "clip-4",
    title: "Night City Highway Chase",
    game: "Cyberpunk 2077",
    duration: "0:55",
    size: "74.5 MB",
    timeAgo: "Yesterday",
    protected: false,
    thumbnailGradient: "from-cyan-950/70 via-stone-900 to-purple-900/40",
  },
];

type ThemeMode = "classic" | "ember" | "vamp";

export function AppSimulator() {
  const [theme, setTheme] = useState<ThemeMode>("classic");
  const [clips, setClips] = useState<Clip[]>(INITIAL_CLIPS);
  const [hudNotification, setHudNotification] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [bufferSecs, setBufferSecs] = useState(60.0);
  const [activeClipModal, setActiveClipModal] = useState<Clip | null>(null);
  const [hotkeyTriggered, setHotkeyTriggered] = useState(false);

  // Buffer ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBufferSecs((prev) => {
        const next = prev + 0.1;
        return next > 60.0 ? 59.8 : Number(next.toFixed(1));
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Listen to keyboard shortcut Ctrl+Shift+S on the page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        triggerClipSave("Global Hotkey [Ctrl+Shift+S]");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const triggerClipSave = (source = "Interactive Hotkey") => {
    if (isSaving) return;
    setIsSaving(true);
    setHotkeyTriggered(true);
    setTimeout(() => setHotkeyTriggered(false), 600);

    const newClipId = `clip-${Date.now()}`;
    const newClip: Clip = {
      id: newClipId,
      title: `Saved Replay #${Math.floor(Math.random() * 899 + 100)}`,
      game: "Active Display Capture",
      duration: "0:60",
      size: "79.2 MB",
      timeAgo: "Just now",
      protected: false,
      thumbnailGradient:
        theme === "ember"
          ? "from-orange-950/80 via-stone-900 to-amber-900/50"
          : theme === "vamp"
          ? "from-pink-950/80 via-stone-900 to-purple-900/50"
          : "from-purple-950/80 via-stone-900 to-indigo-900/50",
    };

    setTimeout(() => {
      setClips((prev) => [newClip, ...prev]);
      setIsSaving(false);
      setHudNotification(
        `Clip Saved! • ${newClip.title}.mp4 (${newClip.size}) via ${source}`
      );
      setTimeout(() => {
        setHudNotification(null);
      }, 4000);
    }, 450);
  };

  const toggleProtected = (id: string) => {
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, protected: !c.protected } : c))
    );
  };

  const deleteClip = (id: string) => {
    setClips((prev) => prev.filter((c) => c.id !== id));
  };

  const themeColors = {
    classic: {
      accent: "text-purple-400",
      accentBg: "bg-purple-600",
      accentBorder: "border-purple-500/40",
      pillBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
      glow: "shadow-purple-600/20",
    },
    ember: {
      accent: "text-orange-400",
      accentBg: "bg-orange-600",
      accentBorder: "border-orange-500/40",
      pillBg: "bg-orange-500/10 text-orange-300 border-orange-500/20",
      glow: "shadow-orange-600/20",
    },
    vamp: {
      accent: "text-pink-400",
      accentBg: "bg-pink-600",
      accentBorder: "border-pink-500/40",
      pillBg: "bg-pink-500/10 text-pink-300 border-pink-500/20",
      glow: "shadow-pink-600/20",
    },
  }[theme];

  return (
    <section id="simulator" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-zinc-300 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive Desktop UI Simulator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Test Silk Studio right here in your browser
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Experience the real desktop UI. Switch themes, test the in-game native overlay HUD, and trigger a replay save with your keyboard (<kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono">Ctrl+Shift+S</kbd>).
          </p>
        </div>

        {/* The Desktop Window Simulator Frame */}
        <div className="relative rounded-2xl bg-[#0e0f17] border border-white/10 shadow-2xl overflow-hidden transition-all duration-300">
          {/* Simulated In-Game HUD Toast Alert */}
          {hudNotification && (
            <div className="absolute top-16 right-6 z-50 animate-bounce duration-300">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/90 backdrop-blur-xl border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 text-white text-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <div className="flex flex-col">
                  <span className="font-semibold text-emerald-400">Silk Native HUD</span>
                  <span className="text-zinc-300 font-mono text-[11px]">{hudNotification}</span>
                </div>
                <button
                  onClick={() => setHudNotification(null)}
                  className="ml-2 text-zinc-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* TitleBar */}
          <div className="h-10 bg-[#090a10] border-b border-white/[0.08] flex items-center justify-between px-3 select-none">
            {/* Left: Brand & Icon */}
            <div className="flex items-center gap-2">
              <div className={`w-5 h-5 flex items-center justify-center ${themeColors.accent}`}>
                <SilkLogo size={16} />
              </div>
              <span className="text-xs font-semibold text-zinc-200 tracking-wide">
                Silk Studio
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.05] text-zinc-500 font-mono">
                v0.1.0-release
              </span>
            </div>

            {/* Center: Replay Buffer Status Strip */}
            <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-zinc-200 font-semibold">REC BUFFER</span>
              </div>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300">{bufferSecs.toFixed(1)}s / 60.0s</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-400">2560x1440 @ 60 FPS</span>
              <span className="text-zinc-600">•</span>
              <span className="text-purple-400 font-medium">NVENC H.264</span>
            </div>

            {/* Right: Theme Switcher & Windows Controls */}
            <div className="flex items-center gap-3">
              {/* Theme Picker */}
              <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-white/[0.06] text-[10px]">
                <button
                  onClick={() => setTheme("classic")}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    theme === "classic"
                      ? "bg-purple-600 text-white font-medium"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Classic
                </button>
                <button
                  onClick={() => setTheme("ember")}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    theme === "ember"
                      ? "bg-orange-600 text-white font-medium"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Ember
                </button>
                <button
                  onClick={() => setTheme("vamp")}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    theme === "vamp"
                      ? "bg-pink-600 text-white font-medium"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Vamp
                </button>
              </div>

              {/* Windows Window Controls */}
              <div className="flex items-center text-zinc-500">
                <button className="p-1.5 hover:bg-white/10 hover:text-white rounded transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <button className="p-1.5 hover:bg-white/10 hover:text-white rounded transition-colors">
                  <Square className="w-2.5 h-2.5" />
                </button>
                <button className="p-1.5 hover:bg-red-500/80 hover:text-white rounded transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Ribbon / Control Bar */}
          <div className="p-4 bg-[#11121d] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Big Interactive Hotkey Button */}
              <button
                onClick={() => triggerClipSave("Simulator Button Click")}
                disabled={isSaving}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition-all ${
                  hotkeyTriggered ? "scale-95 ring-2 ring-white" : "hover:scale-[1.02]"
                } ${
                  theme === "ember"
                    ? "bg-gradient-to-r from-orange-600 to-amber-600 shadow-orange-600/30"
                    : theme === "vamp"
                    ? "bg-gradient-to-r from-pink-600 to-purple-600 shadow-pink-600/30"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-600/30"
                }`}
              >
                <Film className={`w-4 h-4 ${isSaving ? "animate-spin" : ""}`} />
                <span>{isSaving ? "Encoding Replay..." : "Save Instant Replay"}</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-white/20 text-[10px] font-mono">
                  Ctrl+Shift+S
                </kbd>
              </button>

              <div className="hidden md:flex items-center gap-2 text-xs text-zinc-400 bg-white/[0.03] px-3 py-2 rounded-xl border border-white/[0.05]">
                <HardDrive className="w-3.5 h-3.5 text-zinc-500" />
                <span>Saved Clips Directory: <code className="text-zinc-300">D:\Clips\Silk</code></span>
              </div>
            </div>

            {/* Quick Diagnostics badges */}
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
                <Check className="w-3 h-3" />
                <span>GPU Mux Ready</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-300 font-mono text-[11px]">
                <Volume2 className="w-3 h-3 text-purple-400" />
                <span>2 Audio Streams</span>
              </div>
            </div>
          </div>

          {/* Main App Content: Clip Library Grid */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Saved Replays ({clips.length})
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  Total storage: {(clips.length * 62.5).toFixed(0)} MB
                </span>
              </div>
              <div className="text-xs text-zinc-400">
                Click any clip to preview or click bookmark to protect from auto-delete
              </div>
            </div>

            {/* Clip Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {clips.map((clip) => (
                <div
                  key={clip.id}
                  className="group relative rounded-xl bg-[#141522] border border-white/[0.06] hover:border-white/20 transition-all duration-200 overflow-hidden shadow-lg flex flex-col"
                >
                  {/* Thumbnail Banner */}
                  <div
                    onClick={() => setActiveClipModal(clip)}
                    className={`h-28 bg-gradient-to-br ${clip.thumbnailGradient} relative flex items-center justify-center cursor-pointer overflow-hidden`}
                  >
                    {/* Grid texture effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px]" />

                    {/* Play button overlay on hover */}
                    <div className="w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-xl">
                      <Play className="w-4 h-4 ml-0.5 fill-white" />
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-zinc-200 border border-white/10">
                      {clip.duration}
                    </div>

                    {/* Game badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-semibold text-zinc-300 border border-white/10">
                      {clip.game}
                    </div>
                  </div>

                  {/* Clip Info Details */}
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white truncate group-hover:text-purple-300 transition-colors">
                        {clip.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono mt-1">
                        <span>{clip.size}</span>
                        <span>•</span>
                        <span>{clip.timeAgo}</span>
                      </div>
                    </div>

                    {/* Clip Actions */}
                    <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/[0.06]">
                      <button
                        onClick={() => toggleProtected(clip.id)}
                        className={`p-1.5 rounded-md text-xs transition-colors ${
                          clip.protected
                            ? "text-amber-400 bg-amber-400/10"
                            : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.05]"
                        }`}
                        title={clip.protected ? "Protected from purge" : "Bookmark clip"}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${clip.protected ? "fill-amber-400" : ""}`} />
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setActiveClipModal(clip)}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                          title="Play clip"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteClip(clip.id)}
                          className="p-1.5 rounded-md text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete clip"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for Simulated Clip Playback */}
        {activeClipModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#12121d] border border-white/10 rounded-2xl max-w-lg w-full p-6 shadow-2xl text-left relative animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-purple-400" />
                  <span className="font-semibold text-white text-sm">
                    {activeClipModal.title}
                  </span>
                </div>
                <button
                  onClick={() => setActiveClipModal(null)}
                  className="p-1 text-zinc-400 hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className={`mt-4 h-48 rounded-xl bg-gradient-to-br ${activeClipModal.thumbnailGradient} flex flex-col items-center justify-center border border-white/10 relative`}>
                <Play className="w-12 h-12 text-white/70 animate-pulse" />
                <span className="text-xs text-zinc-300 font-mono mt-2">
                  Simulated 60 FPS Replay Video Player
                </span>
                <div className="absolute bottom-3 left-4 right-4 flex items-center gap-3">
                  <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 w-1/3" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-300">0:15 / {activeClipModal.duration}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono text-zinc-400">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  Game: <span className="text-white">{activeClipModal.game}</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  Resolution: <span className="text-white">1440p (DirectX 11)</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  Codec: <span className="text-white">H.264 High Profile</span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  Audio: <span className="text-white">Stereo 48kHz WASAPI</span>
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2">
                <button
                  onClick={() => setActiveClipModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
