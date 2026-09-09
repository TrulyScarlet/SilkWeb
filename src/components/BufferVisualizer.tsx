import { useState } from "react";
import { HardDrive, Cpu, Clock, Zap } from "lucide-react";

export function BufferVisualizer() {
  const [bufferTime, setBufferTime] = useState(60); // seconds

  // Calculated approximate RAM footprint based on 60s at 1080p/1440p ~ 25Mbps bitrate
  const ramUsageMB = Math.round((bufferTime * 25) / 8);

  return (
    <section id="how-it-works" className="py-20 bg-[#0b0c13] border-y border-white/[0.06] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Architecture & Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The Bounded Replay Buffer
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Traditional recorders either write constantly to your SSD wearing out flash storage, or eat unbounded gigabytes of RAM. Silk operates in a strictly bounded ring buffer.
          </p>
        </div>

        {/* Interactive Buffer Slider & Metrics */}
        <div className="bg-[#12131e] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Replay Buffer Duration</h3>
              <p className="text-xs text-zinc-400">Drag to see memory allocation and ring buffer behavior</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-purple-400 font-mono">{bufferTime}s</span>
              <span className="text-xs uppercase text-zinc-400 font-mono tracking-wider">buffered</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="15"
            max="300"
            step="15"
            value={bufferTime}
            onChange={(e) => setBufferTime(Number(e.target.value))}
            className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />

          <div className="flex justify-between text-xs text-zinc-500 font-mono mt-2">
            <span>15s (Instant)</span>
            <span>60s (Standard)</span>
            <span>120s (Extended)</span>
            <span>300s (5 Mins)</span>
          </div>

          {/* Real-time memory calculation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/[0.06]">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Bounded RAM Footprint</span>
              </div>
              <div className="text-xl font-bold font-mono text-white">~{ramUsageMB} MB</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Strict ceiling, zero leak</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>Idle SSD Disk Writes</span>
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400">0.00 MB/s</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Zero flash drive wear</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Save-to-Disk Latency</span>
              </div>
              <div className="text-xl font-bold font-mono text-indigo-300">&lt; 380 ms</div>
              <div className="text-[11px] text-zinc-500 mt-0.5">Direct remux without re-encoding</div>
            </div>
          </div>
        </div>

        {/* 3 Step Lifecycle Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-2xl bg-[#141521] border border-white/[0.06] relative">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-sm mb-4">
              1
            </div>
            <h4 className="text-base font-bold text-white mb-2">Continuous Ingestion</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Windows Graphics Capture (WGC) and Desktop Duplication capture display frames with sub-millisecond overhead. Hardware encoders (NVENC/AMF/QSV) compress streams on the fly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141521] border border-white/[0.06] relative">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-sm mb-4">
              2
            </div>
            <h4 className="text-base font-bold text-white mb-2">Circular Ring Buffer</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Encoded packets enter a bounded memory FIFO. Once the buffer hits {bufferTime}s, the oldest seconds are dropped without touching your SSD.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141521] border border-white/[0.06] relative">
            <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center font-bold text-sm mb-4">
              3
            </div>
            <h4 className="text-base font-bold text-white mb-2">Microsecond Save</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              When hotkey is triggered, Silk flushes the memory buffer directly into an MP4 or MKV container without re-encoding, popping up a native DirectX overlay notification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
