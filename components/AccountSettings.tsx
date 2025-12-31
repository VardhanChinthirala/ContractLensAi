
import React, { useState } from 'react';
import { User, backend } from '../services/authService';

interface AccountSettingsProps {
  user: User | null;
  onUpdateUser: (user: User) => void;
  onDeleteAccount: () => void;
  onUpgrade: () => void;
}

type SettingsTab = 'general' | 'security' | 'billing' | 'danger';

export const AccountSettings: React.FC<AccountSettingsProps> = ({ user, onUpdateUser, onDeleteAccount, onUpgrade }) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  if (!user) return null;

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setMessage(null);
    try {
      const updatedUser = await backend.updateUserProfile(user.id, { name, email });
      onUpdateUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelPlan = async () => {
    if (confirm("Are you sure you want to cancel your premium subscription? You will lose access to Pro features at the end of your billing cycle.")) {
      setIsUpdating(true);
      const updatedUser = await backend.upgradePlan(user.id, 'Starter');
      onUpdateUser(updatedUser);
      setIsUpdating(false);
      setMessage({ type: 'success', text: 'Subscription canceled. Your plan is now Starter.' });
    }
  };

  const handleDelete = async () => {
    if (confirm("DANGER: This will permanently delete your account and all audit history. This action cannot be undone. Proceed?")) {
      await backend.deleteUser(user.id);
      onDeleteAccount();
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'security', label: 'Security', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: 'billing', label: 'Billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
    { id: 'danger', label: 'Danger Zone', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Account <span className="text-blue-600">Settings</span></h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your profile, security, and subscription.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              } ${tab.id === 'danger' && activeTab !== 'danger' ? 'hover:text-rose-500' : ''}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
              </svg>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-10 shadow-sm min-h-[500px]">
            {message && (
              <div className={`mb-8 p-4 rounded-2xl border flex items-center space-x-3 animate-in slide-in-from-top-2 ${
                message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-600'
              }`}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {message.type === 'success' 
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  }
                </svg>
                <span className="text-sm font-bold">{message.text}</span>
              </div>
            )}

            {activeTab === 'general' && (
              <form onSubmit={handleUpdateProfile} className="space-y-8 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Display Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3.5 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isUpdating}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  >
                    {isUpdating ? 'Saving Changes...' : 'Save Profile Changes'}
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Password Management</h3>
                  <p className="text-sm text-slate-500">Update your account password. For security, we recommend a mix of symbols, numbers, and cases.</p>
                  <div className="space-y-4 max-w-md mt-6">
                    <input type="password" placeholder="Current Password" disabled className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3.5 opacity-50 cursor-not-allowed" />
                    <input type="password" placeholder="New Password" disabled className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3.5 opacity-50 cursor-not-allowed" />
                    <button disabled className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold rounded-xl cursor-not-allowed border border-slate-200 dark:border-slate-700">Update Password (Disabled for Demo)</button>
                  </div>
                </div>
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-500">Add an extra layer of security to your account.</p>
                  <button className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl shadow-lg">Setup 2FA</button>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="p-6 bg-blue-600/[0.03] dark:bg-blue-600/5 border border-blue-500/20 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="space-y-1 text-center md:text-left">
                      <div className="text-xs font-black uppercase tracking-widest text-blue-600">Current Plan</div>
                      <div className="text-3xl font-black text-slate-900 dark:text-white">{user.plan}</div>
                      <p className="text-xs text-slate-500">Billed monthly. Renews on {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}.</p>
                   </div>
                   <div className="flex space-x-3">
                      {user.plan !== 'Starter' ? (
                        <button 
                          onClick={handleCancelPlan}
                          className="px-6 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-rose-500 hover:border-rose-500 rounded-xl font-bold transition-all"
                        >
                          Cancel Subscription
                        </button>
                      ) : (
                        <button 
                          onClick={onUpgrade}
                          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg"
                        >
                          Upgrade Now
                        </button>
                      )}
                   </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Payment History</h3>
                  <div className="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-2xl">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                          <th className="px-4 py-3 font-bold text-slate-500">Date</th>
                          <th className="px-4 py-3 font-bold text-slate-500">Plan</th>
                          <th className="px-4 py-3 font-bold text-slate-500">Amount</th>
                          <th className="px-4 py-3 font-bold text-slate-500">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                        <tr>
                          <td className="px-4 py-4 text-slate-600 dark:text-slate-400 font-mono">{new Date().toLocaleDateString()}</td>
                          <td className="px-4 py-4 text-slate-900 dark:text-white font-bold">{user.plan}</td>
                          <td className="px-4 py-4 text-slate-900 dark:text-white font-bold">{user.plan === 'Pro' ? '$19.00' : user.plan === 'Business' ? '$49.00' : '$0.00'}</td>
                          <td className="px-4 py-4"><span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-black rounded uppercase">Paid</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'danger' && (
              <div className="space-y-10 animate-in fade-in duration-300">
                <div className="p-8 bg-rose-500/5 border border-rose-500/20 rounded-[2.5rem] space-y-6">
                  <div className="flex items-center space-x-3 text-rose-600">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="text-2xl font-black uppercase tracking-tight">Delete Account</h3>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Deleting your account is permanent. This will erase your profile information, saved contracts, and audit history. We will not be able to recover this data once deleted.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={handleDelete}
                      className="px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-rose-600/20 active:scale-95"
                    >
                      Permanently Delete Account
                    </button>
                  </div>
                </div>

                <div className="space-y-4 opacity-50">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Data Portability</h3>
                  <p className="text-sm text-slate-500">Request a complete export of your account data in JSON format.</p>
                  <button disabled className="px-6 py-2 bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold rounded-xl border border-slate-200 dark:border-slate-700 cursor-not-allowed">Export Data</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
