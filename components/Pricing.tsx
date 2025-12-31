
import React from 'react';
import { User } from '../services/authService';

interface PricingProps {
  onSelectPlan: (plan: { name: string; price: string }) => void;
  currentUser?: User | null;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan, currentUser }) => {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "Perfect for freelancers starting out.",
      features: ["3 Audits per month", "Standard Health Score", "Basic Red Flags", "Email Support"],
      cta: "Current Plan",
      highlight: false
    },
    {
      name: "Pro",
      price: "$19",
      desc: "Advanced auditing for active professionals.",
      features: ["Unlimited Audits", "Deep Category Analysis", "AI Negotiation Scripts", "Priority Scanning", "Multi-file Support"],
      cta: "Upgrade to Pro",
      highlight: true
    },
    {
      name: "Business",
      price: "$49",
      desc: "For small teams and agencies.",
      features: ["Team Shared Workspace", "API Access", "Custom Risk Parameters", "White-label Reports", "Dedicated Account Manager"],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white transition-colors">Simple, Transparent <span className="text-blue-600 dark:text-blue-500">Pricing</span></h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">Protect your business without breaking the bank. Choose the plan that fits your audit volume.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => {
          const isCurrent = currentUser?.plan === tier.name;
          const isFree = tier.price === "$0";
          
          return (
            <div 
              key={tier.name}
              className={`relative p-8 md:p-10 rounded-[2.5rem] border transition-all duration-300 hover:translate-y-[-8px] flex flex-col ${
                tier.highlight 
                  ? 'bg-blue-600/[0.03] dark:bg-blue-600/5 border-blue-500/50 shadow-2xl shadow-blue-500/10' 
                  : 'bg-white dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-6 py-1.5 rounded-full shadow-lg shadow-blue-600/40">
                  Most Popular
                </span>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-5xl font-black text-slate-900 dark:text-white">{tier.price}</span>
                  <span className="text-slate-500 text-sm">/month</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{tier.desc}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className={`mt-1 h-5 w-5 flex-shrink-0 rounded-full flex items-center justify-center ${tier.highlight ? 'bg-blue-500/20 text-blue-600 dark:text-blue-500' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500'}`}>
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => !isCurrent && !isFree && onSelectPlan({ name: tier.name, price: tier.price })}
                disabled={isCurrent}
                className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${
                isCurrent
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-default border border-slate-200 dark:border-slate-700'
                  : tier.highlight 
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 active:scale-95' 
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 active:scale-95 shadow-sm'
              }`}>
                {isCurrent ? 'Active Plan' : tier.cta}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
