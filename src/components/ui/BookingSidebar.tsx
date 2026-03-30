"use client";

import React, { useState } from 'react';

const BookingSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const nairobiNeighborhoods = [
    'Kilimani', 'Westlands', 'Lavington', 'Karen', 'Kileleshwa', 
    'Parklands', 'Runda', 'Muthaiga', 'South C', 'Pangani', 'Eastleigh', 'Other'
  ];

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending to BBS Mall office
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="sticky top-28 bg-white rounded-[3rem] shadow-2xl p-12 border border-slate-100 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-[#2563eb] rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200">
           <span className="material-symbols-outlined text-5xl">check</span>
        </div>
        <div className="space-y-4">
           <h3 className="text-3xl font-black text-slate-900 tracking-tight">Request Received</h3>
           <p className="text-slate-500 text-base leading-relaxed">
             Our BBS Mall office has received your location and contact details. A management specialist will call you shortly to finalize the dispatch.
           </p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
        >
          Send Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="sticky top-28 bg-white rounded-[3rem] shadow-2xl p-12 border border-slate-100 flex flex-col h-fit animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-start mb-10 pb-10 border-b border-slate-50">
        <div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] block mb-3 font-headline text-slate-500">Service Estimate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-slate-900 tracking-tighter">KSh 12,500</span>
            <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">/Project</span>
          </div>
        </div>
        <div className="w-14 h-14 bg-[#2563eb]/10 rounded-2xl flex items-center justify-center text-[#2563eb] shadow-sm border border-[#2563eb]/20">
           <span className="material-symbols-outlined text-3xl">verified</span>
        </div>
      </div>
      
      <form onSubmit={handleRequest} className="space-y-10">
        
        {/* Identity */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
             <span className="w-6 h-6 rounded-full bg-[#2563eb] text-white text-[10px] font-bold flex items-center justify-center">1</span>
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563eb] italic">Customer Identification</h4>
          </div>
          <div className="space-y-5">
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Full Name</label>
                <div className="relative">
                   <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-12 text-sm font-medium focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" placeholder="Enter full name" />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">person</span>
                </div>
             </div>
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Contact Phone</label>
                <div className="relative">
                   <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-12 text-sm font-medium focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" placeholder="07XX XXX XXX" />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">call</span>
                </div>
             </div>
          </div>
        </div>

        {/* Location Protocol */}
        <div className="space-y-8 pt-10 border-t border-slate-50">
          <div className="flex items-center gap-4">
             <span className="w-6 h-6 rounded-full bg-[#2563eb] text-white text-[10px] font-bold flex items-center justify-center">2</span>
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563eb] italic">Precise Location Details</h4>
          </div>
          <div className="space-y-5">
             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Nairobi Neighborhood</label>
                <div className="relative group">
                   <select required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-12 text-sm font-medium focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none appearance-none cursor-pointer">
                     <option value="" disabled selected>Select Area</option>
                     {nairobiNeighborhoods.map(loc => (
                       <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                     ))}
                   </select>
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">location_on</span>
                   <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Street / Building Name</label>
                <div className="relative group">
                   <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-12 text-sm font-medium focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" placeholder="e.g. Yusuf Haji St / Skyline Tower" />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">map</span>
                </div>
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Floor & Room/Apt No.</label>
                <div className="relative group">
                   <input required className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 px-12 text-sm font-medium focus:ring-4 focus:ring-[#2563eb]/5 focus:border-[#2563eb]/20 transition-all outline-none" placeholder="e.g. 5th Floor, Door 12" />
                   <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">elevator</span>
                </div>
             </div>
          </div>
        </div>
        
        {/* Action */}
        <div className="pt-10 border-t border-slate-100 space-y-4">
           <button 
             type="submit"
             disabled={loading}
             className="w-full bg-[#2563eb] text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/10 hover:bg-[#1e40af] active:scale-95 transition-all outline-none disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-4 group"
           >
             {loading ? (
               <>
                 <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                 Confirming...
               </>
             ) : (
               <>
                 Confirm Dispatch
                 <span className="material-symbols-outlined text-lg group-hover:translate-x-2 transition-transform">arrow_forward</span>
               </>
             )}
           </button>
           <p className="text-center text-slate-400 text-[9px] uppercase font-bold tracking-[0.2em] mt-4">Verified handled by BBS Mall Office</p>
        </div>
      </form>
    </div>
  );
};

export default BookingSidebar;
