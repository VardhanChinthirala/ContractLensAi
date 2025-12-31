
import React from 'react';

export const Careers: React.FC = () => {
  const benefits = [
    { title: "Remote-First", desc: "Work from anywhere. We value deep work over desk time." },
    { title: "Health & Wellness", desc: "Comprehensive medical, dental, and vision for you and your family." },
    { title: "Learning Budget", desc: "$2,500/year for books, conferences, or specialized courses." },
    { title: "Home Office", desc: "$1,500 stipend to build your dream workspace plus a new MacBook Pro." },
    { title: "Generous Equity", desc: "Every employee is an owner with meaningful stock options." },
    { title: "Quarterly Retreats", desc: "Off-sites in beautiful locations to recharge and bond." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-20 space-y-24 animate-in fade-in duration-700 transition-colors">
      <div className="text-center space-y-4">
        <span className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-[0.2em] text-xs">Join our mission</span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">Help us build the <br /><span className="text-blue-600 dark:text-blue-500">future of fair work.</span></h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We are a distributed team of engineers, lawyers, and designers working on the cutting edge of AI and legal tech.
        </p>
      </div>

      <div className="space-y-12 bg-slate-100/50 dark:bg-slate-900/20 p-12 rounded-[3rem] border border-slate-200 dark:border-slate-800/50 transition-colors">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Benefits & Perks</h2>
          <p className="text-slate-600 dark:text-slate-500">We take care of our team so they can focus on our users.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="p-8 bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors shadow-sm">
              <h4 className="text-slate-900 dark:text-white font-bold text-lg">{benefit.title}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-12">
        <div className="max-w-xl mx-auto p-8 border border-dashed border-slate-300 dark:border-slate-800 rounded-[2rem]">
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">General Applications</h3>
           <p className="text-slate-500 mb-6 leading-relaxed text-sm">
             We aren't currently listing specific roles, but we're always looking for talented individuals who are passionate about legal transparency.
           </p>
           <p className="text-slate-500 italic">
             Email us at <a href="mailto:contractlensai@gmail.com" className="text-blue-600 dark:text-blue-500 font-medium hover:underline">contractlensai@gmail.com</a> with your CV and a brief note about how you'd like to contribute.
           </p>
        </div>
      </div>
    </div>
  );
};
