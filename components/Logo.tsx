
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-8", showText = false }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-auto drop-shadow-md dark:drop-shadow-lg">
        {/* Shield Background - Faceted Style */}
        <path d="M100 20L40 45V90C40 135 75 165 100 175C125 165 160 135 160 90V45L100 20Z" fill="url(#shield_grad_main)" />
        <path d="M100 20L100 175C125 165 160 135 160 90V45L100 20Z" fill="url(#shield_grad_right)" />
        <path d="M100 20L40 45L100 90V20Z" fill="white" fillOpacity="0.1" />
        
        {/* Magnifying Glass */}
        <circle cx="105" cy="85" r="45" fill="white" fillOpacity="0.95" />
        <circle cx="105" cy="85" r="38" stroke="#3b82f6" strokeWidth="4" />
        
        {/* Chip/AI Icon Inside Lens */}
        <rect x="95" y="75" width="20" height="20" rx="2" fill="#3b82f6" />
        <path d="M90 80H95M90 85H95M90 90H95M115 80H120M115 85H120M115 90H120M100 70V75M105 70V75M110 70V75M100 95V100M105 95V100M110 95V100" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="105" cy="85" r="3" fill="white" />
        
        {/* Glass Handle */}
        <path d="M135 115L155 135" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" />
        <path d="M135 115L155 135" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 4" />

        <defs>
          <linearGradient id="shield_grad_main" x1="40" y1="20" x2="160" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e3a8a" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="shield_grad_right" x1="100" y1="20" x2="160" y2="175" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1d4ed8" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span className="text-2xl font-bold tracking-tight">
          <span className="text-slate-900 dark:text-white">ContractLens</span>
          <span className="text-blue-600 dark:text-blue-500 ml-1">AI</span>
          <span className="text-[10px] align-top text-slate-400 dark:text-slate-500 font-normal">TM</span>
        </span>
      )}
    </div>
  );
};
