
import React, { useEffect, useState } from 'react';
import { backend, User } from '../services/authService';
import { AuditRecord } from '../types';

interface ProfileProps {
  user: User | null;
  onUpgrade: () => void;
  onViewAudit: (audit: AuditRecord) => void;
  onOpenSettings: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpgrade, onViewAudit, onOpenSettings }) => {
  const [history, setHistory] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'audits' | 'team'>('audits');

  useEffect(() => {
    if (user) {
      backend.getUserAudits(user.id).then(data => {
        setHistory(data);
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) return null;

  const joinDate = user.joinedAt ? new Date(user.joinedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    day: 'numeric'
  }) : 'N/A';

  const mockTeamMembers = [
    { name: 'Sarah Miller', role: 'Compliance Lead', avatar: 'SM' },
    { name: 'David Chen', role: 'Legal Counsel', avatar: 'DC' },
    { name: 'Alex Rivera', role: 'Operations', avatar: 'AR' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-500 transition-colors">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-blue-600/20 overflow-hidden border-4 border-white dark:border-slate-800">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span className="uppercase">{user.name?.[0] || user.email[0]}</span>
          )}
        </div>
        
        <div className="flex-grow text-center md:text-left space-y-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white capitalize mb-1">{user.name || 'Anonymous User'}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{user.email}</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Account ID</span>
              <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{user.id}</span>
            </div>
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col">
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Member Since</span>
              <span className="text-sm text-slate-700 dark:text-slate-300">{joinDate}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onOpenSettings}
          className="px-6 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-700 h-fit shadow-sm"
        >
          Account Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar: Plan & Stats */}
        <div className="lg:col-span-1 space-y-8">
          <div className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Plan</h3>
              <span className={`px-3 py-1 border text-[10px] font-bold rounded-full uppercase tracking-widest ${
                user.plan === 'Business' ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400' : 
                user.plan === 'Pro' ? 'bg-blue-600/10 border-blue-500/20 text-blue-600 dark:text-blue-400' :
                'bg-slate-600/10 border-slate-500/20 text-slate-600 dark:text-slate-400'
              }`}>
                {user.plan || 'Starter'}
              </span>
            </div>
            
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                Audits used: <strong>{user.auditCount}</strong>. 
                {user.plan === 'Starter' && ` You have ${Math.max(0, 3 - user.auditCount)} remaining this month.`}
                {user.plan !== 'Starter' && ` You have unlimited monthly audits.`}
              </p>
              
              {user.plan === 'Starter' && (
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full transition-all duration-1000" 
                    style={{ width: `${Math.min(100, (user.auditCount / 3) * 100)}%` }}
                  ></div>
                </div>
              )}
            </div>

            {user.plan !== 'Business' && (
              <button 
                onClick={onUpgrade}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20"
              >
                Upgrade Plan
              </button>
            )}
          </div>

          <nav className="flex flex-col space-y-2">
            <button 
              onClick={() => setActiveTab('audits')}
              className={`flex items-center space-x-3 px-5 py-3 rounded-xl font-semibold transition-all ${
                activeTab === 'audits' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <span>Audit History</span>
            </button>
            {user.plan === 'Business' && (
              <button 
                onClick={() => setActiveTab('team')}
                className={`flex items-center space-x-3 px-5 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'team' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                <span>Team Workspace</span>
              </button>
            )}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === 'audits' ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Records</h3>
                <span className="text-xs text-slate-500 font-medium">{history.length} records found</span>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-20 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl animate-pulse"></div>
                    ))}
                  </div>
                ) : history.length === 0 ? (
                  <div className="p-12 text-center bg-white dark:bg-slate-900/30 border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl">
                    <p className="text-slate-500 mb-4">No audits performed yet.</p>
                  </div>
                ) : (
                  history.map((audit) => (
                    <div 
                      key={audit.id}
                      onClick={() => onViewAudit(audit)}
                      className="group flex items-center justify-between p-5 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-blue-500/50 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer shadow-sm"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border ${
                          audit.healthScore >= 80 ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-500' :
                          audit.healthScore >= 50 ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-500' :
                          'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-500'
                        }`}>
                          {audit.healthScore}
                        </div>
                        <div>
                          <h4 className="text-slate-900 dark:text-white font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {audit.contractTitle || 'Untitled Contract'}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {new Date(audit.timestamp).toLocaleDateString()} • {audit.redFlags.length} flags found
                          </p>
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 dark:text-slate-600 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Team Workspace</h3>
                  <p className="text-sm text-slate-500">Manage your shared legal audits and team members.</p>
                </div>
                <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                  Invite Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
                   <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400">Team Members</h4>
                   <div className="space-y-4">
                      {mockTeamMembers.map(m => (
                        <div key={m.name} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                             <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-200 dark:border-indigo-500/30">
                                {m.avatar}
                             </div>
                             <div>
                                <div className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</div>
                                <div className="text-[10px] text-slate-500">{m.role}</div>
                             </div>
                          </div>
                          <button className="text-slate-400 hover:text-rose-500 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] space-y-6 shadow-2xl shadow-indigo-600/20 relative overflow-hidden">
                   <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                   <h4 className="text-sm font-bold uppercase tracking-widest text-white/60">Shared Intelligence</h4>
                   <div className="space-y-4 relative z-10">
                      <div className="text-4xl font-black">24</div>
                      <div className="text-sm text-white/80 leading-relaxed">Audits shared across your team this month. Your centralized legal repository is active.</div>
                      <div className="pt-4">
                         <button className="w-full py-3 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">View Shared Folder</button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
