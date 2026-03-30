"use client";

import React, { useState, useEffect } from 'react';
import { registerWorker } from '@/app/actions/workers';

export default function RegisterWorkerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await registerWorker(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    }
    setLoading(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-8 py-3.5 rounded-2xl font-headline font-black text-[11px] uppercase tracking-[0.2em] shadow-premium hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
      >
        <span className="material-symbols-outlined text-sm group-hover:rotate-90 transition-transform">person_add</span>
        Onboard Partner
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-8">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
            onClick={() => !loading && setIsOpen(false)}
          />
          
          <div className="bg-white/95 backdrop-blur-2xl rounded-[3rem] shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] border border-white/60 w-full max-w-xl overflow-hidden relative z-10 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className="p-10 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-low/20">
              <div className="space-y-1">
                 <h2 className="text-2xl font-black font-headline text-primary tracking-tight">Partner Enrollment</h2>
                 <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant font-headline opacity-60">StarDash Artisan Network Protocol</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-900 rounded-2xl transition-all active:scale-90">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-10 space-y-10">
              {error && (
                <div className="bg-error/5 text-error px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-error/10 flex items-center gap-4 animate-in shake duration-300">
                  <span className="material-symbols-outlined text-xl">warning</span>
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-secondary/10 text-secondary px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-secondary/20 flex items-center gap-4 animate-in bounce duration-500">
                  <span className="material-symbols-outlined text-2xl">verified</span>
                  Partner Successfully Integrated
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-1 font-headline">Legal First Name</label>
                  <div className="relative group">
                     <input name="first_name" required className="w-full bg-surface-container-low/40 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-4 focus:ring-secondary/10 focus:border-secondary/20 transition-all outline-none font-bold text-sm shadow-inner group-hover:bg-white" placeholder="Jane" />
                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">person</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-1 font-headline">Legal Last Name</label>
                  <div className="relative group">
                     <input name="last_name" required className="w-full bg-surface-container-low/40 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-4 focus:ring-secondary/10 focus:border-secondary/20 transition-all outline-none font-bold text-sm shadow-inner group-hover:bg-white" placeholder="Doe" />
                     <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">person</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-1 font-headline">Official E-Mail</label>
                <div className="relative group">
                   <input type="email" name="email" required className="w-full bg-surface-container-low/40 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-4 focus:ring-secondary/10 focus:border-secondary/20 transition-all outline-none font-bold text-sm shadow-inner group-hover:bg-white" placeholder="partner@stardash.com" />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">mail</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-1 font-headline">Dispatch Phone Number</label>
                <div className="relative group">
                   <input name="phone" required className="w-full bg-surface-container-low/40 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-4 focus:ring-secondary/10 focus:border-secondary/20 transition-all outline-none font-bold text-sm shadow-inner group-hover:bg-white" placeholder="+254 7XX XXX XXX" />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">call</span>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant px-1 font-headline">Initial Access Token</label>
                <div className="relative group">
                   <input type="text" name="password" required className="w-full bg-surface-container-low/40 border border-outline-variant/10 rounded-2xl px-5 py-4 pl-12 focus:ring-4 focus:ring-secondary/10 focus:border-secondary/20 transition-all outline-none font-bold text-sm shadow-inner group-hover:bg-white tracking-widest" placeholder="StarDash2026!" defaultValue="StarDash2026!" />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">vpn_key</span>
                </div>
                <p className="text-[10px] font-bold text-on-surface-variant/40 px-1 italic">Provide this unique signal key to the partner for initial hub activation.</p>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row justify-end gap-6">
                 <button type="button" onClick={() => setIsOpen(false)} className="px-8 py-4 rounded-2xl font-black font-headline text-[11px] uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-colors">Abort Process</button>
                 <button type="submit" disabled={loading} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-headline font-black text-[11px] uppercase tracking-[0.3em] shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3">
                   {loading ? (
                     <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                   ) : (
                     <>
                      Execute Enrollment
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                     </>
                   )}
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
