import { Heart, ExternalLink } from "lucide-react";
import { SilkLogo } from "./SilkLogo";
import { GithubIcon } from "./GithubIcon";

export function AuthorSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-3xl border p-8 sm:p-12 shadow-2xl overflow-hidden transition-colors duration-300"
          style={{
            backgroundColor: "var(--site-surface, #161726)",
            borderColor: "var(--site-border, rgba(255, 255, 255, 0.1))",
          }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-500"
            style={{
              backgroundColor: "var(--site-accent-glow, rgba(168, 85, 247, 0.15))",
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Author Avatar Badge */}
            <div className="relative shrink-0">
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 shadow-xl transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, var(--site-accent, #c084fc), var(--site-accent-hover, #e879f9))",
                  boxShadow: "0 10px 30px var(--site-accent-glow, rgba(168, 85, 247, 0.3))",
                }}
              >
                <div
                  className="w-full h-full rounded-[22px] flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor: "var(--site-bg, #0d0e16)",
                    color: "var(--site-accent, #c084fc)",
                  }}
                >
                  <SilkLogo size={48} color="var(--site-accent, #c084fc)" />
                </div>
              </div>
              <div
                className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md transition-colors duration-300"
                style={{
                  backgroundColor: "var(--site-accent, #ec4899)",
                  color: "var(--site-bg, #09090c)",
                }}
              >
                Author
              </div>
            </div>

            {/* Author Story */}
            <div className="text-center md:text-left flex-1">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3 transition-colors duration-300"
                style={{
                  backgroundColor: "var(--site-accent-soft, rgba(236, 72, 153, 0.1))",
                  borderColor: "var(--site-border, rgba(236, 72, 153, 0.2))",
                  color: "var(--site-accent, #f472b6)",
                  borderWidth: "1px",
                }}
              >
                <Heart className="w-3.5 h-3.5" style={{ fill: "var(--site-accent, #f472b6)", color: "var(--site-accent, #f472b6)" }} />
                <span>Made by Scarlet</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3" style={{ color: "var(--site-text, #ffffff)" }}>
                Built with passion for gamers & creators.
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--site-text-muted, #d4d4d8)" }}>
                Hey, I'm <strong>Scarlet</strong>. I created <strong>Silk</strong> because modern clipping apps have gotten ridiculously bloated with logins, ads, and background resource hogging. Silk is simple: free, open-source, lightweight on RAM, 100% local, and customizable to your taste.
              </p>
              <p className="text-xs leading-relaxed mb-6 opacity-80" style={{ color: "var(--site-text-muted, #a1a1aa)" }}>
                Silk Studio was built in Rust and React to restore instant replay recording to what it should have always been: private, microsecond-fast, zero-overhead, and 100% open source.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href="https://github.com/TrulyScarlet/silk-studio"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub: TrulyScarlet/silk-studio</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <span className="text-xs font-mono opacity-60" style={{ color: "var(--site-text-muted, #71717a)" }}>
                  Rust 1.80+ • Tauri 2.0 • React
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
