import { useState } from "react";
import { HardDrive, Cpu, Clock, Zap } from "lucide-react";

export function BufferVisualizer() {
  const [bufferTime, setBufferTime] = useState(60); // seconds

  // Calculated approximate RAM footprint based on 60s at 1080p/1440p ~ 25Mbps bitrate
  const ramUsageMB = Math.round((bufferTime * 25) / 8);

  return (
    <section
      id="how-it-works"
      className="py-20 border-y transition-colors duration-300 relative"
      style={{
        backgroundColor: "var(--site-surface, #0b0c13)",
        borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.06))",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 transition-colors"
            style={{
              backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
              borderColor: "var(--site-border, rgba(168, 85, 247, 0.2))",
              color: "var(--site-accent, #a855f7)",
              borderWidth: "1px",
            }}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Architecture & Performance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--site-text, #ffffff)" }}>
            The Bounded Replay Buffer
          </h2>
          <p className="text-base sm:text-lg" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
            Traditional recorders either write constantly to your SSD wearing out flash storage, or eat unbounded gigabytes of RAM. Silk operates in a strictly bounded ring buffer.
          </p>
        </div>

        {/* Interactive Buffer Slider & Metrics */}
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-xl max-w-4xl mx-auto mb-12 transition-all duration-300"
          style={{
            backgroundColor: "var(--site-surface-raised, #12131e)",
            borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.08))",
            borderWidth: "1px",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold" style={{ color: "var(--site-text, #ffffff)" }}>Replay Buffer Duration</h3>
              <p className="text-xs" style={{ color: "var(--site-text-muted, #9d9db5)" }}>Drag to see memory allocation and ring buffer behavior</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold font-mono" style={{ color: "var(--site-accent, #a855f7)" }}>{bufferTime}s</span>
              <span className="text-xs uppercase font-mono tracking-wider" style={{ color: "var(--site-text-muted, #9d9db5)" }}>buffered</span>
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
            className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
            style={{ accentColor: "var(--site-accent, #a855f7)" }}
          />

          <div className="flex justify-between text-xs font-mono mt-2" style={{ color: "var(--site-text-muted, #73738c)" }}>
            <span>15s (Instant)</span>
            <span>60s (Standard)</span>
            <span>120s (Extended)</span>
            <span>300s (5 Mins)</span>
          </div>

          {/* Real-time memory calculation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/[0.06]">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                <Cpu className="w-3.5 h-3.5" style={{ color: "var(--site-accent, #a855f7)" }} />
                <span>Bounded RAM Footprint</span>
              </div>
              <div className="text-xl font-bold font-mono" style={{ color: "var(--site-text, #ffffff)" }}>~{ramUsageMB} MB</div>
              <div className="text-[11px] mt-0.5 opacity-70" style={{ color: "var(--site-text-muted, #73738c)" }}>Strict ceiling, zero leak</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                <span>Idle SSD Disk Writes</span>
              </div>
              <div className="text-xl font-bold font-mono text-emerald-400">0.00 MB/s</div>
              <div className="text-[11px] mt-0.5 opacity-70" style={{ color: "var(--site-text-muted, #73738c)" }}>Zero flash drive wear</div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 text-xs mb-1" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                <Zap className="w-3.5 h-3.5" style={{ color: "var(--site-accent, #a855f7)" }} />
                <span>Save-to-Disk Latency</span>
              </div>
              <div className="text-xl font-bold font-mono" style={{ color: "var(--site-accent, #a855f7)" }}>&lt; 380 ms</div>
              <div className="text-[11px] mt-0.5 opacity-70" style={{ color: "var(--site-text-muted, #73738c)" }}>Direct remux without re-encoding</div>
            </div>
          </div>
        </div>

        {/* 3 Step Lifecycle Explainer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            className="p-6 rounded-2xl border transition-all duration-300"
            style={{
              backgroundColor: "var(--site-surface-raised, #141521)",
              borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.06))",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm mb-4"
              style={{
                backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
                borderColor: "var(--site-border, rgba(168, 85, 247, 0.3))",
                color: "var(--site-accent, #a855f7)",
                borderWidth: "1px",
              }}
            >
              1
            </div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--site-text, #ffffff)" }}>Continuous Ingestion</h4>
            <p className="text-xs leading-relaxed" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
              Windows Graphics Capture (WGC) and Desktop Duplication capture display frames with sub-millisecond overhead. Hardware encoders (NVENC/AMF/QSV) compress streams on the fly.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border transition-all duration-300"
            style={{
              backgroundColor: "var(--site-surface-raised, #141521)",
              borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.06))",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm mb-4"
              style={{
                backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
                borderColor: "var(--site-border, rgba(168, 85, 247, 0.3))",
                color: "var(--site-accent, #a855f7)",
                borderWidth: "1px",
              }}
            >
              2
            </div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--site-text, #ffffff)" }}>Circular Ring Buffer</h4>
            <p className="text-xs leading-relaxed" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
              Encoded packets enter a bounded memory FIFO. Once the buffer hits {bufferTime}s, the oldest seconds are dropped without touching your SSD.
            </p>
          </div>

          <div
            className="p-6 rounded-2xl border transition-all duration-300"
            style={{
              backgroundColor: "var(--site-surface-raised, #141521)",
              borderColor: "var(--site-border-subtle, rgba(255, 255, 255, 0.06))",
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm mb-4"
              style={{
                backgroundColor: "var(--site-accent-soft, rgba(168, 85, 247, 0.1))",
                borderColor: "var(--site-border, rgba(168, 85, 247, 0.3))",
                color: "var(--site-accent, #a855f7)",
                borderWidth: "1px",
              }}
            >
              3
            </div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--site-text, #ffffff)" }}>Microsecond Save</h4>
            <p className="text-xs leading-relaxed" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
              When hotkey is triggered, Silk flushes the memory buffer directly into an MP4 or MKV container without re-encoding, popping up a native DirectX overlay notification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
