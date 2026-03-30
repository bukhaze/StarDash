"use client";

import React, { useState } from 'react';
import { submitBooking } from '@/app/actions/booking';

export default function CreateBookingForm({ services }: { services: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const result = await submitBooking(formData);
    if (result.error) {
       setError(result.error);
    } else {
       setIsOpen(false);
       // We could revalidate but the action already does it
       window.location.reload(); 
    }
    setLoading(false);
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-bold font-headline text-sm shadow-premium hover:shadow-xl transition-all scale-95 active:scale-90 flex items-center gap-2 hover:bg-blue-700"
      >
        <span className="material-symbols-outlined text-lg">add_task</span>
        Register Intake
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-premium overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-slate-50 px-12 py-10 border-b border-slate-100 flex justify-between items-center">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 italic">Concierge Intake</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">Manual Service Registration Terminal</p>
                 </div>
                 <button onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-600 transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>

              <form onSubmit={handleSubmit} className="p-12 space-y-10 max-h-[70vh] overflow-y-auto font-body">
                 {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl text-xs font-bold flex items-center gap-3">
                       <span className="material-symbols-outlined text-lg">error</span>
                       {error}
                    </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Customer Info */}
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 italic">Target Payload (Customer)</h4>
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                             <input name="guest_name" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300" placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Contact Phone</label>
                             <input name="guest_phone" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300" placeholder="+254..." />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Connection</label>
                             <input name="guest_email" type="email" className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300" placeholder="user@provider.com" />
                          </div>
                       </div>
                    </div>

                    {/* Service Info */}
                    <div className="space-y-6">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 italic">Service Parameters</h4>
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Operational Module</label>
                             <select name="service_id" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                                <option value="">Select Service...</option>
                                {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                             </select>
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Neighborhood Unit</label>
                             <input name="neighborhood" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300" placeholder="e.g. Kilimani" />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Street / Block</label>
                             <input name="street" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300" placeholder="e.g. Ngong Road" />
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-50">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Deployment Date</label>
                       <input name="date" type="date" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Dispatch Time</label>
                       <input name="time" type="time" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Audit Fee (KSh)</label>
                       <input name="total_amount" type="number" required className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-sm font-black focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-300" placeholder="0" />
                    </div>
                 </div>

                 <div className="flex gap-4 pt-10">
                    <button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3">
                       {loading ? <span className="material-symbols-outlined animate-spin">progress_activity</span> : <>Inject Operations Dispatch <span className="material-symbols-outlined text-base">send</span></>}
                    </button>
                    <button type="button" onClick={() => setIsOpen(false)} className="px-10 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-100 transition-all">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </>
  );
}
