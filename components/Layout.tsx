
import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeView: 'landing' | 'auditor' | 'pricing' | 'docs' | 'profile' | 'about' | 'careers' | 'privacy' | 'settings';
  onNavigate: (view: 'landing' | 'auditor' | 'pricing' | 'docs' | 'profile' | 'about' | 'careers' | 'privacy' | 'settings') => void;
  onLoginClick: () => void;
  onLogout: () => void;
  isLoggedIn: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user?: any;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeView, 
  onNavigate, 
  onLoginClick, 
  onLogout, 
  isLoggedIn, 
  theme, 
  onToggleTheme, 
  user 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (view: any) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'User';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617] transition-colors duration-300">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={() => handleNavigate(isLoggedIn ? 'auditor' : 'landing')}
            className="flex items-center hover:opacity-90 transition-opacity"
          >
            <Logo className="h-10" showText={true} />
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {isLoggedIn && (
              <button 
                onClick={() => handleNavigate('auditor')}
                className={`${activeView === 'auditor' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'} transition-colors`}
              >
                Dashboard
              </button>
            )}
            <button 
              onClick={() => handleNavigate('pricing')}
              className={`${activeView === 'pricing' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'} transition-colors`}
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigate('docs')}
              className={`${activeView === 'docs' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white'} transition-colors`}
            >
              Docs
            </button>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              {theme === 'dark' ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.95 16.95l.707.707M7.05 7.05l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>
            
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 pl-3 pr-1 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all shadow-sm"
                >
                  <span className="text-slate-700 dark:text-slate-200 font-bold ml-1">{firstName}</span>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border border-white dark:border-slate-800 overflow-hidden shadow-sm">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white text-xs font-black">{firstName[0]}</span>
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => handleNavigate('profile')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      <span>Your Profile</span>
                    </button>
                    <button 
                      onClick={() => handleNavigate('settings')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 transition-colors flex items-center space-x-3"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span>Settings</span>
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-rose-600 dark:text-rose-500 hover:bg-rose-500/5 transition-colors flex items-center space-x-3 font-bold"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onLoginClick}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 active:scale-[0.97]"
              >
                Sign In
              </button>
            )}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 dark:text-slate-400 p-2"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-4">
             {isLoggedIn && (
               <button onClick={() => handleNavigate('auditor')} className="block w-full text-left py-2 font-bold text-slate-900 dark:text-white">Dashboard</button>
             )}
             <button onClick={() => handleNavigate('pricing')} className="block w-full text-left py-2 font-bold text-slate-900 dark:text-white">Pricing</button>
             <button onClick={() => handleNavigate('docs')} className="block w-full text-left py-2 font-bold text-slate-900 dark:text-white">Docs</button>
             <div className="h-px bg-slate-100 dark:bg-slate-800"></div>
             {isLoggedIn ? (
               <>
                 <button onClick={() => handleNavigate('profile')} className="block w-full text-left py-2 font-bold text-slate-900 dark:text-white">Your Profile</button>
                 <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 font-bold text-rose-500">Sign Out</button>
               </>
             ) : (
               <button onClick={onLoginClick} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl">Sign In</button>
             )}
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="space-y-6">
             <Logo className="h-8 mx-auto md:mx-0" showText={true} />
             <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
               Ensuring clarity and safety in every legal agreement. Powered by advanced Gemini AI models.
             </p>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">Product</h4>
            <ul className="text-sm text-slate-500 space-y-3">
              <li><button onClick={() => handleNavigate('auditor')} className="hover:text-blue-600 transition-colors">Legal Auditor</button></li>
              <li><button onClick={() => handleNavigate('pricing')} className="hover:text-blue-600 transition-colors">Pricing</button></li>
              <li><button onClick={() => handleNavigate('docs')} className="hover:text-blue-600 transition-colors">Documentation</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">Support</h4>
            <ul className="text-sm text-slate-500 space-y-3">
              <li><button onClick={() => handleNavigate('about')} className="hover:text-blue-600 transition-colors">About Us</button></li>
              <li><a href="mailto:contractlensai@gmail.com" className="hover:text-blue-600 transition-colors">Contact Support</a></li>
              <li><button onClick={() => handleNavigate('privacy')} className="hover:text-blue-600 transition-colors">Privacy Policy</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 dark:text-white font-semibold mb-5 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4">
               <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-blue-600 transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
               <a href="#" className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:text-blue-600 transition-all"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg></a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 dark:border-slate-900 text-center text-slate-500 text-[11px]">
          <p>&copy; {new Date().getFullYear()} ContractLens AI™. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};
