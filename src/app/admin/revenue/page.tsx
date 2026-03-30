import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminRevenuePage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  const { data: allBookings } = await supabase
    .from('bookings')
    .select('total_amount, status, created_at');

  const completed = allBookings?.filter(b => b.status === 'completed') || [];
  const totalRevenue = completed.reduce((sum, b) => sum + parseInt(b.total_amount || '0'), 0);
  const pendingRevenue = (allBookings?.filter(b => b.status === 'pending' || b.status === 'worker_assigned') || [])
    .reduce((sum, b) => sum + parseInt(b.total_amount || '0'), 0);

  const metrics = [
    { label: 'Total Earnings', value: totalRevenue, icon: 'payments', color: 'text-emerald-600', sub: 'Completed bookings' },
    { label: 'Pending Revenue', value: pendingRevenue, icon: 'schedule', color: 'text-amber-500', sub: 'Active appointments' },
    { label: 'Our Commission', value: Math.round(totalRevenue * 0.1), icon: 'account_balance', color: 'text-blue-600', sub: '10% platform fee' },
    { label: 'Total Staff Payouts', value: Math.round(totalRevenue * 0.9), icon: 'group', color: 'text-slate-900', sub: 'Earnings for specialists' },
  ];

  return (
    <div className="flex-1 flex flex-col font-body bg-slate-50 min-h-screen">
      <header className="w-full relative md:sticky top-0 z-30 bg-white border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between px-10 py-8 md:h-28 animate-in fade-in duration-700">
         <div className="space-y-1">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Finance & Earnings</h1>
            <p className="text-sm font-medium text-slate-400">Track business revenue and manage specialist payouts.</p>
         </div>
      </header>

      <main className="flex-1 p-10 max-w-[1600px] mx-auto w-full space-y-12 animate-in slide-in-from-bottom-4 duration-1000">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map(m => (
            <div key={m.label} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between h-48 group hover:shadow-md transition-all relative overflow-hidden">
               <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-lg">{m.icon}</span>
               </div>
               <div className="space-y-4">
                  <div>
                     <p className={`text-3xl font-bold ${m.color} tracking-tight`}>KSh {m.value.toLocaleString()}</p>
                     <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">{m.label}</p>
                  </div>
               </div>
               <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-4 italic">{m.sub}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 p-16 text-center space-y-8 relative overflow-hidden group">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl">bar_chart</span>
          </div>
          <div className="space-y-4">
             <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Reports</h3>
             <p className="text-slate-400 text-sm font-medium max-w-xl mx-auto leading-relaxed">
               Comprehensive analysis of your service volume and financial growth across Nairobi. Detailed reports and historical audits will appear here as more data is collected.
             </p>
          </div>
          <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-slate-800 transition-all active:scale-95">Download Full Financial Audit</button>
        </div>

      </main>
    </div>
  );
}
