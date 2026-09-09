import { useState, useEffect } from "react";
import { SilkLogo } from "./SilkLogo";
import { ClipPlayerModal } from "./ClipPlayerModal";
import { SettingsModal } from "./SettingsModal";
import "../styles/silk-app.css";

export interface MockClip {
  id: string;
  name: string;
  gameName: string | null;
  durationMs: number;
  sizeBytes: number;
  dateStr: string;
  protected: boolean;
  bgGradient: string;
}

const INITIAL_CLIPS: MockClip[] = [
  {
    id: "clip-1",
    name: "Clip_2026-09-08_18-42-10_TheFinals.mp4",
    gameName: "The Finals",
    durationMs: 60000,
    sizeBytes: 136_314_880,
    dateStr: "Sep 8, 2026",
    protected: true,
    bgGradient: "linear-gradient(135deg, #3b1b0b, #19100c, #451a03)",
  },
  {
    id: "clip-2",
    name: "Clip_2026-09-08_17-15-22_Valorant.mp4",
    gameName: "Valorant",
    durationMs: 45200,
    sizeBytes: 99_614_720,
    dateStr: "Sep 8, 2026",
    protected: false,
    bgGradient: "linear-gradient(135deg, #3f0d16, #1a080c, #4c0519)",
  },
  {
    id: "clip-3",
    name: "Clip_2026-09-08_15-02-45_ApexLegends.mp4",
    gameName: "Apex Legends",
    durationMs: 83400,
    sizeBytes: 190_840_832,
    dateStr: "Sep 8, 2026",
    protected: false,
    bgGradient: "linear-gradient(135deg, #1e1b4b, #0f0e21, #312e81)",
  },
  {
    id: "clip-4",
    name: "Clip_2026-09-07_21-10-00_Overwatch2.mp4",
    gameName: "Overwatch 2",
    durationMs: 30000,
    sizeBytes: 67_108_864,
    dateStr: "Sep 7, 2026",
    protected: false,
    bgGradient: "linear-gradient(135deg, #431407, #1c0a06, #7c2d12)",
  },
  {
    id: "clip-5",
    name: "Clip_2026-09-06_19-30-15_Desktop.mp4",
    gameName: null,
    durationMs: 15000,
    sizeBytes: 33_554_432,
    dateStr: "Sep 6, 2026",
    protected: false,
    bgGradient: "linear-gradient(135deg, #181825, #0c0d14, #26273b)",
  },
];

export type AppTheme = "studio" | "classic" | "ember" | "vamp";

