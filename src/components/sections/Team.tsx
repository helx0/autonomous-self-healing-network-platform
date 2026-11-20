import React from 'react';
import TeamExperience from '../team3d/TeamExperience';

export default function Team() {
  return (
    <section id="team" className="scroll-mt-24 py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Project Team</span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-400">Cinematic 3D Team Introduction — Department of Information Technology, AGIU</p>
        </div>
        <TeamExperience />
      </div>
    </section>
  );
}
