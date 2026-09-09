import { useState } from "react";
import { Mic, Volume2, Sliders, CheckCircle2 } from "lucide-react";

export function AudioEngineSection() {
  const [gameVolume, setGameVolume] = useState(80);
  const [micVolume, setMicVolume] = useState(95);

  return (
    <section className="py-20 bg-[#09090e] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-medium mb-4">
              <Mic className="w-3.5 h-3.5" />
              <span>Independent WASAPI Audio Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              Discrete Multi-Track Audio. <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Never ruin a clip with loud Discord chatter.
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              Silk records separate audio streams directly through Windows WASAPI loopback and input endpoints. In your video editor, you have total control over game sound versus microphone commentary.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                <div className="text-xs text-zinc-300">
                  <strong className="text-white">Sample-accurate synchronization:</strong> Audio clock matches video presentation timestamps (PTS) to prevent drift even during multi-hour captures.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                <div className="text-xs text-zinc-300">
                  <strong className="text-white">Clean track separation:</strong> Track 1 = Desktop / Game loopback; Track 2 = Filtered Microphone input.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                <div className="text-xs text-zinc-300">
                  <strong className="text-white">Per-track digital gain:</strong> Balance hot microphones or quiet game audio before muxing.
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Audio Mixer Preview */}
          <div className="bg-[#12131f] border border-white/10 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-pink-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
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
                <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                  <Volume2 className="w-4 h-4 text-purple-400" />
                  <span>Track 1: System / Game Loopback</span>
                </div>
                <span className="text-zinc-400 font-mono">{gameVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={gameVolume}
                onChange={(e) => setGameVolume(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
              {/* Simulated Waveform Visualizer */}
              <div className="h-6 flex items-end gap-1 px-1 py-1 bg-black/40 rounded-lg overflow-hidden">
                {[40, 65, 85, 30, 95, 70, 50, 80, 60, 45, 90, 75, 55, 35, 80, 95, 60, 40, 70, 85, 50, 65, 90, 40].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-purple-600 to-indigo-400 rounded-t-sm transition-all duration-150"
                    style={{ height: `${(h * gameVolume) / 100}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Track 2: Microphone */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-200 font-semibold">
                  <Mic className="w-4 h-4 text-pink-400" />
                  <span>Track 2: Microphone Input (WASAPI Capture)</span>
                </div>
                <span className="text-zinc-400 font-mono">{micVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={micVolume}
                onChange={(e) => setMicVolume(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              {/* Simulated Waveform Visualizer */}
              <div className="h-6 flex items-end gap-1 px-1 py-1 bg-black/40 rounded-lg overflow-hidden">
                {[20, 45, 90, 70, 30, 85, 95, 60, 40, 80, 55, 35, 90, 75, 45, 60, 85, 95, 40, 70, 60, 80, 50, 30].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-pink-600 to-purple-400 rounded-t-sm transition-all duration-150"
                    style={{ height: `${(h * micVolume) / 100}%` }}
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
