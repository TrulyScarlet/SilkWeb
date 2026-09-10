import React, { useState, useRef, useCallback } from "react";
import { HardDrive, Cpu, Clock, Zap } from "lucide-react";

interface Preset {
  value: number;
  label: string;
  desc: string;
}

const PRESETS: Preset[] = [
  { value: 15, label: "15s", desc: "Instant" },
  { value: 60, label: "60s", desc: "Standard" },
  { value: 120, label: "120s", desc: "Extended" },
  { value: 180, label: "180s", desc: "3 Mins" },
  { value: 240, label: "240s", desc: "4 Mins" },
  { value: 300, label: "300s", desc: "5 Mins" },
];

const MIN_TIME = 15;
const MAX_TIME = 300;
const TIME_SPAN = MAX_TIME - MIN_TIME; // 285

export function BufferVisualizer() {
  const [bufferTime, setBufferTime] = useState(60); // default 60 seconds
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Calculated approximate RAM footprint based on buffer seconds at 1080p/1440p ~ 25Mbps bitrate
  const ramUsageMB = Math.round((bufferTime * 25) / 8);

  const calculateTimeFromPointer = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clampedX = Math.max(0, Math.min(rect.width, clientX - rect.left));
    const ratio = clampedX / rect.width;
    const rawTime = MIN_TIME + ratio * TIME_SPAN;
    // Step snap to nearest 5 seconds
    const stepped = Math.round(rawTime / 5) * 5;
    const clamped = Math.max(MIN_TIME, Math.min(MAX_TIME, stepped));
    setBufferTime(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    calculateTimeFromPointer(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    calculateTimeFromPointer(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  // Mathematical percentage position from 0 to 100%
  const currentPct = ((bufferTime - MIN_TIME) / TIME_SPAN) * 100;

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
              <span className="text-3xl font-extrabold font-mono transition-all" style={{ color: "var(--site-accent, #a855f7)" }}>
                {bufferTime}s
              </span>
              <span className="text-xs uppercase font-mono tracking-wider" style={{ color: "var(--site-text-muted, #9d9db5)" }}>
                buffered
              </span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider mr-1" style={{ color: "var(--site-text-muted, #73738c)" }}>
              Presets:
            </span>
            {PRESETS.map((preset) => {
              const isSelected = bufferTime === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setBufferTime(preset.value)}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all"
                  style={{
                    backgroundColor: isSelected ? "var(--site-accent, #a855f7)" : "rgba(255, 255, 255, 0.04)",
                    color: isSelected ? "var(--site-bg, #09090c)" : "var(--site-text, #ffffff)",
                    border: isSelected ? "1px solid var(--site-accent, #a855f7)" : "1px solid var(--site-border-subtle, rgba(255, 255, 255, 0.1))",
                    fontWeight: isSelected ? "700" : "500",
                    boxShadow: isSelected ? "0 2px 10px var(--site-accent-glow, rgba(168, 85, 247, 0.3))" : "none",
                  }}
                >
                  {preset.label} <span className="opacity-70 text-[10px]">({preset.desc})</span>
                </button>
              );
            })}
          </div>

          {/* Precision Interactive Track */}
          <div className="relative pt-3 pb-8">
            <div
              ref={trackRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="relative w-full h-7 flex items-center cursor-pointer select-none touch-none"
              role="slider"
              aria-valuemin={MIN_TIME}
              aria-valuemax={MAX_TIME}
              aria-valuenow={bufferTime}
              aria-label="Replay buffer duration"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
                  setBufferTime((prev) => Math.max(MIN_TIME, prev - 5));
                } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
                  setBufferTime((prev) => Math.min(MAX_TIME, prev + 5));
                }
              }}
            >
              {/* Background Track */}
              <div className="w-full h-2.5 bg-zinc-800 rounded-lg overflow-hidden relative">
                {/* Active Filled Progress Bar */}
                <div
                  className="h-full rounded-lg transition-all duration-75"
                  style={{
                    width: `${currentPct}%`,
                    backgroundColor: "var(--site-accent, #a855f7)",
                  }}
                />
              </div>

              {/* Exact Mathematically Positioned Tick Marks along the Track */}
              {PRESETS.map((preset) => {
                const tickPct = ((preset.value - MIN_TIME) / TIME_SPAN) * 100;
                const isPassed = bufferTime >= preset.value;
                return (
                  <div
                    key={preset.value}
                    className="absolute w-1 h-3 rounded-full pointer-events-none -translate-x-1/2 transition-colors"
                    style={{
                      left: `${tickPct}%`,
                      backgroundColor: isPassed ? "#ffffff" : "rgba(255, 255, 255, 0.25)",
                      boxShadow: isPassed ? "0 0 4px rgba(255, 255, 255, 0.8)" : "none",
                    }}
                  />
                );
              })}

              {/* Draggable Slider Thumb */}
              <div
                className="absolute w-5 h-5 rounded-full border-2 border-white shadow-lg -translate-x-1/2 transition-transform hover:scale-125 active:scale-110 pointer-events-none"
                style={{
                  left: `${currentPct}%`,
                  backgroundColor: "var(--site-accent, #a855f7)",
                  boxShadow: "0 0 16px var(--site-accent, #a855f7)",
                }}
              />
            </div>

            {/* Exactly Aligned Labels - mathematically positioned at identical percentages */}
            <div className="relative w-full h-8 mt-1">
              {PRESETS.map((preset) => {
                const labelPct = ((preset.value - MIN_TIME) / TIME_SPAN) * 100;
                const isSelected = bufferTime === preset.value;

                // Adjust text alignment for extreme edges so labels never overflow
                let transform = "translateX(-50%)";
                let textAlign: "left" | "center" | "right" = "center";
                if (preset.value === MIN_TIME) {
                  transform = "translateX(0)";
                  textAlign = "left";
                } else if (preset.value === MAX_TIME) {
                  transform = "translateX(-100%)";
                  textAlign = "right";
                }

                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setBufferTime(preset.value)}
                    className="absolute cursor-pointer transition-colors hover:brightness-125 p-0 bg-transparent border-0"
                    style={{
                      left: `${labelPct}%`,
                      transform,
                      textAlign,
                      color: isSelected ? "var(--site-accent, #a855f7)" : "var(--site-text-muted, #73738c)",
                    }}
                    title={`Click to set buffer to ${preset.value} seconds`}
                  >
                    <div className="text-xs font-mono font-bold leading-tight">
                      {preset.label}
                    </div>
                    <div className="text-[10px] opacity-70 hidden sm:block">
                      ({preset.desc})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time memory calculation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-6 border-t border-white/[0.06]">
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
