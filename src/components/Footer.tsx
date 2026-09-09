import { SilkLogo } from "./SilkLogo";
import { GithubIcon } from "./GithubIcon";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#07070b] border-t border-white/[0.08] py-16 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Mission */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <SilkLogo size={18} />
              </div>
              <span className="font-bold text-base text-white tracking-tight">
                Silk Studio
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono">
                v0.1.0
              </span>
            </div>
            <p className="text-zinc-500 max-w-sm text-center md:text-left">
              Fast, reliable Windows instant-replay clipping without accounts, cloud services, or streaming bloat.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-8 text-xs font-medium text-zinc-400">
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Silk Studio. Free & Open Source under the MIT License.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Created with pride and care by</span>
            <span className="text-purple-400 font-semibold">Scarlet</span>
            <Heart className="w-3 h-3 text-pink-400 fill-pink-400 ml-1 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
