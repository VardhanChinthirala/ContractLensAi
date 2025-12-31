
import React, { useState, useEffect } from 'react';
import { User, backend } from '../services/authService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: { name: string; price: string };
  onSuccess: (user: User) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, plan, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'method' | 'card' | 'success'>('method');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setStep('method');
      setCardNumber('');
      setExpiry('');
      setCvv('');
      setCardHolder('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate complex gateway processing logic
    await new Promise(resolve => setTimeout(resolve, 2400));
    
    const currentUser = backend.getCurrentUser();
    if (currentUser) {
      const updatedUser = await backend.upgradePlan(currentUser.id, plan.name as any);
      onSuccess(updatedUser);
      setStep('success');
    }
    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 transition-colors">
        {step !== 'success' && (
          <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800">
            <div 
              className="h-full bg-blue-600 transition-all duration-500 ease-out" 
              style={{ width: step === 'method' ? '33%' : '66%' }}
            ></div>
          </div>
        )}

        {step === 'method' && (
          <div className="p-8 md:p-12 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Select Payment Method</h2>
                <p className="text-sm text-slate-500">Secure checkout for {plan.name} Plan</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setStep('card')}
                className="w-full p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between group hover:border-blue-500 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-700">
                    <svg className="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 dark:text-white">Credit or Debit Card</div>
                    <div className="text-xs text-slate-500">Visa, Mastercard, Amex, Discover</div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
              </button>

              <button 
                className="w-full p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between group hover:border-blue-500 transition-all opacity-80 hover:opacity-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.96.95-2.06.91-3.08.35-1.09-.59-2.01-.58-3.14 0-1.25.64-2.04.55-2.91-.35C3.76 15.93 4.41 8.87 9.17 8.65c1.1.06 1.88.6 2.61.6.71 0 1.73-.67 2.94-.54 1.12.13 2.06.58 2.71 1.5-2.29 1.36-1.92 4.49.44 5.44-.45 1.15-1.04 2.29-1.82 3.13zM12.03 8.35c-.02-2.31 1.94-4.27 4.22-4.35.25 2.65-2.06 4.54-4.22 4.35z"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 dark:text-white">Apple Pay</div>
                    <div className="text-xs text-slate-500">Fast and secure with Touch ID</div>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest bg-blue-500/10 px-2 py-1 rounded">Fast</span>
              </button>

              <button 
                className="w-full p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-center justify-between group hover:border-blue-500 transition-all opacity-80 hover:opacity-100"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#4285F4"/>
                      <path d="M12 17.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 dark:text-white">Google Pay</div>
                    <div className="text-xs text-slate-500">Pay with your Google account</div>
                  </div>
                </div>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
               <p className="text-xs text-slate-500">
                 Billed as <span className="font-bold text-slate-700 dark:text-slate-300">ContractLens AI™</span> on your bank statement.
               </p>
            </div>
          </div>
        )}

        {step === 'card' && (
          <div className="p-8 md:p-12 space-y-8 relative">
            {isProcessing && (
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 border-4 border-blue-100 dark:border-slate-800 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="text-center">
                  <div className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Securing Transaction</div>
                  <div className="text-slate-500 text-xs mt-1">Connecting to gateway...</div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button onClick={() => setStep('method')} className="flex items-center space-x-2 text-slate-500 hover:text-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                <span className="text-sm font-bold uppercase tracking-wider">Back</span>
              </button>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900 dark:text-white">{plan.name} Plan</div>
                <div className="text-blue-600 dark:text-blue-500 font-black">{plan.price}/mo</div>
              </div>
            </div>

            {/* Interactive Card Visual */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden h-48 flex flex-col justify-between text-white border border-white/10 group">
               <div className="absolute top-0 right-0 p-6">
                  <div className="w-10 h-8 bg-white/20 rounded-md backdrop-blur-sm"></div>
               </div>
               <div className="space-y-4">
                  <div className="text-xl font-mono tracking-[0.2em]">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="text-[8px] uppercase font-bold text-white/40 tracking-widest">Card Holder</div>
                      <div className="text-xs font-bold uppercase tracking-wider">{cardHolder || 'Your Name'}</div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-[8px] uppercase font-bold text-white/40 tracking-widest">Expires</div>
                      <div className="text-xs font-bold uppercase tracking-wider">{expiry || 'MM/YY'}</div>
                    </div>
                  </div>
               </div>
               <div className="absolute bottom-[-20%] right-[-10%] w-48 h-48 bg-blue-600/20 rounded-full blur-3xl group-hover:bg-blue-600/40 transition-all"></div>
            </div>

            <form onSubmit={handlePayment} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Card Number</label>
                <input 
                  type="text" 
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="0000 0000 0000 0000" 
                  maxLength={19}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all font-mono"
                  required
                />
              </div>
              <div className="col-span-2 space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Cardholder Name</label>
                <input 
                  type="text" 
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  placeholder="JOHN DOE" 
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all uppercase"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Expiry</label>
                <input 
                  type="text" 
                  value={expiry}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, '');
                    if (v.length > 2) v = v.substring(0, 2) + '/' + v.substring(2, 4);
                    setExpiry(v);
                  }}
                  placeholder="MM/YY" 
                  maxLength={5}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">CVV</label>
                <input 
                  type="password" 
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                  placeholder="•••" 
                  maxLength={4}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600 transition-all"
                  required
                />
              </div>

              <div className="col-span-2 pt-4">
                 <button 
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/30 active:scale-95 flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>Authorize Payment</span>
                </button>
                <div className="flex items-center justify-center space-x-2 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                  <span>PCI-DSS Compliant • 256-bit AES Encryption</span>
                </div>
              </div>
            </form>
          </div>
        )}

        {step === 'success' && (
          <div className="p-12 text-center space-y-8 animate-in zoom-in duration-500">
            <div className="relative">
               <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-500 mx-auto border-4 border-emerald-500/20">
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
               </div>
               <div className="absolute top-0 right-1/2 translate-x-12 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Payment Successful</h2>
              <p className="text-slate-500">Your account has been upgraded to <span className="text-blue-600 font-bold">{plan.name}</span>.</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Transaction ID</span>
                <span className="text-slate-900 dark:text-white font-mono">{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Date</span>
                <span className="text-slate-900 dark:text-white font-mono">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="h-px bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-bold uppercase tracking-widest">Total Paid</span>
                <span className="text-emerald-600 font-black">{plan.price}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={onClose}
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black transition-all active:scale-95"
              >
                Go to Dashboard
              </button>
              <button className="text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest hover:underline">
                Download Receipt (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
