"use client";

import React, { useState } from 'react';
import { assignWorkerToBooking } from '@/app/actions/workers';

interface Worker {
  id: string;
  full_name: string;
}

export default function AssignWorkerSelect({ 
  bookingId, 
  currentWorkerId, 
  workers 
}: { 
  bookingId: string; 
  currentWorkerId: string | null; 
  workers: Worker[] 
}) {
  const [loading, setLoading] = useState(false);
  const [notifying, setNotifying] = useState<'sms' | 'email' | null>(null);

  async function handleAssign(workerId: string) {
    if (!workerId) return;
    setLoading(true);
    const result = await assignWorkerToBooking(bookingId, workerId);
    if (result?.error) {
       alert(result.error);
    }
    setLoading(false);
  }

  function simulateNotification(type: 'sms' | 'email') {
    setNotifying(type);
    setTimeout(() => {
       setNotifying(null);
       alert(`${type.toUpperCase()} Notification Dispatch Sent to Specialist.`);
    }, 1500);
  }

  const selectedWorker = workers.find(w => w.id === currentWorkerId);

  return (
    <div className="flex flex-col gap-3 min-w-[200px]">
      <div className="relative group">
        <select 
          disabled={loading}
          value={currentWorkerId || ''} 
          onChange={(e) => handleAssign(e.target.value)}
          className={`w-full text-[10px] font-black uppercase tracking-widest border border-slate-100 rounded-xl px-4 py-3 bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer appearance-none ${
            currentWorkerId ? 'text-blue-600 italic bg-blue-50/50 border-blue-100' : 'text-slate-400'
          }`}
        >
          <option value="">Pending Dispatch...</option>
          {workers.map(w => (
            <option key={w.id} value={w.id}>{w.full_name}</option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
           <span className="material-symbols-outlined text-sm">expand_more</span>
        </div>
        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
             <span className="material-symbols-outlined text-xs animate-spin text-blue-600 font-black">progress_activity</span>
          </div>
        )}
      </div>

      {currentWorkerId && (
        <div className="flex items-center gap-2 animate-in slide-in-from-top-2 duration-300 px-1">
           <button 
             onClick={() => simulateNotification('sms')}
             disabled={!!notifying}
             className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-white transition-all shadow-sm active:scale-90"
             title="Notify via SMS"
           >
              {notifying === 'sms' ? <span className="material-symbols-outlined text-xs animate-bounce text-blue-600">sms</span> : <span className="material-symbols-outlined text-sm">sms</span>}
           </button>
           <button 
             onClick={() => simulateNotification('email')}
             disabled={!!notifying}
             className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-white transition-all shadow-sm active:scale-90"
             title="Notify via E-mail"
           >
              {notifying === 'email' ? <span className="material-symbols-outlined text-xs animate-bounce text-blue-600">mail</span> : <span className="material-symbols-outlined text-sm">mail</span>}
           </button>
           <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest leading-none">Notify Specialist</span>
        </div>
      )}
    </div>
  );
}
