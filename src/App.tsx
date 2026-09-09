import { useState } from "react";
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
