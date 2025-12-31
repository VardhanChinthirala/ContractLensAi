
import React from 'react';
import { Logo } from './Logo';

export const About: React.FC = () => {
  const pillars = [
    {
      title: "Radical Transparency",
      desc: "We believe legalese is a barrier to progress. We use AI to tear down that wall and show you exactly what you're signing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    {
      title: "Security First",
      desc: "Your data is your business. We treat every contract as highly classified, ensuring it never touches a training set or permanent storage.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Empowerment",
      desc: "Knowledge is power. By giving you the tools to negotiate, we're building a more equitable gig economy for everyone.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 space-y-24 animate-in fade-in duration-700 transition-colors">
      <div className="text-center space-y-6">
        <Logo className="h-24 mx-auto mb-8" />
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">Protecting the <span className="text-blue-600 dark:text-blue-500">Next Generation</span> of Workers.</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          ContractLens AI was founded with a single mission: to level the playing field between individual contributors and corporate legal teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Story</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              In the modern economy, contracts are often weaponized. Predators hide behind "Standard Agreements" that strip freelancers of their rights, delay payments indefinitely, or impose impossible liability.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
              Our team of legal tech enthusiasts combined the power of Gemini's advanced reasoning with industry-standard legal frameworks to build an auditor that works for you, not the corporation.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl grid grid-cols-1 sm:grid-cols-3 gap-8 shadow-sm">
            <div className="text-center space-y-1">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-500">10k+</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-widest">Audits</div>
            </div>
            <div className="text-center space-y-1 border-y sm:border-y-0 sm:border-x border-slate-200 dark:border-slate-800 py-4 sm:py-0">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-500">98%</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-widest">Accuracy</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-500">$2M+</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-widest">Saved</div>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-blue-600 dark:text-blue-500 uppercase tracking-[0.2em] mb-4">The Vision</h3>
          <div className="bg-blue-600/5 dark:bg-blue-600/5 border border-blue-500/10 dark:border-blue-500/10 p-10 rounded-[2.5rem] relative overflow-hidden group shadow-sm transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-all"></div>
            <p className="text-slate-800 dark:text-slate-200 text-xl font-medium leading-relaxed italic relative z-10">
              "We envision a world where every agreement is fair, transparent, and mutually beneficial. No more hidden traps. Just clarity and confidence for the independent workforce."
            </p>
            <div className="mt-8 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"></div>
              <div>
                <div className="text-slate-900 dark:text-white font-bold">Vardhan Chinthirala</div>
                <div className="text-slate-500 text-xs">Founder, ContractLens AI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Our Core Pillars</h2>
          <p className="text-slate-500">The values that drive every line of code we write.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="p-8 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/50 rounded-3xl space-y-4 hover:border-blue-500/30 transition-all group shadow-sm">
              <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 dark:text-white">{pillar.title}</h4>
              <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
