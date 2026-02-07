import React from 'react';
import CosmicScrollyCanvas from './components/CosmicScrollyCanvas';
import CosmicOverlay from './components/CosmicOverlay';
import OrbitScene from './components/OrbitScene';
import RiskDashboard from './components/RiskDashboard';
import WatchlistGrid from './components/WatchlistGrid';

const App = () => {
  return (
    <main className="bg-space-950 min-h-screen text-white selection:bg-cosmic-cyan/30 selection:text-white overflow-x-hidden">

      {/* 1. Hero / Scrollytelling Section */}
      {/* The canvas and overlay work together in a shared relative container */}
      <section className="relative z-10 w-full">
        <CosmicScrollyCanvas />
        <CosmicOverlay />
      </section>

      {/* 2. Interactive 3D Orbit */}
      <section className="relative z-20 w-full h-screen border-b border-t border-white/10 shadow-[0_0_50px_rgba(0,243,255,0.1)]">
        <OrbitScene />
      </section>

      {/* 3. Data Dashboard */}
      <section className="relative z-20 w-full">
        <RiskDashboard />
      </section>

      {/* 4. Watchlist Grid */}
      <section className="relative z-20 w-full pb-20">
        <WatchlistGrid />
      </section>

      {/* Footer */}
      <footer className="relative z-20 w-full py-12 bg-space-950/80 backdrop-blur-md border-t border-white/5 text-center">
        <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-widest">COSMIC WATCH</h2>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
          Near-Earth Object Surveillance System
        </p>
        <div className="mt-8 text-[10px] text-gray-600 font-mono">
          POWERED BY NASA NEO API • HACKATHON BUILD 2026
        </div>
      </footer>

    </main>
  );
};

export default App;
