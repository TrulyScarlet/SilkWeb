import confetti from "canvas-confetti";
import { Download, X, ShieldCheck, Terminal } from "lucide-react";
import { SilkLogo } from "./SilkLogo";

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  if (!isOpen) return null;

  const handleDownload = (type: "setup" | "portable") => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#6366f1", "#ec4899"],
    });

    const link = document.createElement("a");
    if (type === "portable") {
      link.href = "/downloads/Silk-Portable-Latest.exe";
      link.download = "Silk-Portable-Latest.exe";
    } else {
      link.href = "/downloads/Silk-Setup-Latest.exe";
      link.download = "Silk-Setup-Latest.exe";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#10111a] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-left animate-in fade-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-600/20">
            <SilkLogo size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Download Silk Studio
            </h3>
            <p className="text-xs text-zinc-400">
              Free & Open Source • Direct Download • No Account Required
            </p>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-3 mb-6">
          {/* Windows Setup Installer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-purple-950/30 border border-purple-500/30 hover:border-purple-400/60 transition-all flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 mt-0.5">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Windows Installer (.exe)</span>
                  <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/30">
                    Recommended
                  </span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5 font-mono">
                  Silk_0.1.0_x64-setup.exe • 2.7 MB • NSIS
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload("setup")}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all hover:scale-105 shrink-0"
            >
              Download
            </button>
          </div>

          {/* Standalone Portable */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 mt-0.5">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">Standalone Portable (.exe)</span>
                </div>
                <div className="text-xs text-zinc-400 mt-0.5 font-mono">
                  silk.exe • 13.5 MB • Zero installation required
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload("portable")}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-200 bg-white/10 hover:bg-white/20 transition-all hover:scale-105 shrink-0"
            >
              Download
            </button>
          </div>
        </div>

        {/* System Requirements Note */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] text-xs text-zinc-400 space-y-2 mb-6">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>System Requirements</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-zinc-400 font-mono">
            <li>Windows 10 (version 1903+) or Windows 11 (64-bit)</li>
            <li>DirectX 11 / 12 compatible GPU (NVIDIA NVENC, AMD AMF, or Intel QuickSync)</li>
            <li>No administrator rights required (installs to user profile)</li>
          </ul>
        </div>

        {/* Source link */}
        <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-white/[0.08]">
          <span>Looking for source code or Linux/macOS?</span>
          <a
            href="https://github.com/TrulyScarlet/silk-studio"
            target="_blank"
            rel="noreferrer"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            GitHub Repository →
          </a>
        </div>
      </div>
    </div>
  );
}
