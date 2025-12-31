
import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-12 animate-in fade-in duration-700 transition-colors">
      <div className="space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">Effective Date: October 2023 • Version 2.1</p>
      </div>

      <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl space-y-12 shadow-sm transition-colors">
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-sm">1</span>
            <span>Data Minimization Commitment</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-11">
            At ContractLens AI, we believe your legal documents are among your most sensitive assets. Our primary privacy principle is data minimization: we only process what is strictly necessary to deliver your audit. We do not engage in surveillance capitalism or cross-site tracking.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-sm">2</span>
            <span>How We Process Contracts</span>
          </h2>
          <div className="pl-11 space-y-4">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              When you submit a contract for auditing:
            </p>
            <ul className="list-disc list-inside text-slate-600 dark:text-slate-400 space-y-3">
              <li className="pl-2">The text is transmitted securely via AES-256 encryption to our inference layer.</li>
              <li className="pl-2">Analysis is performed using ephemeral compute instances that are purged after the request.</li>
              <li className="pl-2">We have strict "No-Training" agreements with our AI providers. Your documents are NEVER used to train large language models.</li>
              <li className="pl-2">Unless you save a report to your profile, the text data is automatically deleted from our server memory after 15 minutes.</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-sm">3</span>
            <span>Information We Collect</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-11">
            We collect basic account information (email address, billing info) required for service delivery. We utilize standard telemetry (IP address, browser type) to detect fraudulent access and maintain platform security. We never sell, rent, or trade your personal information.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-sm">4</span>
            <span>Security Measures</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-11">
            We employ industry-leading security practices, including regular penetration testing, end-to-end encryption for data in transit, and database encryption for data at rest. Our infrastructure is hosted on SOC-2 Type II compliant data centers.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-sm">5</span>
            <span>Global Compliance (GDPR & CCPA)</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed pl-11">
            Regardless of where you live, you have the right to access, rectify, or delete your personal data. Users in the EEA and California have specific legal protections which we honor globally. You can export or delete your entire data history from your Profile settings at any time.
          </p>
        </section>

        <div className="bg-slate-50 dark:bg-slate-950 p-10 rounded-[2rem] border border-slate-200 dark:border-slate-800 mt-12 text-center space-y-4 transition-colors">
           <p className="text-slate-800 dark:text-slate-300 font-medium">
             Questions about our privacy practices? 
           </p>
           <p className="text-slate-500 text-sm">
             Our dedicated Data Protection Officer is ready to assist you.
           </p>
           <a href="mailto:privacy@contractlens.ai" className="inline-block px-8 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-all border border-slate-200 dark:border-slate-700 shadow-sm">
             Contact Privacy Team
           </a>
        </div>
      </div>
      <p className="text-center text-slate-400 dark:text-slate-600 text-[10px] uppercase tracking-widest font-bold pb-12">
        ContractLens AI — Built on Trust and Ethics.
      </p>
    </div>
  );
};
