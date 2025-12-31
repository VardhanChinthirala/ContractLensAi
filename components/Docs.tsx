
import React from 'react';

export const Docs: React.FC = () => {
  const sections = [
    { id: 'intro', title: 'Introduction' },
    { id: 'audit', title: 'How Audit Works' },
    { id: 'scoring', title: 'Health Scoring' },
    { id: 'security', title: 'Security & Privacy' },
    { id: 'api', title: 'Developer API' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 transition-colors">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 space-y-6">
        <div className="space-y-1">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-4 mb-4">Guides</h3>
          {sections.map(s => (
            <a 
              key={s.id} 
              href={`#${s.id}`} 
              className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-all"
            >
              {s.title}
            </a>
          ))}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 max-w-3xl space-y-16">
        <section id="intro" className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Documentation</h1>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Welcome to the ContractLens AI documentation. Our platform uses advanced Gemini 3.0 models to analyze legal documents for freelancers and small businesses. We translate complex legalese into plain English risks.
          </p>
          <div className="bg-blue-600/5 border border-blue-500/10 dark:border-blue-500/20 p-4 rounded-xl">
             <p className="text-sm text-blue-700 dark:text-blue-300">
               <strong>Note:</strong> ContractLens is an AI tool designed for informational purposes only. It is not legal advice.
             </p>
          </div>
        </section>

        <section id="audit" className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">How Audit Works</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            When you paste a contract, our engine performs a three-pass analysis:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-slate-600 dark:text-slate-400">
            <li><span className="text-slate-900 dark:text-white font-medium">Categorization:</span> Identifying key clauses (Payments, IP, etc).</li>
            <li><span className="text-slate-900 dark:text-white font-medium">Risk Mapping:</span> Comparing clauses against predatory industry standards.</li>
            <li><span className="text-slate-900 dark:text-white font-medium">Mitigation:</span> Generating human-readable alternatives and negotiation scripts.</li>
          </ol>
        </section>

        <section id="scoring" className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-4">Health Scoring</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Scores range from 0-100:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="p-4 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 rounded-lg">
                <span className="text-emerald-700 dark:text-emerald-500 font-bold block mb-1">80-100: Safe</span>
                <span className="text-xs text-slate-500">Favorable terms for the provider.</span>
             </div>
             <div className="p-4 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-lg">
                <span className="text-amber-700 dark:text-amber-500 font-bold block mb-1">50-79: Caution</span>
                <span className="text-xs text-slate-500">Standard terms with minor risks.</span>
             </div>
             <div className="p-4 bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-lg">
                <span className="text-rose-700 dark:text-rose-500 font-bold block mb-1">0-49: Danger</span>
                <span className="text-xs text-slate-500">Highly predatory or one-sided terms.</span>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};