export interface AppSimulatorProps {
  theme?: AppTheme;
  onThemeChange?: (theme: AppTheme) => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

function formatBadgeDuration(durationMs: number): string {
  const totalSeconds = durationMs / 1000;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(Math.floor(seconds)).padStart(2, "0");
  const tenths = Math.floor((seconds % 1) * 10);
  return `${mm}:${ss}.${tenths}`;
}

export function AppSimulator({ theme: controlledTheme, onThemeChange }: AppSimulatorProps = {}) {
  const [internalTheme, setInternalTheme] = useState<AppTheme>("studio");
  const theme = controlledTheme ?? internalTheme;

  const handleThemeChange = (t: AppTheme) => {
    setInternalTheme(t);
    onThemeChange?.(t);
  };

  const [clips, setClips] = useState<MockClip[]>(INITIAL_CLIPS);
  const [selectedGame, setSelectedGame] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "duration" | "size">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [bufferSecs, setBufferSecs] = useState(60.0);
  const [isSaving, setIsSaving] = useState(false);
  const [clipFeedback, setClipFeedback] = useState<{
    type: "saving" | "saved";
    title: string;
    detail: string;
    duration: string;
    size: string;
    clip?: MockClip;
  } | null>(null);
  const [activePlayerClip, setActivePlayerClip] = useState<MockClip | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingClipId, setEditingClipId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  // Buffer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setBufferSecs((prev) => {
        const next = prev + 0.1;
        return next > 60.0 ? 59.8 : Number(next.toFixed(1));
      });
    }, 450);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut Ctrl+Shift+F10 or Ctrl+Shift+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "F10" || e.key.toLowerCase() === "s")) {
        e.preventDefault();
        saveReplay();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clips, isSaving]);

  const saveReplay = () => {
    if (isSaving) return;
    setIsSaving(true);

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}-${String(now.getSeconds()).padStart(2, "0")}`;
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    const newName = `Clip_${dateStr}_${timeStr}_Gameplay.mp4`;

    const newClip: MockClip = {
      id: `clip-${Date.now()}`,
      name: newName,
      gameName: selectedGame !== "all" && selectedGame !== "uncategorized" ? selectedGame : "Active Capture",
      durationMs: 60000,
      sizeBytes: 138_412_544,
      dateStr: "Today",
      protected: false,
      bgGradient:
        theme === "ember"
          ? "linear-gradient(135deg, #431407, #1c0a06, #7c2d12)"
          : theme === "vamp"
          ? "linear-gradient(135deg, #4a044e, #1b021f, #701a75)"
          : theme === "classic"
          ? "linear-gradient(135deg, #272718, #13140c, #3a3b22)"
          : "linear-gradient(135deg, #2e1065, #12052b, #4c1d95)",
    };

    setClipFeedback({
      type: "saving",
      title: "Saving Replay...",
      detail: "Muxing video and audio streams into MP4 container",
      duration: "01:00.0",
      size: "138.4 MB",
    });

    setTimeout(() => {
      setClips((prev) => [newClip, ...prev]);
      setIsSaving(false);
      setClipFeedback({
        type: "saved",
        title: "Replay Saved!",
        detail: `Saved to C:\\Users\\Replay\\Videos\\Silk\\${newClip.name}`,
        duration: "01:00.0",
        size: "138.4 MB",
        clip: newClip,
      });
    }, 600);
  };

  const toggleProtected = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClips((prev) =>
      prev.map((c) => (c.id === id ? { ...c, protected: !c.protected } : c))
    );
  };

  const deleteClip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClips((prev) => prev.filter((c) => c.id !== id));
  };

  const startEditing = (clip: MockClip, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingClipId(clip.id);
    setEditingName(clip.name);
  };

  const saveRename = (id: string) => {
    if (editingName.trim()) {
      setClips((prev) =>
        prev.map((c) => (c.id === id ? { ...c, name: editingName.trim() } : c))
      );
    }
    setEditingClipId(null);
  };

  // Filter and sort
  const games = [
    { id: "all", name: "All Games", count: clips.length },
    { id: "The Finals", name: "The Finals", count: clips.filter((c) => c.gameName === "The Finals").length },
    { id: "Valorant", name: "Valorant", count: clips.filter((c) => c.gameName === "Valorant").length },
    { id: "Apex Legends", name: "Apex Legends", count: clips.filter((c) => c.gameName === "Apex Legends").length },
    { id: "Overwatch 2", name: "Overwatch 2", count: clips.filter((c) => c.gameName === "Overwatch 2").length },
    { id: "uncategorized", name: "Uncategorized", count: clips.filter((c) => !c.gameName).length },
  ];

  const filteredClips = clips.filter((clip) => {
    if (selectedGame === "uncategorized") {
      if (clip.gameName) return false;
    } else if (selectedGame !== "all") {
      if (clip.gameName !== selectedGame) return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = clip.name.toLowerCase().includes(q);
      const matchGame = (clip.gameName ?? "").toLowerCase().includes(q);
      return matchName || matchGame;
    }
    return true;
  });

  const sortedClips = [...filteredClips].sort((a, b) => {
    if (sortBy === "duration") return b.durationMs - a.durationMs;
    if (sortBy === "size") return b.sizeBytes - a.sizeBytes;
    if (sortBy === "oldest") return a.id.localeCompare(b.id);
    return b.id.localeCompare(a.id);
  });

  const totalBytes = clips.reduce((acc, c) => acc + c.sizeBytes, 0);

  return (
    <section id="simulator" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-3">
            <span>Official Silk Desktop Interface</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Interactive Desktop Experience
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            This simulator runs the exact CSS, DOM layout, themes, and design system of <strong>Silk Studio</strong>. Test the real capture deck, trigger replay saves (<kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-mono">Ctrl+Shift+F10</kbd>), and browse your local archive.
          </p>
        </div>

        {/* The Exact Silk Studio App Window */}
        <div className="silk-desktop-window" data-theme={theme}>
          {/* Exact Silk TitleBar */}
          <header className="silk-titlebar">
            <div className="titlebar-left">
              <div className="titlebar-brand">
                <span className="titlebar-logo-glyph" aria-hidden="true">
                  <SilkLogo size={15} />
                </span>
                <span className="titlebar-app-title">SILK</span>
              </div>
            </div>

            <div className="titlebar-center">
              <span className="titlebar-target-pill">
                <span className="target-pill-icon">🖥️</span>
                <span className="target-pill-text">Display 1 (2560x1440 @ 60 Hz)</span>
              </span>
            </div>

            <div className="titlebar-controls" aria-label="Window controls">
              <button type="button" className="titlebar-btn titlebar-btn-minimize" title="Minimize">
                <svg width="11" height="1" viewBox="0 0 11 1" fill="none">
                  <rect width="11" height="1" fill="currentColor" />
                </svg>
              </button>
              <button type="button" className="titlebar-btn titlebar-btn-maximize" title="Maximize">
                <svg width="10" height="10" viewBox="0 0 10 1" fill="none">
                  <rect x="0.55" y="0.55" width="8.9" height="8.9" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              </button>
              <button type="button" className="titlebar-btn titlebar-btn-close" title="Close">
                <svg width="10" height="10" viewBox="0 0 10 1" fill="none">
                  <path d="M0.5 0.5L9.5 9.5M9.5 0.5L0.5 9.5" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              </button>
            </div>
          </header>

          {/* Exact App Shell */}
          <main className="app-shell">
            {/* Exact Topbar */}
            <header className="topbar">
              <div className="brand-lockup">
                <span className="brand-mark" aria-hidden="true">
                  <SilkLogo size={22} />
                </span>
                <div>
                  <p className="eyebrow">LOCAL REPLAY STUDIO</p>
                  <h1>Silk</h1>
                </div>
              </div>

              <div className="topbar-meta">
                <button
                  type="button"
                  className="settings-open-btn"
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  title="Open Settings"
                >
                  <span className="settings-gear-icon" aria-hidden="true">⚙</span>
                  <span className="settings-btn-text">Settings</span>
                </button>
              </div>
            </header>

            {/* Exact Hero Status Deck */}
            <section className="hero-status-deck">
              <div className="hero-control-card">
                <div className="hero-control-top">
                  <div className="hero-status-pill-group">
                    <span className="state-badge state-buffering">
                      <span className="state-dot" aria-hidden="true" />
                      {isSaving ? "Saving Replay" : "Buffering Gameplay"}
                    </span>
                    <span className="live-buffer-pill">
                      <span className="live-dot" /> LIVE BUFFER
                    </span>
                  </div>

                  <div className="hero-meta-summary">
                    <span className="meta-stat">
                      <small>Target</small>
                      <strong>Display 1 (2560x1440)</strong>
                    </span>
                    <span className="meta-stat">
                      <small>FPS</small>
                      <strong>60 fps</strong>
                    </span>
                    <span className="meta-stat">
                      <small>Bitrate</small>
                      <strong>45 Mbps</strong>
                    </span>
                    <span className="meta-stat">
                      <small>Audio</small>
                      <strong>2 tracks</strong>
                    </span>
                    <span className="meta-stat">
                      <small>Encoder</small>
                      <strong>AMD Radeon RX 9070 XT (Hardware)</strong>
                    </span>
                    <span className="meta-stat">
                      <small>Buffer</small>
                      <strong>{bufferSecs.toFixed(0)}s / 60s</strong>
                    </span>
                    <span className="meta-stat">
                      <small>Fidelity</small>
                      <strong>Standard</strong>
                    </span>
                    <span className="meta-stat">
                      <small>Saved</small>
                      <strong>{clips.length} clips</strong>
                    </span>
                  </div>
                </div>

                <div className="hero-action-row">
                  <button
                    className="button button-primary hero-save-btn is-live-btn"
                    type="button"
                    onClick={saveReplay}
                    disabled={isSaving}
                  >
                    <span className="save-btn-icon" aria-hidden="true">💾</span>
                    <span className="save-btn-label">{isSaving ? "Saving..." : "Save Replay"}</span>
                    <span className="button-hint">Ctrl+Shift+F10</span>
                  </button>

                  <button className="button button-secondary compact-button" type="button">
                    Start Capture
                  </button>
                  <button className="button button-quiet compact-button" type="button">
                    Stop
                  </button>
                </div>

                {/* Exact Buffer Gauge */}
                <div className="hero-buffer-bar-wrapper">
                  <div className="hero-buffer-header">
                    <span className="hero-buffer-label">Replay Buffer Fill</span>
                    <span className="hero-buffer-time">
                      {bufferSecs.toFixed(1)}s / 60s (100%)
                    </span>
                  </div>
                  <div className="buffer-gauge-track" role="progressbar">
                    <div className="buffer-gauge-fill is-ready" style={{ width: "100%" }} />
                  </div>
                </div>

                {/* Exact Clip Feedback Banner */}
                {clipFeedback && (
                  <div className={`clip-feedback-banner feedback-${clipFeedback.type}`} role="status">
                    <div className="feedback-icon-col">
                      {clipFeedback.type === "saving" ? (
                        <span className="feedback-spinner" aria-hidden="true" />
                      ) : (
                        <span className="feedback-success-badge" aria-hidden="true">✓</span>
                      )}
                    </div>
                    <div className="feedback-body">
                      <div className="feedback-header-line">
                        <strong>{clipFeedback.title}</strong>
                        <span className="feedback-pill">{clipFeedback.duration}</span>
                        <span className="feedback-pill">{clipFeedback.size}</span>
                      </div>
                      <p className="feedback-detail-text">{clipFeedback.detail}</p>
                    </div>
                    <div className="feedback-actions">
                      {clipFeedback.clip && (
                        <button
                          type="button"
                          className="button button-secondary compact-button"
                          onClick={() => setActivePlayerClip(clipFeedback.clip!)}
                        >
                          Open
                        </button>
                      )}
                      <button
                        type="button"
                        className="feedback-dismiss-button"
                        onClick={() => setClipFeedback(null)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Exact Hero Library Section */}
            <section className="panel library-panel hero-library-section">
              <div className="panel-heading library-heading">
                <div className="library-title-block">
                  <div className="library-eyebrow-row">
                    <p className="eyebrow">LOCAL ARCHIVE</p>
                    <span className="library-count-pill">{clips.length} Clips</span>
                  </div>
                  <h2>Clip Library</h2>
                  <p className="panel-subtitle">
                    Instant replays saved locally to disk in full native resolution.
                  </p>
                </div>

                <div className="library-toolbar">
                  {/* Search */}
                  <div className="library-search-box">
                    <span className="search-icon" aria-hidden="true">🔍</span>
                    <input
                      type="text"
                      placeholder="Search clips..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="library-search-input"
                    />
                    {searchQuery && (
                      <button type="button" className="search-clear-btn" onClick={() => setSearchQuery("")}>
                        ×
                      </button>
                    )}
                  </div>

                  {/* Sort */}
                  <div className="library-sort-box">
                    <label className="library-sort-label">Sort:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="library-select"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="duration">Longest Duration</option>
                      <option value="size">Largest File Size</option>
                    </select>
                  </div>

                  {/* View Mode Toggle */}
                  <div className="view-mode-toggle">
                    <button
                      type="button"
                      className={`view-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                      onClick={() => setViewMode("grid")}
                    >
                      <span className="view-icon">⊞</span> Grid
                    </button>
                    <button
                      type="button"
                      className={`view-toggle-btn ${viewMode === "list" ? "active" : ""}`}
                      onClick={() => setViewMode("list")}
                    >
                      <span className="view-icon">☰</span> List
                    </button>
                  </div>

                  {/* Refresh */}
                  <button className="button button-secondary compact-button refresh-library-btn" type="button">
                    ↻ Refresh
                  </button>
                </div>
              </div>

              {/* Exact Game Filter Chips */}
              <div className="library-chips-bar" role="tablist">
                {games.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`game-chip ${selectedGame === g.id ? "active" : ""}`}
                    onClick={() => setSelectedGame(g.id)}
                  >
                    <span className="chip-label">{g.name}</span>
                    <span className="chip-count">{g.count}</span>
                  </button>
                ))}
              </div>

              {/* Exact Storage Summary */}
              <div className="storage-summary">
                <span>
                  <small>Output Folder</small>
                  <strong>C:\Users\Replay\Videos\Silk</strong>
                </span>
                <span>
                  <small>Storage Used</small>
                  <strong>{formatBytes(totalBytes)} / No quota</strong>
                </span>
                <span>
                  <small>Auto Deletion</small>
                  <strong className="text-accent">Off</strong>
                </span>
              </div>

              {/* Grid / List of clips */}
              {viewMode === "grid" ? (
                <div className="clip-grid">
                  {sortedClips.map((clip) => (
                    <article key={clip.id} className="clip-card">
                      <div
                        className="clip-card-thumb-container"
                        onClick={() => setActivePlayerClip(clip)}
                      >
                        <div
                          className="clip-thumb-wrapper clip-thumb-fallback is-clickable"
                          style={{ background: clip.bgGradient }}
                        >
                          <span className="clip-thumb-icon" aria-hidden="true">▶</span>
                          {clip.gameName && (
                            <span className="clip-thumb-game-badge">{clip.gameName}</span>
                          )}
                          {clip.protected && (
                            <span className="clip-thumb-protected-badge" title="Protected clip">
                              🛡
                            </span>
                          )}
                          <span className="clip-thumb-duration-badge">
                            {formatBadgeDuration(clip.durationMs)}
                          </span>
                          <div className="clip-thumb-play-overlay">
                            <div className="play-circle-icon">
                              <span className="play-triangle">▶</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="clip-card-body">
                        <div className="clip-card-header">
                          {editingClipId === clip.id ? (
                            <form
                              className="clip-inline-rename-form"
                              onSubmit={(e) => {
                                e.preventDefault();
                                saveRename(clip.id);
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="text"
                                className="clip-inline-rename-input"
                                value={editingName}
                                autoFocus
                                onChange={(e) => setEditingName(e.target.value)}
                                onBlur={() => saveRename(clip.id)}
                              />
                            </form>
                          ) : (
                            <div className="clip-title-group">
                              <h3
                                className="clip-card-title"
                                onDoubleClick={(e) => startEditing(clip, e)}
                                title="Double-click to rename"
                              >
                                {clip.name}
                              </h3>
                              <button
                                type="button"
                                className="clip-rename-pencil-btn"
                                onClick={(e) => startEditing(clip, e)}
                                title="Rename clip"
                              >
                                ✎
                              </button>
                            </div>
                          )}

                          <div className="clip-card-btn-group" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              className={`clip-favorite-btn ${clip.protected ? "is-active" : ""}`}
                              onClick={(e) => toggleProtected(clip.id, e)}
                              title={clip.protected ? "Protected clip" : "Protect from auto-delete"}
                            >
                              <span className="favorite-star-icon">
                                {clip.protected ? "★" : "☆"}
                              </span>
                            </button>
                            <button
                              type="button"
                              className="clip-delete-btn"
                              onClick={(e) => deleteClip(clip.id, e)}
                              title="Delete clip"
                            >
                              <span className="delete-trash-icon">🗑</span>
                            </button>
                          </div>
                        </div>

                        <div className="clip-card-meta">
                          <span className="clip-card-date">{clip.dateStr}</span>
                          <span className="meta-separator">•</span>
                          <span className="clip-card-duration">{formatBadgeDuration(clip.durationMs)}</span>
                          <span className="meta-separator">•</span>
                          <span className="clip-card-size">{formatBytes(clip.sizeBytes)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="clip-list">
                  {sortedClips.map((clip) => (
                    <article key={clip.id} className="clip-row">
                      <div
                        className="clip-row-thumb"
                        style={{ width: "100px", height: "56px", background: clip.bgGradient, position: "relative", borderRadius: "6px", cursor: "pointer" }}
                        onClick={() => setActivePlayerClip(clip)}
                      >
                        <span style={{ position: "absolute", bottom: "3px", right: "5px", fontSize: "10px", fontFamily: "monospace", color: "#fff", background: "rgba(0,0,0,0.7)", padding: "1px 4px", borderRadius: "3px" }}>
                          {formatBadgeDuration(clip.durationMs)}
                        </span>
                      </div>

                      <div className="clip-row-body" style={{ flex: 1, paddingLeft: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <h3 style={{ fontSize: "13px", fontWeight: "600", margin: 0, color: "var(--text)" }}>
                            {clip.name}
                          </h3>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button
                              type="button"
                              className={`clip-favorite-btn ${clip.protected ? "is-active" : ""}`}
                              onClick={(e) => toggleProtected(clip.id, e)}
                            >
                              {clip.protected ? "★" : "☆"}
                            </button>
                            <button
                              type="button"
                              className="clip-delete-btn"
                              onClick={(e) => deleteClip(clip.id, e)}
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>
                          <span>{clip.gameName ?? "Desktop"}</span> • <span>{clip.dateStr}</span> • <span>{formatBytes(clip.sizeBytes)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </main>
        </div>

        {/* Exact Silk Settings Dialog Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          theme={theme}
          onThemeChange={handleThemeChange}
        />

        {/* Exact Silk Replay Video Player Modal */}
        {activePlayerClip && (
          <ClipPlayerModal
            clip={activePlayerClip}
            onClose={() => setActivePlayerClip(null)}
            theme={theme}
          />
        )}
      </div>
    </section>
  );
}
