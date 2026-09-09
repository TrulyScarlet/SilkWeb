import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AppSimulator } from "./components/AppSimulator";
import { BufferVisualizer } from "./components/BufferVisualizer";
import { FeaturesGrid } from "./components/FeaturesGrid";
import { AudioEngineSection } from "./components/AudioEngineSection";
import { ComparisonTable } from "./components/ComparisonTable";
import { AuthorSection } from "./components/AuthorSection";
import { DownloadModal } from "./components/DownloadModal";
import { Footer } from "./components/Footer";

export function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#09090c] text-white selection:bg-purple-500/30 selection:text-purple-200">
      {/* Top Navigation */}
      <Navbar onOpenDownload={() => setDownloadModalOpen(true)} />

      <main>
        {/* Hero Section */}
        <Hero onOpenDownloadModal={() => setDownloadModalOpen(true)} />

        {/* Live Interactive App Simulator */}
        <AppSimulator />

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
