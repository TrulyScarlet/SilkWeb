import { useState, useEffect } from "react";
import { SilkLogo } from "./SilkLogo";
import { GithubIcon } from "./GithubIcon";
import { Download, Menu, X, ExternalLink } from "lucide-react";

interface NavbarProps {
  onOpenDownload: () => void;
}

export function Navbar({ onOpenDownload }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#09090c]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-800/40 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/10 group-hover:border-purple-400/60 transition-all group-hover:scale-105">
            <SilkLogo size={22} color="currentColor" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight group-hover:text-purple-300 transition-colors">
                Silk Studio
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                v0.1.0
              </span>
            </div>
            <span className="text-[11px] text-zinc-400">by Scarlet</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Features
          </a>
          <a
            href="#simulator"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Interactive Demo
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            How It Works
          </a>
          <a
            href="#comparison"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Comparison
          </a>
          <a
            href="#about"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
          >
            About
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/TrulyScarlet/silk-studio"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-60" />
          </a>

          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/25 border border-purple-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 bg-[#0c0d14]/95 border-b border-zinc-800 backdrop-blur-2xl flex flex-col gap-3">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-zinc-300 hover:text-white py-1.5"
          >
            Features
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-zinc-300 hover:text-white py-1.5"
          >
            Interactive Demo
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-zinc-300 hover:text-white py-1.5"
          >
            How It Works
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-zinc-300 hover:text-white py-1.5"
          >
            Comparison
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-zinc-300 hover:text-white py-1.5"
          >
            About
          </a>
          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href="https://github.com/TrulyScarlet/silk-studio"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-zinc-300 bg-white/[0.05] border border-white/[0.1]"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 shadow-md shadow-purple-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Download for Windows</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
