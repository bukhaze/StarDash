"use client";

import React, { useState } from 'react';
import { registerWorker } from '@/app/actions/workers';

export default function RegisterWorkerForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-6 py-2.5 rounded-xl font-headline font-bold text-sm shadow-premium hover:opacity-90 active:scale-95 transition-all flex items-center gap-2"
      >
        <span className="material-symbols-outlined text-sm">person_add</span>
        Add New Worker
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-premium border border-outline-variant/10 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-outline-variant/10 flex justify-between items-center bg-surface-container-lowest">
          <h2 className="text-xl font-bold font-headline text-primary">Register New Worker</h2>
          <button onClick={() => setIsOpen(false)} className="material-symbols-outlined text-slate-400 hover:text-slate-700 transition-colors">close</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-surface">
          {error && (
            <div className="bg-error-container text-error px-4 py-3 rounded-xl text-sm font-bold border border-error/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">error</span>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-secondary/10 text-secondary px-4 py-3 rounded-xl text-sm font-bold border border-secondary/20 flex items-center gap-3">
              <span className="material-symbols-outlined text-xl">check_circle</span>
              Worker created successfully!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">First Name</label>
              <input name="first_name" required className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-3 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="Jane" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Last Name</label>
              <input name="last_name" required className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-3 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="Doe" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Worker Email</label>
            <input type="email" name="email" required className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-3 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="janedoe@example.com" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Phone Number</label>
            <input name="phone" required className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-3 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="0712 345 678" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-on-surface-variant px-1 font-headline">Temporary Password</label>
            <input type="text" name="password" required className="w-full bg-surface-container-low border-none rounded-2xl px-5 py-3 text-on-surface focus:ring-2 focus:ring-secondary/30 transition-all outline-none font-body" placeholder="StarDash2026!" defaultValue="StarDash2026!" />
            <p className="text-xs text-on-surface-variant px-1">Give this password to the worker to login.</p>
          </div>

          <div className="pt-4 flex justify-end gap-3">
             <button type="button" onClick={() => setIsOpen(false)} className="px-6 py-2.5 rounded-xl font-bold font-headline text-slate-500 hover:bg-slate-100 transition-colors">Cancel</button>
             <button type="submit" disabled={loading} className="bg-secondary text-white px-6 py-2.5 rounded-xl font-headline font-bold shadow-premium hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
               {loading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
               Register Worker
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
