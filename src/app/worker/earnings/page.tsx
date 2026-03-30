import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function WorkerEarningsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'worker' && profile?.role !== 'admin') redirect('/dashboard');

  const { data: assignments } = await supabase
    .from('bookings')
    .select('total_amount, status, created_at')
    .eq('worker_id', user.id);

  const completed = assignments?.filter(b => b.status === 'completed') || [];
  const totalEarned = completed.reduce((sum, b) => sum + parseInt(b.total_amount || '0'), 0);
  const pendingValue = (assignments?.filter(b => b.status === 'worker_assigned' || b.status === 'in_progress') || [])
    .reduce((sum, b) => sum + parseInt(b.total_amount || '0'), 0);

  const metrics = [
    { label: 'Settled Payouts', value: totalEarned * 0.9, icon: 'receipt_long', color: 'text-emerald-600', sub: 'Cleared to Wallet' },
    { label: 'Work In Progress', value: pendingValue * 0.9, icon: 'pending', color: 'text-amber-500', sub: 'Estimated Future Settlement' },
    { label: 'Platform Fee (10%)', value: totalEarned * 0.1, icon: 'account_balance', color: 'text-slate-400', sub: 'Network Maintenance' },
    { label: 'Performance Bonus', value: 'KSh 0', icon: 'stars', color: 'text-blue-600', sub: 'Hub Quality Incentive' },
  ];

  return (
    <div className="flex-1 p-10 max-w-[1600px] mx-auto w-full space-y-12 animate-in fade-in duration-700 font-body">
      
      {/* Financial Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 py-4">
        <div className="space-y-2">
           <h1 className="text-4xl font-black tracking-tight text-slate-900 italic">Earning Terminal</h1>
           <p className="text-slate-500 font-medium text-lg italic uppercase tracking-widest text-[10px]">Financial Yield & Disbursement Metrics</p>
        </div>
        <div className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3 active:scale-95">
           Request Settlement
           <span className="material-symbols-outlined text-base">outbox</span>
        </div>
      </header>

      {/* Financial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {metrics.map(m => (
          <div key={m.label} className="bg-white p-9 rounded-[3rem] shadow-premium border border-slate-100 flex flex-col justify-between h-52 group hover:border-blue-600/30 transition-all overflow-hidden relative">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner mb-4">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
             </div>
             <div className="relative z-10 transition-transform group-hover:-translate-y-1 duration-500">
                <p className={`text-3xl font-black ${m.color} font-headline tracking-tighter leading-none italic`}>KES {Math.round(m.value as number || 0).toLocaleString()}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mt-3 leading-none italic">{m.label}</p>
             </div>
             <p className="text-[9px] font-black text-slate-200 uppercase tracking-widest italic mt-4">{m.sub}</p>
             <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-[4rem] shadow-premium border border-slate-100 overflow-hidden group">
         <div className="p-12 border-b border-slate-50 bg-slate-50/20 backdrop-blur-lg flex items-center justify-between">
            <div className="space-y-2">
               <h3 className="text-2xl font-black text-slate-900 italic tracking-tighter">Settlement Ledger</h3>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Historical Disbursements</p>
            </div>
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
               <button className="px-8 py-3 bg-white text-slate-900 rounded-xl shadow-sm border border-slate-200 text-[10px] font-black uppercase tracking-widest italic">All Managed Jobs</button>
            </div>
         </div>
         <div className="overflow-x-auto min-h-[400px]">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 text-slate-400 text-[9px] uppercase tracking-widest font-black italic">
                     <th className="px-12 py-8 border-b border-slate-50">Operational Module</th>
                     <th className="px-12 py-8 border-b border-slate-50">Date</th>
                     <th className="px-12 py-8 border-b border-slate-50">Status</th>
                     <th className="px-12 py-8 text-right border-b border-slate-50">Specialist Yield</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  {completed.length > 0 ? completed.map((b: any, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                       <td className="px-12 py-10 font-bold text-slate-900 italic">Managed Home Service</td>
                       <td className="px-12 py-10 text-[11px] font-black text-slate-400 uppercase tracking-widest">{b.created_at.split('T')[0]}</td>
                       <td className="px-12 py-10">
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic">Cleared</span>
                       </td>
                       <td className="px-12 py-10 text-right font-black text-slate-900 text-lg italic tracking-tight">KSh {Math.round(parseInt(b.total_amount) * 0.9).toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                       <td colSpan={4} className="px-12 py-40 text-center">
                          <div className="max-w-xs mx-auto space-y-6 flex flex-col items-center">
                             <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 shadow-inner">
                                <span className="material-symbols-outlined text-4xl">payments</span>
                             </div>
                             <h4 className="text-lg font-black text-slate-900 uppercase italic tracking-tighter">Negative Settlement Flux</h4>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 leading-relaxed">No historical yields have correctly cleared the StarDash payment terminal for this specialist.</p>
                          </div>
                       </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
      <div className="h-10"></div>
    </div>
  );
}
