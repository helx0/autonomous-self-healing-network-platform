import React from 'react';
import Navbar from './components/shared/Navbar';
import Hero from './components/sections/Hero';
import Introduction from './components/sections/Introduction';
import Problem from './components/sections/Problem';
import Motivation from './components/sections/Motivation';
import Objectives from './components/sections/Objectives';
import Literature from './components/sections/Literature';
import Solution from './components/sections/Solution';
import Architecture from './components/sections/Architecture';
import HowItWorks from './components/sections/HowItWorks';
import Technologies from './components/sections/Technologies';
import InteractiveLab from './components/lab/InteractiveLab';
import Results from './components/sections/Results';
import Team from './components/sections/Team';
import Closing from './components/sections/Closing';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <Problem />
        <Motivation />
        <Objectives />
        <Literature />
        <Solution />
        <Architecture />
        <HowItWorks />
        <Technologies />
        <InteractiveLab />
        <Results />
        <Team />
        <Closing />
      </main>
      <footer className="border-t border-slate-800/60 py-8 text-center text-sm text-slate-400">
        © 2026 Autonomous Self-Healing Enterprise Network Framework — University German International – Aden
      </footer>
    </div>
  );
}
