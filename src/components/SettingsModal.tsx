import { useState } from "react";
import type { AppTheme } from "./AppSimulator";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}

type SettingsTab = "capture" | "video" | "audio" | "storage" | "hud" | "theme";

export function SettingsModal({
  isOpen,
  onClose,
  theme,
  onThemeChange,
}: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("capture");

  // Setting draft values
  const [hotkey, setHotkey] = useState("Ctrl+Shift+F10");
  const [bufferDuration, setBufferDuration] = useState(60);
  const [targetDisplay, setTargetDisplay] = useState("Display 1 (2560x1440 @ 60 Hz)");
  const [frameRate, setFrameRate] = useState<number>(60);
  const [videoBitrate, setVideoBitrate] = useState<number>(45);
  const [encoder, setEncoder] = useState("AMD AMF Hardware Encoder (RX 9070 XT)");
  const [fidelityMode, setFidelityMode] = useState<"standard" | "clarity">("standard");

  // Audio settings
  const [desktopVolume, setDesktopVolume] = useState(85);
  const [micVolume, setMicVolume] = useState(95);
  const [micMuted, setMicMuted] = useState(false);

  // Storage settings
  const [storageDir, setStorageDir] = useState("C:\\Users\\Replay\\Videos\\Silk");
  const [autoDelete, setAutoDelete] = useState(false);
  const [storageQuota, setStorageQuota] = useState(100);

  // HUD settings
  const [hudOverlay, setHudOverlay] = useState(true);
  const [hudPosition, setHudPosition] = useState("bottom_center");
  const [clipSound, setClipSound] = useState(true);

  if (!isOpen) return null;

  const themes: { id: AppTheme; title: string; subtitle: string; color: string; bg: string }[] = [
    {
      id: "studio",
      title: "Studio",
      subtitle: "Default Cyber-Violet Accent with dark slate canvas",
      color: "#a855f7",
      bg: "#09090c",
    },
    {
      id: "classic",
      title: "Classic",
      subtitle: "Warm butter-yellow retro aesthetic with olive undertones",
      color: "#ffffb3",
      bg: "#0e0f0b",
    },
    {
      id: "ember",
      title: "Ember",
      subtitle: "Autumn neon fiery amber with mint secondary telemetry",
      color: "#ff9a3c",
      bg: "#1c120c",
    },
    {
      id: "vamp",
      title: "Vamp",
      subtitle: "Cyberpunk high-contrast crimson red with obsidian blacks",
      color: "#ff2e43",
      bg: "#0e0e11",
    },
  ];

  return (
    <div
      className="settings-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      data-theme={theme}
    >
      <div className="settings-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="settings-modal-header">
          <div className="settings-header-title-group">
            <span className="settings-header-glyph" aria-hidden="true">
              ⚙
            </span>
            <div>
              <h2 className="settings-modal-title">Settings</h2>
              <span className="settings-modal-subtitle">
                Configure capture targets, video fidelity, audio tracks, and shortcuts
              </span>
            </div>
          </div>

          <div className="settings-header-actions">
            <button
              type="button"
              className="settings-modal-close-btn"
              onClick={onClose}
              title="Close Settings (Esc)"
              aria-label="Close Settings"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Modal Main Body (Sidebar Tabs + Content Area) */}
        <div className="settings-modal-form">
          <div className="settings-modal-body">
            {/* Sidebar Navigation */}
            <nav className="settings-nav-sidebar" aria-label="Settings categories">
              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "capture" ? "is-active" : ""}`}
                onClick={() => setActiveTab("capture")}
              >
                <span className="tab-icon">🎮</span>
                <span className="tab-label">Capture & Hotkeys</span>
              </button>

              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "video" ? "is-active" : ""}`}
                onClick={() => setActiveTab("video")}
              >
                <span className="tab-icon">🎬</span>
                <span className="tab-label">Video & Bitrate</span>
              </button>

              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "audio" ? "is-active" : ""}`}
                onClick={() => setActiveTab("audio")}
              >
                <span className="tab-icon">🔊</span>
                <span className="tab-label">Audio Tracks</span>
                <span className="tab-badge">2</span>
              </button>

              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "storage" ? "is-active" : ""}`}
                onClick={() => setActiveTab("storage")}
              >
                <span className="tab-icon">💾</span>
                <span className="tab-label">Storage & Quota</span>
              </button>

              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "hud" ? "is-active" : ""}`}
                onClick={() => setActiveTab("hud")}
              >
                <span className="tab-icon">🔔</span>
                <span className="tab-label">HUD & Sound</span>
              </button>

              <button
                type="button"
                className={`settings-tab-btn ${activeTab === "theme" ? "is-active" : ""}`}
                onClick={() => setActiveTab("theme")}
              >
                <span className="tab-icon">🎨</span>
                <span className="tab-label">Appearance & Theme</span>
              </button>
            </nav>

            {/* Main Content Area */}
            <div
              className="settings-content-area"
              style={{
                flex: 1,
                padding: "24px",
                overflowY: "auto",
                background: "var(--surface)",
                color: "var(--text)",
              }}
            >
              {/* TAB 1: Capture & Hotkeys */}
              {activeTab === "capture" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>
                      Instant Replay Trigger
                    </h3>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                      Press this global shortcut anywhere in Windows to save the preceding buffer.
                    </p>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <input
                        type="text"
                        value={hotkey}
                        onChange={(e) => setHotkey(e.target.value)}
                        style={{
                          background: "var(--surface-input)",
                          border: "1px solid var(--accent-line)",
                          borderRadius: "8px",
                          padding: "10px 14px",
                          fontFamily: "monospace",
                          color: "var(--accent)",
                          fontSize: "13px",
                          fontWeight: "bold",
                          width: "220px",
                        }}
                      />
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Default: <kbd style={{ padding: "2px 6px", background: "var(--surface-raised)", borderRadius: "4px" }}>Ctrl+Shift+F10</kbd>
                      </span>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "600" }}>
                        Replay Buffer Duration
                      </label>
                      <span style={{ fontFamily: "monospace", color: "var(--accent)", fontWeight: "bold" }}>
                        {bufferDuration} seconds ({(bufferDuration / 60).toFixed(1)} mins)
                      </span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={300}
                      step={15}
                      value={bufferDuration}
                      onChange={(e) => setBufferDuration(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--accent)" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                      <span>15s (Instant)</span>
                      <span>60s (Standard)</span>
                      <span>120s</span>
                      <span>300s (5 Mins)</span>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                      Capture Target Display
                    </label>
                    <select
                      value={targetDisplay}
                      onChange={(e) => setTargetDisplay(e.target.value)}
                      style={{
                        background: "var(--surface-input)",
                        border: "1px solid var(--accent-line)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "var(--text)",
                        width: "100%",
                      }}
                    >
                      <option value="Display 1 (2560x1440 @ 60 Hz)">Display 1 (2560x1440 @ 60 Hz) - Primary</option>
                      <option value="Display 2 (1920x1080 @ 144 Hz)">Display 2 (1920x1080 @ 144 Hz)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 2: Video & Bitrate */}
              {activeTab === "video" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
                      Capture Frame Rate
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {[30, 60, 120].map((fps) => (
                        <button
                          key={fps}
                          type="button"
                          onClick={() => setFrameRate(fps)}
                          style={{
                            flex: 1,
                            padding: "8px 16px",
                            borderRadius: "8px",
                            border: `1px solid ${frameRate === fps ? "var(--accent)" : "var(--accent-line)"}`,
                            background: frameRate === fps ? "var(--accent-soft)" : "var(--surface-input)",
                            color: frameRate === fps ? "var(--accent)" : "var(--text-soft)",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          {fps} FPS
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "600" }}>Video Bitrate</label>
                      <span style={{ fontFamily: "monospace", color: "var(--accent)", fontWeight: "bold" }}>
                        {videoBitrate} Mbps
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={100}
                      step={5}
                      value={videoBitrate}
                      onChange={(e) => setVideoBitrate(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--accent)" }}
                    />
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                      Hardware Encoder Backend
                    </label>
                    <select
                      value={encoder}
                      onChange={(e) => setEncoder(e.target.value)}
                      style={{
                        background: "var(--surface-input)",
                        border: "1px solid var(--accent-line)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "var(--text)",
                        width: "100%",
                      }}
                    >
                      <option value="AMD AMF Hardware Encoder (RX 9070 XT)">AMD AMF Hardware Encoder (H.264 / HEVC / AV1)</option>
                      <option value="NVIDIA NVENC Hardware Encoder">NVIDIA NVENC Hardware Encoder</option>
                      <option value="Intel QuickSync Hardware Encoder">Intel QuickSync Hardware Encoder</option>
                    </select>
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                      Pixel Fidelity Mode
                    </label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="fidelity"
                          checked={fidelityMode === "standard"}
                          onChange={() => setFidelityMode("standard")}
                        />
                        <span>Standard (NV12 4:2:0) - GPU Accelerated</span>
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>
                        <input
                          type="radio"
                          name="fidelity"
                          checked={fidelityMode === "clarity"}
                          onChange={() => setFidelityMode("clarity")}
                        />
                        <span>Clarity (High Chroma)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Audio Tracks */}
              {activeTab === "audio" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>
                      Multi-Track Audio Engine
                    </h3>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                      Silk captures discrete WASAPI tracks into separate channels in the MP4 file.
                    </p>
                  </div>

                  {/* Track 1 */}
                  <div
                    style={{
                      background: "var(--surface-input)",
                      border: "1px solid var(--accent-line)",
                      borderRadius: "10px",
                      padding: "14px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div>
                        <strong>Track 1: Desktop / Game Audio</strong>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>WASAPI Loopback (Stereo)</div>
                      </div>
                      <span style={{ fontFamily: "monospace", color: "var(--accent)" }}>{desktopVolume}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={desktopVolume}
                      onChange={(e) => setDesktopVolume(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--accent)" }}
                    />
                  </div>

                  {/* Track 2 */}
                  <div
                    style={{
                      background: "var(--surface-input)",
                      border: "1px solid var(--accent-line)",
                      borderRadius: "10px",
                      padding: "14px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <div>
                        <strong>Track 2: Microphone Input</strong>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Default Communications Device (WASAPI)</div>
                      </div>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={() => setMicMuted(!micMuted)}
                          style={{
                            fontSize: "11px",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            background: micMuted ? "rgba(248, 113, 113, 0.2)" : "var(--surface-raised)",
                            color: micMuted ? "#f87171" : "var(--text)",
                            border: "1px solid var(--accent-line)",
                            cursor: "pointer",
                          }}
                        >
                          {micMuted ? "Muted" : "Mute"}
                        </button>
                        <span style={{ fontFamily: "monospace", color: "var(--accent)" }}>
                          {micMuted ? "0%" : `${micVolume}%`}
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={micMuted ? 0 : micVolume}
                      onChange={(e) => {
                        setMicVolume(Number(e.target.value));
                        if (micMuted) setMicMuted(false);
                      }}
                      disabled={micMuted}
                      style={{ width: "100%", accentColor: "var(--accent)" }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: Storage & Quota */}
              {activeTab === "storage" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                      Replay Save Directory
                    </label>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <input
                        type="text"
                        value={storageDir}
                        onChange={(e) => setStorageDir(e.target.value)}
                        style={{
                          flex: 1,
                          background: "var(--surface-input)",
                          border: "1px solid var(--accent-line)",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          color: "var(--text)",
                          fontFamily: "monospace",
                          fontSize: "12px",
                        }}
                      />
                      <button
                        type="button"
                        style={{
                          padding: "8px 16px",
                          borderRadius: "8px",
                          background: "var(--surface-raised)",
                          border: "1px solid var(--accent-line)",
                          color: "var(--text)",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Browse
                      </button>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong>Automatic Deletion of Old Clips</strong>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          Automatically prune oldest non-protected clips when quota is reached
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={autoDelete}
                        onChange={(e) => setAutoDelete(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: "var(--accent)" }}
                      />
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "600" }}>Storage Quota</label>
                      <span style={{ fontFamily: "monospace", color: "var(--accent)", fontWeight: "bold" }}>
                        {storageQuota} GB
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={10}
                      value={storageQuota}
                      onChange={(e) => setStorageQuota(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--accent)" }}
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: HUD & Sound */}
              {activeTab === "hud" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong>In-Game Direct2D Overlay Toast</strong>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        Show hardware toast notification inside full-screen DirectX games when clipping
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={hudOverlay}
                      onChange={(e) => setHudOverlay(e.target.checked)}
                      style={{ width: "18px", height: "18px", accentColor: "var(--accent)" }}
                    />
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "600", display: "block", marginBottom: "8px" }}>
                      HUD Toast Position
                    </label>
                    <select
                      value={hudPosition}
                      onChange={(e) => setHudPosition(e.target.value)}
                      style={{
                        background: "var(--surface-input)",
                        border: "1px solid var(--accent-line)",
                        borderRadius: "8px",
                        padding: "8px 12px",
                        color: "var(--text)",
                        width: "100%",
                      }}
                    >
                      <option value="bottom_center">Bottom Center (Default)</option>
                      <option value="top_right">Top Right</option>
                      <option value="top_center">Top Center</option>
                      <option value="bottom_right">Bottom Right</option>
                    </select>
                  </div>

                  <div style={{ borderTop: "1px solid var(--accent-line)", paddingTop: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong>Play Audio Tone on Clip Saved</strong>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                          Play subtle non-intrusive chime upon successful replay write
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={clipSound}
                        onChange={(e) => setClipSound(e.target.checked)}
                        style={{ width: "18px", height: "18px", accentColor: "var(--accent)" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: Appearance & Theme */}
              {activeTab === "theme" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div>
                    <h3 style={{ fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>
                      Desktop & Website Color Theme
                    </h3>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
                      Selecting a theme updates the desktop application, the entire website, and your browser tab icon in real time.
                    </p>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    {themes.map((t) => {
                      const isSelected = theme === t.id;
                      return (
                        <div
                          key={t.id}
                          onClick={() => onThemeChange?.(t.id)}
                          style={{
                            background: t.bg,
                            border: `2px solid ${isSelected ? t.color : "var(--accent-line)"}`,
                            borderRadius: "12px",
                            padding: "16px",
                            cursor: "pointer",
                            transition: "all 180ms ease",
                            boxShadow: isSelected ? `0 0 20px ${t.color}33` : "none",
                            position: "relative",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                            <strong style={{ color: t.color, fontSize: "15px" }}>{t.title}</strong>
                            <span
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: t.color,
                                boxShadow: `0 0 8px ${t.color}`,
                              }}
                            />
                          </div>
                          <p style={{ fontSize: "11px", color: "#ececf1", opacity: 0.8, margin: 0, lineHeight: 1.4 }}>
                            {t.subtitle}
                          </p>
                          {isSelected && (
                            <span
                              style={{
                                position: "absolute",
                                bottom: "10px",
                                right: "12px",
                                fontSize: "10px",
                                fontWeight: "bold",
                                color: t.color,
                                textTransform: "uppercase",
                              }}
                            >
                              ✓ Active Theme
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div
            style={{
              padding: "14px 22px",
              borderTop: "1px solid var(--accent-line)",
              background: "var(--surface-raised)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <button
              type="button"
              className="button button-quiet compact-button"
              onClick={() => {
                setHotkey("Ctrl+Shift+F10");
                setBufferDuration(60);
                setFrameRate(60);
                setVideoBitrate(45);
              }}
            >
              Reset to Defaults
            </button>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                className="button button-primary compact-button"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
