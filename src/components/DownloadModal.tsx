import confetti from "canvas-confetti";
import { Download, X, Terminal } from "lucide-react";
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
      colors: ["#a855f7", "#6366f1", "#ec4899", "#ff9a3c", "#ffffb3"],
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
      <div
        className="border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative text-left animate-in fade-in zoom-in-95 transition-colors duration-300"
        style={{
          backgroundColor: "var(--site-surface, #10111a)",
          borderColor: "var(--site-border, rgba(255, 255, 255, 0.15))",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-colors"
          style={{ color: "var(--site-text-muted, #a1a1aa)" }}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all"
            style={{
              backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.15))",
              border: "1px solid var(--site-border, rgba(168, 85, 247, 0.3))",
              color: "var(--site-accent, #a855f7)",
              boxShadow: "0 0 20px var(--site-accent-glow, rgba(168, 85, 247, 0.2))",
            }}
          >
            <SilkLogo size={24} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight" style={{ color: "var(--site-text, #ffffff)" }}>
              Download Silk Studio
            </h3>
            <p className="text-xs" style={{ color: "var(--site-text-muted, #a1a1aa)" }}>
              Free & Open Source • Direct Download • No Account Required
            </p>
          </div>
        </div>

        {/* Download Options */}
        <div className="space-y-3 mb-6">
          {/* Windows Setup Installer */}
          <div
            className="p-4 rounded-2xl border transition-all flex items-center justify-between gap-4"
            style={{
              backgroundColor: "var(--site-surface-raised, #181822)",
              borderColor: "var(--site-border, rgba(168, 85, 247, 0.3))",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="p-2.5 rounded-xl mt-0.5"
                style={{
                  backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.15))",
                  color: "var(--site-accent, #a855f7)",
                }}
              >
                <Download className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm" style={{ color: "var(--site-text, #ffffff)" }}>Windows Installer (.exe)</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold border"
                    style={{
                      backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.15))",
                      borderColor: "var(--site-border, rgba(168, 85, 247, 0.3))",
                      color: "var(--site-accent, #c084fc)",
                    }}
                  >
                    Recommended
                  </span>
                </div>
                <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--site-text-muted, #a1a1aa)" }}>
                  Silk_0.1.0_x64-setup.exe • 2.7 MB • NSIS
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload("setup")}
              className="px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg transition-all hover:scale-105 shrink-0"
              style={{
                backgroundColor: "var(--site-accent, #a855f7)",
                color: "var(--site-bg, #09090c)",
                boxShadow: "0 4px 14px var(--site-accent-glow, rgba(168, 85, 247, 0.3))",
              }}
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
                  <span className="font-bold text-sm" style={{ color: "var(--site-text, #ffffff)" }}>Standalone Portable (.exe)</span>
                </div>
                <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--site-text-muted, #a1a1aa)" }}>
                  Silk-Portable-Latest.exe • 13.5 MB • Zero install
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload("portable")}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-all shrink-0"
            >
              Download
            </button>
          </div>
        </div>

        {/* Verification hashes & Author Note */}
        <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px]" style={{ color: "var(--site-text-muted, #71717a)" }}>
          <span>Compatible with Windows 10 & 11 (64-bit)</span>
          <span style={{ color: "var(--site-accent, #a855f7)" }}>SHA-256 Verified Release</span>
        </div>
      </div>
    </div>
  );
}
