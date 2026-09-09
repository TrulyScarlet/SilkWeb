import { useState, useRef, useEffect } from "react";
import type { MockClip } from "./AppSimulator";

interface ClipPlayerModalProps {
  clip: MockClip;
  onClose: () => void;
  theme?: string;
}

interface VODMarker {
  id: string;
  timestamp: number; // in seconds
  color: string;
  label: string;
  note?: string;
}

const MARKER_COLORS = [
  { hex: "#ef4444", label: "Red (Death / Mistake)" },
  { hex: "#22c55e", label: "Green (Kill / Highlight)" },
  { hex: "#eab308", label: "Yellow (Strategy / Rotation)" },
  { hex: "#3b82f6", label: "Blue (Utility / Callout)" },
  { hex: "#a855f7", label: "Purple (Key Moment)" },
];

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00.0";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const frac = Math.floor((seconds % 1) * 10);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${frac}`;
}

export function ClipPlayerModal({ clip, onClose, theme = "studio" }: ClipPlayerModalProps) {
  const duration = clip.durationMs / 1000;
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Audio Tracks Mixer state
  const [mixerOpen, setMixerOpen] = useState<boolean>(true);
  const [tracks, setTracks] = useState([
    { id: 1, name: "Desktop / Game Audio", channels: "Stereo", volume: 0.85, isMuted: false },
    { id: 2, name: "Microphone (WASAPI Input)", channels: "Stereo", volume: 0.95, isMuted: false },
  ]);
  const [masterVolume, setMasterVolume] = useState<number>(1.0);
  const [isMasterMuted, setIsMasterMuted] = useState<boolean>(false);

  // Trimmer state
  const [trimActive, setTrimActive] = useState<boolean>(false);
  const [trimStart, setTrimStart] = useState<number>(0);
  const [trimEnd, setTrimEnd] = useState<number>(duration);
  const [trimSavedMessage, setTrimSavedMessage] = useState<string | null>(null);

  // VOD Markers state
  const [markers, setMarkers] = useState<VODMarker[]>([
    {
      id: "m-1",
      timestamp: 12.4,
      color: "#22c55e",
      label: "Clean Entry Pick",
      note: "Instant crosshair placement on angle",
    },
    {
      id: "m-2",
      timestamp: 28.0,
      color: "#a855f7",
      label: "Clutch 1v2 Rotation",
      note: "Isolated 1v1 fight smoothly",
    },
  ]);
  const [selectedColor, setSelectedColor] = useState<string>(MARKER_COLORS[1].hex);
  const [markerLabel, setMarkerLabel] = useState<string>("");
  const [markerNote, setMarkerNote] = useState<string>("");

  const trackRef = useRef<HTMLDivElement>(null);

  // Video play timer simulation
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      if (isPlaying) {
        const delta = (now - lastTime) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta * playbackRate;
          if (next >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return next;
        });
      }
      lastTime = now;
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playbackRate, duration]);

  // Keyboard controls: Space, T for theater, M for mute
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        setIsTheaterMode((t) => !t);
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsMasterMuted((m) => !m);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSeek = (timeSec: number) => {
    const clamped = Math.max(0, Math.min(duration, timeSec));
    setCurrentTime(clamped);
  };

  const handleTrackMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const posPercent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    handleSeek(posPercent * duration);
  };

  const handleAddMarker = () => {
    if (!markerLabel.trim()) return;
    const newMarker: VODMarker = {
      id: `marker-${Date.now()}`,
      timestamp: Number(currentTime.toFixed(1)),
      color: selectedColor,
      label: markerLabel.trim(),
      note: markerNote.trim() || undefined,
    };
    setMarkers((prev) => [...prev, newMarker].sort((a, b) => a.timestamp - b.timestamp));
    setMarkerLabel("");
    setMarkerNote("");
  };

  const handleDeleteMarker = (id: string) => {
    setMarkers((prev) => prev.filter((m) => m.id !== id));
  };

  // Multi-track audio handlers
  const toggleTrackMute = (trackId: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, isMuted: !t.isMuted } : t))
    );
  };

  const handleTrackVolume = (trackId: number, val: number) => {
    setTracks((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, volume: val, isMuted: val === 0 } : t))
    );
  };

  const soloTrack = (trackId: number) => {
    setTracks((prev) =>
      prev.map((t) => ({ ...t, isMuted: t.id !== trackId }))
    );
  };

  const unmuteAllTracks = () => {
    setTracks((prev) => prev.map((t) => ({ ...t, isMuted: false })));
  };

  return (
    <div
      className={`clip-modal-backdrop ${isTheaterMode ? "is-theater-backdrop" : ""}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      data-theme={theme}
    >
      <div
        className={`clip-modal-container ${isTheaterMode ? "is-theater-container" : ""} ${isFullscreen ? "is-fullscreen-container" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: isTheaterMode ? "none" : "0 25px 60px rgba(0,0,0,0.85)",
        }}
      >
        {/* Header */}
        <div className="clip-modal-header">
          <div className="clip-modal-title-group">
            <h2>{clip.name}</h2>
            <span className="clip-modal-meta">
              {formatTime(duration)} • C:\Users\Replay\Videos\Silk\{clip.name} • {clip.gameName ?? "Desktop Capture"}
            </span>
          </div>
          <div className="clip-modal-actions">
            <button
              type="button"
              className={`button button-small ${isTheaterMode ? "button-primary" : "button-secondary"}`}
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              title="Toggle Theater Mode (T)"
            >
              {isTheaterMode ? "⬚ Standard View" : "⬚ Theater Mode"}
            </button>
            <button
              type="button"
              className="button button-secondary button-small"
              onClick={() => alert(`Simulated: Opening ${clip.name} in default Windows video player.`)}
              title="Open in default media player"
            >
              Open External
            </button>
            <button
              type="button"
              className="button-close"
              onClick={onClose}
              aria-label="Close clip player"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Theater / Standard Split Layout */}
        <div className={`clip-content-layout ${isTheaterMode ? "is-theater-layout" : ""}`}>
          {/* Main Stage (Player, Timeline, Controls, Audio Mixer, Trimmer) */}
          <div className="clip-main-stage">
            <div className={`clip-video-stage ${isFullscreen ? "is-fullscreen-stage" : ""}`}>
              {/* Video Viewport */}
              <div
                className={`clip-player-viewport ${isTheaterMode ? "is-theater-viewport" : ""}`}
                style={{
                  background: clip.bgGradient,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {/* Visual Video Playback Texture */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Animated Scanlines / Playback Indicator */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    pointerEvents: "none",
                  }}
                >
                  <span style={{ fontSize: "56px", color: "#ffffff", opacity: isPlaying ? 0.4 : 0.9, transition: "opacity 200ms" }}>
                    {isPlaying ? "❚❚" : "▶"}
                  </span>
                  <div style={{ padding: "4px 12px", borderRadius: "999px", background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", fontFamily: "monospace", color: "#ececf1" }}>
                    60 FPS DirectX Native Replay • {clip.gameName ?? "DirectX Capture"}
                  </div>
                </div>

                {/* Live audio level indicators bottom right of video */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "16px",
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "3px",
                    height: "18px",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    background: "rgba(0,0,0,0.65)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {[30, 80, 50, 95, 70, 40].map((h, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: "3px",
                        height: isPlaying && !isMasterMuted ? `${h}%` : "15%",
                        background: idx < 3 ? "#a855f7" : "#ec4899",
                        borderRadius: "1px",
                        transition: "height 120ms ease",
                      }}
                    />
                  ))}
                  <span style={{ fontSize: "10px", color: "#aaa", marginLeft: "4px", fontFamily: "monospace" }}>
                    2 CH
                  </span>
                </div>
              </div>

              {/* Timeline Scrub Bar with Keyframe Ticks & Markers */}
              <div className="clip-timeline-wrapper">
                <div
                  ref={trackRef}
                  className="clip-progress-track"
                  onMouseDown={handleTrackMouseDown}
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={currentTime}
                  tabIndex={0}
                >
                  {/* Trim region highlight */}
                  {trimActive && duration > 0 ? (
                    <div
                      className="clip-trim-region"
                      style={{
                        left: `${(trimStart / duration) * 100}%`,
                        width: `${((trimEnd - trimStart) / duration) * 100}%`,
                      }}
                    />
                  ) : null}

                  {/* Current progress */}
                  <div
                    className="clip-progress-fill"
                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                  />

                  {/* VOD Marker pins on timeline */}
                  {markers.map((m) => {
                    const posPercent = duration > 0 ? (m.timestamp / duration) * 100 : 0;
                    return (
                      <span
                        key={m.id}
                        className="clip-marker-pin"
                        style={{ left: `${posPercent}%`, backgroundColor: m.color }}
                        title={`${formatTime(m.timestamp)} - ${m.label}${m.note ? `: ${m.note}` : ""}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSeek(m.timestamp);
                        }}
                      />
                    );
                  })}
                </div>

                <div className="clip-timeline-timecodes">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls Bar */}
              <div className="clip-controls-bar">
                <div className="clip-controls-left">
                  <button
                    type="button"
                    className="button button-small button-primary"
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? "⏸ Pause" : "▶ Play"}
                  </button>
                  <button
                    type="button"
                    className="button button-small button-secondary"
                    onClick={() => handleSeek(currentTime - 5)}
                    title="Rewind 5s"
                  >
                    -5s
                  </button>
                  <button
                    type="button"
                    className="button button-small button-secondary"
                    onClick={() => handleSeek(currentTime + 5)}
                    title="Forward 5s"
                  >
                    +5s
                  </button>

                  {/* Playback Rate */}
                  <div className="rate-selector-group">
                    {[0.5, 1.0, 1.5, 2.0].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        className={`chip-button ${playbackRate === rate ? "is-selected" : ""}`}
                        onClick={() => setPlaybackRate(rate)}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="clip-controls-right">
                  {/* Audio Mixer Toggle */}
                  <button
                    type="button"
                    className={`button button-small ${mixerOpen ? "button-primary" : "button-secondary"}`}
                    onClick={() => setMixerOpen(!mixerOpen)}
                    title="Toggle Audio Tracks Mixer"
                  >
                    🎛 Audio Tracks ({tracks.length})
                  </button>

                  {/* Master Volume */}
                  <button
                    type="button"
                    className="icon-button"
                    onClick={() => setIsMasterMuted(!isMasterMuted)}
                    title={isMasterMuted ? "Unmute" : "Mute"}
                  >
                    {isMasterMuted ? "🔇" : "🔊"}
                  </button>
                  <input
                    type="range"
                    className="volume-slider"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMasterMuted ? 0 : masterVolume}
                    onChange={(e) => {
                      setMasterVolume(parseFloat(e.target.value));
                      if (isMasterMuted) setIsMasterMuted(false);
                    }}
                    aria-label="Master volume"
                  />

                  {/* Trimmer Toggle */}
                  <button
                    type="button"
                    className={`button button-small ${trimActive ? "button-primary" : "button-secondary"}`}
                    onClick={() => setTrimActive(!trimActive)}
                  >
                    ✂ {trimActive ? "Close Trimmer" : "Trim Clip"}
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    className="icon-button clip-fullscreen-symbol-btn"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    title="Toggle Fullscreen"
                  >
                    <span aria-hidden="true" style={{ fontSize: "16px", lineHeight: 1 }}>
                      {isFullscreen ? "🗗" : "⛶"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Audio Mixer Studio Drawer (Exact Silk audio tracks mixer) */}
            {mixerOpen && (
              <div className="audio-mixer-drawer">
                <div className="audio-mixer-header">
                  <div>
                    <strong>🎛 Audio Tracks Mixer ({tracks.length} tracks playing together)</strong>
                    <p className="audio-mixer-subtitle">
                      All enabled WASAPI tracks play simultaneously. Adjust volume or mute individual tracks below.
                    </p>
                  </div>
                  <div className="audio-mixer-actions">
                    <button
                      type="button"
                      className="button button-small button-secondary"
                      onClick={unmuteAllTracks}
                    >
                      Unmute All
                    </button>
                  </div>
                </div>

                <div className="audio-track-cards-grid">
                  {tracks.map((track, idx) => (
                    <div
                      key={track.id}
                      className={`audio-track-card ${track.isMuted ? "is-muted" : ""}`}
                    >
                      <div className="audio-track-info-row">
                        <span className="audio-track-label">
                          <strong>{track.name}</strong>
                          <small>Audio {idx + 1} • {track.channels}</small>
                        </span>
                        <div className="audio-track-buttons">
                          <button
                            type="button"
                            className="button button-small button-secondary audio-solo-btn"
                            onClick={() => soloTrack(track.id)}
                            title={`Solo ${track.name}`}
                          >
                            Solo
                          </button>
                          <button
                            type="button"
                            className={`button button-small ${track.isMuted ? "button-danger" : "button-secondary"}`}
                            onClick={() => toggleTrackMute(track.id)}
                            title={track.isMuted ? "Unmute track" : "Mute track"}
                          >
                            {track.isMuted ? "Muted" : "Mute"}
                          </button>
                        </div>
                      </div>

                      <div className="audio-track-slider-row">
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={track.isMuted ? 0 : track.volume}
                          onChange={(e) => handleTrackVolume(track.id, parseFloat(e.target.value))}
                          disabled={track.isMuted}
                          className="track-volume-slider"
                          aria-label={`${track.name} volume`}
                        />
                        <span className="audio-track-vol-percent">
                          {track.isMuted ? "0%" : `${Math.round(track.volume * 100)}%`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trimmer Drawer */}
            {trimActive && (
              <div className="trimmer-panel">
                <div className="trimmer-header">
                  <strong>✂ Clip Trimmer & Track Export</strong>
                  <span>
                    Trim range: <strong>{formatTime(trimStart)}</strong> to{" "}
                    <strong>{formatTime(trimEnd)}</strong> (Duration:{" "}
                    {(trimEnd - trimStart).toFixed(1)}s)
                  </span>
                </div>

                <div className="trimmer-controls-grid">
                  <div className="trim-time-group">
                    <label>Start point:</label>
                    <div className="trim-input-row">
                      <input
                        type="number"
                        step={0.1}
                        min={0}
                        max={trimEnd - 0.5}
                        value={+trimStart.toFixed(1)}
                        onChange={(e) => setTrimStart(Math.max(0, parseFloat(e.target.value) || 0))}
                      />
                      <button
                        type="button"
                        className="button button-small button-secondary"
                        onClick={() => setTrimStart(currentTime)}
                      >
                        Set In [
                      </button>
                    </div>
                  </div>

                  <div className="trim-time-group">
                    <label>End point:</label>
                    <div className="trim-input-row">
                      <input
                        type="number"
                        step={0.1}
                        min={trimStart + 0.5}
                        max={duration}
                        value={+trimEnd.toFixed(1)}
                        onChange={(e) => setTrimEnd(Math.min(duration, parseFloat(e.target.value) || duration))}
                      />
                      <button
                        type="button"
                        className="button button-small button-secondary"
                        onClick={() => setTrimEnd(currentTime)}
                      >
                        Set Out ]
                      </button>
                    </div>
                  </div>
                </div>

                <div className="trimmer-action-footer" style={{ marginTop: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {trimSavedMessage || "Direct stream remux: instant trim without re-encoding quality loss."}
                  </span>
                  <button
                    type="button"
                    className="button button-primary button-small"
                    onClick={() => {
                      setTrimSavedMessage("✓ Trim complete! New snippet saved to local library.");
                      setTimeout(() => setTrimSavedMessage(null), 3500);
                    }}
                  >
                    Export Trimmed Clip
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Exact VOD Review & Notes Sidebar */}
          <div className="vod-review-sidebar">
            <div className="vod-sidebar-header">
              <div>
                <strong>🎯 VOD Review & Notes</strong>
                <span className="vod-meta-badge">{markers.length} markers</span>
              </div>
            </div>

            <div className="vod-add-form">
              {/* Color swatches */}
              <div className="color-palette-picker" role="radiogroup" aria-label="Marker color">
                {MARKER_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    className={`color-swatch ${selectedColor === c.hex ? "is-selected" : ""}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setSelectedColor(c.hex)}
                    title={c.label}
                    aria-label={c.label}
                  />
                ))}
              </div>

              <input
                type="text"
                className="vod-note-input"
                placeholder="Bookmark title (e.g. 1v3 Clutch, Missed Smoke)..."
                value={markerLabel}
                onChange={(e) => setMarkerLabel(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddMarker();
                }}
              />

              <input
                type="text"
                className="vod-note-input vod-note-detail"
                placeholder="Detailed review notes (optional)..."
                value={markerNote}
                onChange={(e) => setMarkerNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddMarker();
                }}
              />

              <button
                type="button"
                className="button button-small button-secondary"
                onClick={handleAddMarker}
              >
                + Add Bookmark at {formatTime(currentTime)}
              </button>
            </div>

            {/* Marker List */}
            {markers.length > 0 ? (
              <div className="vod-marker-list">
                {markers.map((m) => (
                  <div key={m.id} className="vod-marker-row">
                    <span
                      className="vod-marker-dot"
                      style={{ backgroundColor: m.color }}
                      aria-hidden="true"
                    />
                    <button
                      type="button"
                      className="vod-marker-timestamp"
                      onClick={() => handleSeek(m.timestamp)}
                      title="Seek to this moment"
                    >
                      {formatTime(m.timestamp)}
                    </button>
                    <div className="vod-marker-info">
                      <strong>{m.label}</strong>
                      {m.note ? <p>{m.note}</p> : null}
                    </div>
                    <button
                      type="button"
                      className="vod-marker-delete"
                      onClick={() => handleDeleteMarker(m.id)}
                      title="Delete marker"
                      aria-label="Delete marker"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="vod-empty-text">
                No review markers yet. Play the video, choose a color, and click "+ Add Bookmark" to save timestamped feedback for your VOD reviews.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
