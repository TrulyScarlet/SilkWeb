import { useState, useEffect } from "react";
import { SilkLogo } from "./SilkLogo";
import { GithubIcon } from "./GithubIcon";
import { Download, Menu, X, ExternalLink, Palette } from "lucide-react";
import type { AppTheme } from "./AppSimulator";

interface NavbarProps {
  onOpenDownload: () => void;
  theme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}

export function Navbar({ onOpenDownload, theme = "studio", onThemeChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const themes: { id: AppTheme; label: string; color: string }[] = [
    { id: "studio", label: "Studio", color: "#a855f7" },
    { id: "classic", label: "Classic", color: "#ffffb3" },
    { id: "ember", label: "Ember", color: "#ff9a3c" },
    { id: "vamp", label: "Vamp", color: "#ff2e43" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl border-b shadow-2xl py-3"
          : "bg-transparent py-5"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(9, 9, 12, 0.85)" : "transparent",
        borderColor: scrolled ? "var(--site-border-subtle, rgba(255, 255, 255, 0.08))" : "transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all group-hover:scale-105"
            style={{
              background: "var(--site-accent-soft, rgba(168, 85, 247, 0.14))",
              border: "1px solid var(--site-border, rgba(168, 85, 247, 0.3))",
              color: "var(--site-accent, #a855f7)",
              boxShadow: "0 0 20px var(--site-accent-glow, rgba(168, 85, 247, 0.2))",
            }}
          >
            <SilkLogo size={22} color="currentColor" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className="font-bold text-lg tracking-tight transition-colors"
                style={{ color: "var(--site-text, #ffffff)" }}
              >
                Silk Studio
              </span>
              <span
                className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded transition-colors"
                style={{
                  background: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
                  border: "1px solid var(--site-border, rgba(168, 85, 247, 0.2))",
                  color: "var(--site-accent, #a855f7)",
                }}
              >
                v0.1.0
              </span>
            </div>
            <span className="text-[11px] opacity-70" style={{ color: "var(--site-text, #aaa)" }}>
              by Scarlet
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm hover:text-white transition-colors"
            style={{ color: "var(--site-text-muted, #9d9db5)" }}
          >
            Features
          </a>
          <a
            href="#simulator"
            className="text-sm hover:text-white transition-colors"
            style={{ color: "var(--site-text-muted, #9d9db5)" }}
          >
            Interactive Demo
          </a>
          <a
            href="#how-it-works"
            className="text-sm hover:text-white transition-colors"
            style={{ color: "var(--site-text-muted, #9d9db5)" }}
          >
            How It Works
          </a>
          <a
            href="#comparison"
            className="text-sm hover:text-white transition-colors"
            style={{ color: "var(--site-text-muted, #9d9db5)" }}
          >
            Comparison
          </a>
          <a
            href="#about"
            className="text-sm hover:text-white transition-colors"
            style={{ color: "var(--site-text-muted, #9d9db5)" }}
          >
            About
          </a>
        </nav>

        {/* Action Buttons & Theme Selector */}
        <div className="hidden md:flex items-center gap-3">
          {/* Quick Theme Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--site-border-subtle, rgba(255, 255, 255, 0.08))",
                color: "var(--site-text, #ffffff)",
              }}
              title="Change Global Website Theme"
            >
              <Palette className="w-3.5 h-3.5" style={{ color: "var(--site-accent, #a855f7)" }} />
              <span className="capitalize">{theme} Theme</span>
            </button>

            {themeDropdownOpen && (
              <div
                className="absolute top-full right-0 mt-2 w-40 rounded-xl p-1.5 shadow-2xl z-50 backdrop-blur-2xl"
                style={{
                  background: "var(--site-surface, #121216)",
                  border: "1px solid var(--site-border, rgba(255, 255, 255, 0.15))",
                }}
              >
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onThemeChange?.(t.id);
                      setThemeDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors hover:bg-white/[0.08]"
                    style={{
                      color: theme === t.id ? t.color : "var(--site-text, #ffffff)",
                      background: theme === t.id ? "rgba(255, 255, 255, 0.06)" : "transparent",
                    }}
                  >
                    <span>{t.label}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

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
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "var(--site-accent, #a855f7)",
              color: theme === "classic" ? "#0e0f0b" : "#ffffff",
              boxShadow: "0 0 25px var(--site-accent-glow, rgba(168, 85, 247, 0.3))",
              border: "1px solid var(--site-border, rgba(255, 255, 255, 0.2))",
            }}
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
        <div
          className="md:hidden px-4 pt-4 pb-6 border-b backdrop-blur-2xl flex flex-col gap-3"
          style={{
            backgroundColor: "var(--site-surface, #0c0d14)",
            borderColor: "var(--site-border-subtle, #27272a)",
          }}
        >
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm py-1.5"
            style={{ color: "var(--site-text, #ffffff)" }}
          >
            Features
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm py-1.5"
            style={{ color: "var(--site-text, #ffffff)" }}
          >
            Interactive Demo
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm py-1.5"
            style={{ color: "var(--site-text, #ffffff)" }}
          >
            How It Works
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm py-1.5"
            style={{ color: "var(--site-text, #ffffff)" }}
          >
            Comparison
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm py-1.5"
            style={{ color: "var(--site-text, #ffffff)" }}
          >
            About
          </a>

          {/* Theme switcher row on mobile */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs" style={{ color: "var(--site-text-muted, #aaa)" }}>Theme:</span>
            <div className="flex gap-1.5">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onThemeChange?.(t.id)}
                  className="px-2.5 py-1 rounded text-xs font-semibold"
                  style={{
                    backgroundColor: theme === t.id ? t.color : "rgba(255,255,255,0.06)",
                    color: theme === t.id ? (t.id === "classic" ? "#000" : "#fff") : "var(--site-text, #aaa)",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
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
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold shadow-md"
              style={{
                background: "var(--site-accent, #a855f7)",
                color: theme === "classic" ? "#0e0f0b" : "#ffffff",
              }}
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
