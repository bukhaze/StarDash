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

  async function handleAssign(workerId: string) {
    if (!workerId) return;
    setLoading(true);
    const result = await assignWorkerToBooking(bookingId, workerId);
    if (result?.error) {
      alert(result.error);
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center gap-2">
      <select 
        disabled={loading}
        value={currentWorkerId || ''} 
        onChange={(e) => handleAssign(e.target.value)}
        className="text-[10px] font-bold border border-outline-variant/20 rounded-lg px-2 py-1 bg-surface outline-none focus:ring-1 focus:ring-secondary transition-all"
      >
        <option value="">Assign Worker...</option>
        {workers.map(w => (
          <option key={w.id} value={w.id}>{w.full_name}</option>
        ))}
      </select>
      {loading && <span className="material-symbols-outlined text-xs animate-spin text-secondary">progress_activity</span>}
    </div>
  );
}
