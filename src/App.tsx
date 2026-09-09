import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AppSimulator, type AppTheme } from "./components/AppSimulator";
import { BufferVisualizer } from "./components/BufferVisualizer";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { AudioEngineSection } from "./components/AudioEngineSection";
import { ComparisonTable } from "./components/ComparisonTable";
import { AuthorSection } from "./components/AuthorSection";
import { DownloadModal } from "./components/DownloadModal";
import { Footer } from "./components/Footer";

export function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [theme, setTheme] = useState<AppTheme>("studio");

  // Dynamically update browser tab favicon to match the active theme
  useEffect(() => {
    let link = document.getElementById("app-favicon") as HTMLLinkElement | null;
    if (!link) {
      link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    }
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.id = "app-favicon";
      document.head.appendChild(link);
    }
    const basePath = import.meta.env.BASE_URL || "/";
    const prefix = basePath.endsWith("/") ? basePath : `${basePath}/`;
    link.type = "image/png";
    link.href = `${prefix}icons/icon-${theme}.png`;
  }, [theme]);

  return (
    <div
      className="min-h-screen transition-colors duration-300 relative"
      data-theme={theme}
      style={{
        backgroundColor: "var(--site-bg, #09090c)",
        color: "var(--site-text, #ececf1)",
      }}
    >
      {/* Top Navigation with synchronized theme */}
      <Navbar
        onOpenDownload={() => setDownloadModalOpen(true)}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
          theme={theme}
        />

        {/* Live Interactive App Simulator - Changing theme here updates the whole site! */}
        <AppSimulator
          theme={theme}
          onThemeChange={setTheme}
        />

        {/* Bounded Buffer Architecture */}
        <BufferVisualizer />

        {/* Features Deep Dive */}
        <FeaturesGrid />

        {/* Multi-Track Audio Engine */}
        <AudioEngineSection />

        {/* Comparison Matrix */}
        <ComparisonTable />

        {/* Author Section: Made by Scarlet */}
        <AuthorSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}

export default App;
