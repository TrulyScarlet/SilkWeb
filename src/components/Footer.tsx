import { SilkLogo } from "./SilkLogo";
import { GithubIcon } from "./GithubIcon";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t py-16 text-xs transition-colors duration-300"
      style={{
        backgroundColor: "var(--site-bg, #07070b)",
        borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.08))",
        color: "var(--site-text-muted, #9d9db5)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.15))",
                  border: "1px solid var(--site-border, rgba(168, 85, 247, 0.3))",
                  color: "var(--site-accent, #a855f7)",
                }}
              >
                <SilkLogo size={18} />
              </div>
              <span className="font-bold text-base tracking-tight" style={{ color: "var(--site-text, #ffffff)" }}>
                Silk Studio
              </span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                style={{
                  backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
                  color: "var(--site-accent, #c084fc)",
                  border: "1px solid var(--site-border, rgba(168, 85, 247, 0.2))",
                }}
              >
                v0.1.0
              </span>
            </div>
            <p className="max-w-sm text-center md:text-left opacity-70" style={{ color: "var(--site-text-muted, #71717a)" }}>
              Fast, reliable Windows instant-replay clipping without accounts, cloud services, or streaming bloat.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-8 text-xs font-medium" style={{ color: "var(--site-text-muted, #a1a1aa)" }}>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#simulator" className="hover:text-white transition-colors">
              Simulator
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Architecture
            </a>
            <a href="#comparison" className="hover:text-white transition-colors">
              Comparison
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About Scarlet
            </a>
            <a
              href="https://github.com/TrulyScarlet/silk-studio"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] opacity-70" style={{ color: "var(--site-text-muted, #71717a)" }}>
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Silk Studio. Free & Open Source under the MIT License.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Created with pride and care by</span>
            <span className="font-semibold" style={{ color: "var(--site-accent, #a855f7)" }}>Scarlet</span>
            <Heart className="w-3 h-3 ml-1 inline" style={{ color: "var(--site-accent, #ec4899)", fill: "var(--site-accent, #ec4899)" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
