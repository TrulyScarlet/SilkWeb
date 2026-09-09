import { Heart, ExternalLink } from "lucide-react";
import { SilkLogo } from "./SilkLogo";
import { GithubIcon } from "./GithubIcon";

export function AuthorSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#161726] to-[#0f101a] border border-white/10 p-8 sm:p-12 shadow-2xl overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Author Avatar Badge */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-500 p-1 shadow-xl shadow-purple-600/30">
                <div className="w-full h-full rounded-[22px] bg-[#0d0e16] flex items-center justify-center text-purple-300">
                  <SilkLogo size={48} color="#c084fc" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-pink-500 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                Author
              </div>
            </div>

            {/* Author Story */}
            <div className="text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
                <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                <span>Made by Scarlet</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                Built with passion for gamers & creators.
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                Hi, I’m <strong>Scarlet</strong>, the creator and author of <strong>Silk Studio</strong>. Like many of you, I was tired of bloated gaming capture apps that demanded account logins, pushed promotional spam, consumed gigabytes of background memory, or constantly uploaded telemetry to external servers.
              </p>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
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

                <span className="text-xs text-zinc-500 font-mono">
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
