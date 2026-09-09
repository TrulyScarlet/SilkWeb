import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Download, ShieldCheck, Sparkles, ChevronDown, Check, Terminal, ExternalLink } from "lucide-react";
import { SilkLogo } from "./SilkLogo";

interface HeroProps {
  onOpenDownloadModal: () => void;
}

export function Hero({ onOpenDownloadModal }: HeroProps) {
  const [downloadDropdown, setDownloadDropdown] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [latestVersion, setLatestVersion] = useState("v0.1.0");

  useEffect(() => {
    fetch("https://api.github.com/repos/TrulyScarlet/silk-studio/releases/latest")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.tag_name) {
          setLatestVersion(data.tag_name);
        }
      })
      .catch(() => {
        // graceful fallback to v0.1.0
      });
  }, []);

  const triggerDownload = (fileType: "setup" | "portable") => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#a855f7", "#6366f1", "#ec4899", "#38bdf8"],
    });

    const link = document.createElement("a");
    if (fileType === "portable") {
      link.href = "/downloads/Silk-Portable-Latest.exe";
      link.download = "Silk-Portable-Latest.exe";
    } else {
      link.href = "/downloads/Silk-Setup-Latest.exe";
      link.download = "Silk-Setup-Latest.exe";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadDropdown(false);
  };

  const copyCargoInstall = () => {
    navigator.clipboard.writeText("git clone https://github.com/TrulyScarlet/silk-studio.git && cd silk-studio/apps/desktop && npm run build && cd ../.. && cargo build --release");
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-purple-600/15 via-indigo-600/20 to-pink-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-12 left-1/4 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release / Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-8 backdrop-blur-md hover:border-purple-500/40 transition-colors shadow-sm cursor-default">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>Silk Studio {latestVersion} is live</span>
          <span className="w-1 h-1 rounded-full bg-purple-400/50" />
          <span className="text-zinc-400">Windows 10 & 11 (x64)</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6">
          Instant replay.{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
            Zero bloat.
          </span>
          <br className="hidden sm:inline" /> Keep every frame local.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          A Windows-first desktop recorder that continuously buffers your display and audio into memory.
          Press your hotkey to save the last 60 seconds — lightning fast, GPU-accelerated, and free from accounts or cloud complexity.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-12 relative z-20">
          {/* Main Download Button Group */}
          <div className="relative w-full sm:w-auto flex shrink-0">
            <button
              onClick={() => triggerDownload("setup")}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-3 px-6 py-3.5 rounded-l-2xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-xl shadow-purple-600/30 border border-purple-400/30 transition-all hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap"
            >
              <Download className="w-4 h-4 text-purple-200 shrink-0" />
              <span className="whitespace-nowrap">Download for Windows</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-white/20 font-mono shrink-0">
                {latestVersion}
              </span>
            </button>

            <button
              onClick={() => setDownloadDropdown(!downloadDropdown)}
              className="px-3.5 py-3.5 rounded-r-2xl bg-purple-700/80 hover:bg-purple-600 text-white border-y border-r border-purple-400/30 transition-colors shrink-0"
              aria-label="Download options"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${downloadDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Options */}
            {downloadDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#12121a] border border-white/10 rounded-xl shadow-2xl p-2 z-50 text-left backdrop-blur-xl">
                <button
                  onClick={() => triggerDownload("setup")}
                  className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.06] text-left transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-purple-500/20 text-purple-300 mt-0.5">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Installer (Recommended)</div>
                    <div className="text-[11px] text-zinc-400">Silk_0.1.0_x64-setup.exe • 2.7 MB</div>
                  </div>
                </button>

                <button
                  onClick={() => triggerDownload("portable")}
                  className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.06] text-left transition-colors"
                >
                  <div className="p-1.5 rounded-md bg-zinc-800 text-zinc-300 mt-0.5">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Standalone Portable (.exe)</div>
                    <div className="text-[11px] text-zinc-400">silk.exe • 13.5 MB • No installation</div>
                  </div>
                </button>

                <div className="border-t border-white/[0.08] my-1" />

                <button
                  onClick={() => {
                    setDownloadDropdown(false);
                    onOpenDownloadModal();
                  }}
                  className="w-full text-center py-1.5 text-xs text-purple-400 hover:text-purple-300 font-medium"
                >
                  View all release artifacts & hashes →
                </button>
              </div>
            )}
          </div>

          {/* GitHub Source Button */}
          <a
            href="https://github.com/TrulyScarlet/silk-studio"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 transition-all hover:border-white/20"
          >
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Quick CLI command */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-950/70 border border-white/[0.08] text-xs font-mono text-zinc-400 max-w-lg mx-auto">
          <span className="text-purple-400 select-none">$</span>
          <span className="truncate">git clone https://github.com/TrulyScarlet/silk-studio</span>
          <button
            onClick={copyCargoInstall}
            className="ml-auto text-zinc-400 hover:text-white flex items-center gap-1 transition-colors px-1.5 py-0.5 rounded hover:bg-white/10"
            title="Copy build command"
          >
            {copiedCurl ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] text-emerald-400">Copied</span>
              </>
            ) : (
              <span className="text-[10px]">Copy</span>
            )}
          </button>
        </div>

        {/* Feature Highlights Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mt-16 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-purple-400 mb-1">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-zinc-200">100% Local-First</div>
            <div className="text-[11px] text-zinc-500">Zero cloud, no accounts</div>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-zinc-200">GPU Accelerated</div>
            <div className="text-[11px] text-zinc-500">NVENC, AMF, QuickSync</div>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-pink-400 mb-1">
              <SilkLogo size={16} />
            </div>
            <div className="text-xs font-semibold text-zinc-200">Bounded Buffer</div>
            <div className="text-[11px] text-zinc-500">RAM-capped, zero disk wear</div>
          </div>

          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <div className="text-emerald-400 mb-1">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="text-xs font-semibold text-zinc-200">Open Source (Rust)</div>
            <div className="text-[11px] text-zinc-500">By Scarlet • TrulyScarlet</div>
          </div>
        </div>
      </div>
    </section>
  );
}
