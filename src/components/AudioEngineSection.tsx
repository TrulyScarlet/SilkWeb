import { useState } from "react";
import { Mic, Volume2, Sliders, CheckCircle2 } from "lucide-react";

export function AudioEngineSection() {
  const [gameVolume, setGameVolume] = useState(80);
  const [micVolume, setMicVolume] = useState(95);

  return (
    <section
      className="py-20 relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: "var(--site-bg, #09090e)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 transition-colors"
              style={{
                backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
                borderColor: "var(--site-border, rgba(168, 85, 247, 0.2))",
                color: "var(--site-accent, #a855f7)",
                borderWidth: "1px",
              }}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Independent WASAPI Audio Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 leading-tight" style={{ color: "var(--site-text, #ffffff)" }}>
              Discrete Multi-Track Audio. <br />
              <span
                className="bg-clip-text text-transparent transition-all duration-300"
                style={{
                  backgroundImage: "linear-gradient(135deg, var(--site-accent, #c084fc), #ffffff, var(--site-accent-hover, #e879f9))",
                }}
              >
                Never ruin a clip with loud Discord chatter.
              </span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
              Silk records separate audio streams directly through Windows WASAPI loopback and input endpoints. In your video editor, you have total control over game sound versus microphone commentary.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--site-accent, #a855f7)" }} />
                <div className="text-xs" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                  <strong style={{ color: "var(--site-text, #ffffff)" }}>Sample-accurate synchronization:</strong> Audio clock matches video presentation timestamps (PTS) to prevent drift even during multi-hour captures.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--site-accent, #a855f7)" }} />
                <div className="text-xs" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                  <strong style={{ color: "var(--site-text, #ffffff)" }}>Clean track separation:</strong> Track 1 = Desktop / Game loopback; Track 2 = Filtered Microphone input.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--site-accent, #a855f7)" }} />
                <div className="text-xs" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                  <strong style={{ color: "var(--site-text, #ffffff)" }}>Per-track digital gain:</strong> Balance hot microphones or quiet game audio before muxing.
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Audio Mixer Preview */}
          <div
            className="border rounded-2xl p-6 shadow-2xl relative transition-colors duration-300"
            style={{
              backgroundColor: "var(--site-surface, #12131f)",
              borderColor: "var(--site-border, rgba(255, 255, 255, 0.1))",
            }}
          >
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4" style={{ color: "var(--site-accent, #a855f7)" }} />
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--site-text, #ffffff)" }}>
                  Live WASAPI Mixer Control
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                48,000 Hz • Stereo Float32
              </span>
            </div>

            {/* Track 1: Game Audio */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--site-text, #ffffff)" }}>
                  <Volume2 className="w-4 h-4" style={{ color: "var(--site-accent, #a855f7)" }} />
                  <span>Track 1: System / Game Loopback</span>
                </div>
                <span className="font-mono" style={{ color: "var(--site-text-muted, #9d9db5)" }}>{gameVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={gameVolume}
                onChange={(e) => setGameVolume(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: "var(--site-accent, #a855f7)" }}
              />
              {/* Simulated Waveform Visualizer */}
              <div className="h-6 flex items-end gap-1 px-1 py-1 bg-black/40 rounded-lg overflow-hidden">
                {[40, 65, 85, 30, 95, 70, 50, 80, 60, 45, 90, 75, 55, 35, 80, 95, 60, 40, 70, 85, 50, 65, 90, 40].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-150"
                    style={{
                      height: `${(h * gameVolume) / 100}%`,
                      backgroundColor: "var(--site-accent, #a855f7)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Track 2: Microphone */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold" style={{ color: "var(--site-text, #ffffff)" }}>
                  <Mic className="w-4 h-4" style={{ color: "var(--site-accent-hover, #c084fc)" }} />
                  <span>Track 2: Microphone Input (WASAPI Capture)</span>
                </div>
                <span className="font-mono" style={{ color: "var(--site-text-muted, #9d9db5)" }}>{micVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={micVolume}
                onChange={(e) => setMicVolume(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: "var(--site-accent-hover, #c084fc)" }}
              />
              {/* Simulated Waveform Visualizer */}
              <div className="h-6 flex items-end gap-1 px-1 py-1 bg-black/40 rounded-lg overflow-hidden">
                {[20, 45, 90, 70, 30, 85, 95, 60, 40, 80, 55, 35, 90, 75, 45, 60, 85, 95, 40, 70, 60, 80, 50, 30].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm transition-all duration-150"
                    style={{
                      height: `${(h * micVolume) / 100}%`,
                      backgroundColor: "var(--site-accent-hover, #c084fc)",
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
