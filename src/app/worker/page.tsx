import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function WorkerDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'worker' && profile?.role !== 'admin') redirect('/dashboard');

  const { data: assignments } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(title),
      customer:profiles!bookings_customer_id_fkey(full_name, phone),
      address:addresses(neighborhood, street_address, apartment_suite)
    `)
    .eq('worker_id', user.id)
    .order('scheduled_date', { ascending: true });

  const activeTasks = assignments?.filter(a => a.status === 'worker_assigned' || a.status === 'in_progress') || [];

  const metrics = [
     { label: 'Today Tasks', value: activeTasks.length, icon: 'today', sub: 'Active Dispatch' },
     { label: 'Rating', value: '5.0', icon: 'star', sub: 'Verified Partner' },
     { label: 'Earnings', value: 'KSh 0', icon: 'account_balance_wallet', sub: 'Pending Payout' },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto w-full space-y-12 animate-in fade-in duration-700">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 py-4">
        <div className="space-y-2">
           <h1 className="text-4xl font-black tracking-tight text-slate-900 italic">Dispatch Terminal</h1>
           <p className="text-slate-500 font-medium text-lg">Manage your assigned tasks and update project progress.</p>
        </div>
        <div className="flex gap-4">
           <div className="flex flex-col items-end">
              <p className="text-sm font-black text-slate-900 leading-none">{profile?.full_name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 leading-none italic">Verified Specialist Specialist</p>
           </div>
           <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-lg shadow-lg shadow-blue-100 ring-4 ring-slate-50">
              {profile?.full_name?.[0] || 'W'}
           </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map(m => (
          <div key={m.label} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-44 group hover:border-blue-200 transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tight leading-none italic">{m.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2 leading-none">{m.label}</p>
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-300 font-body uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-all">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
         
         {/* Dispatch Queue */}
         <div className="xl:col-span-2 space-y-8">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-black text-slate-900 italic">Assigned Dispatch Queue</h3>
               {activeTasks.length > 0 && <span className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border border-emerald-100 italic animate-pulse">Monitoring Live</span>}
            </div>

            <div className="grid grid-cols-1 gap-6">
              {activeTasks.length > 0 ? activeTasks.map((job: any) => (
                <div key={job.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col md:flex-row relative">
                   {/* Left Date Pane */}
                   <div className="w-full md:w-[120px] bg-slate-50 p-8 flex flex-col items-center justify-center border-r border-slate-100">
                      <p className="text-2xl font-black text-slate-900 tracking-tight">{job.scheduled_date.split('-')[2]}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{job.scheduled_date.split('-')[1]}</p>
                      <p className="text-[10px] font-black text-blue-600 mt-4 uppercase tracking-[0.2em]">{job.scheduled_time}</p>
                   </div>
                   {/* Main Content Pane */}
                   <div className="flex-1 p-10 space-y-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                         <div className="space-y-4">
                            <span className="bg-blue-50 text-blue-600 border border-blue-100 px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest italic">Operational Project</span>
                            <h4 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{job.service?.title || 'Home Service'}</h4>
                         </div>
                         <div className="flex flex-col items-end gap-2">
                            <span className={`inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${
                              job.status === 'in_progress' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-600 text-white shadow-lg'
                            }`}>
                               {job.status.replace('_', ' ')}
                            </span>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID: {job.id.slice(0, 8)}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 mt-0.5 shadow-sm">
                               <span className="material-symbols-outlined text-lg">location_on</span>
                            </div>
                            <div>
                               <p className="text-sm font-black text-slate-900">{job.address?.neighborhood}</p>
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Location Vector</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 mt-0.5 shadow-sm">
                               <span className="material-symbols-outlined text-lg">account_circle</span>
                            </div>
                            <div>
                               <p className="text-sm font-black text-slate-900">{job.customer?.full_name || job.guest_name}</p>
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Customer Presence</p>
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                         <button className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-slate-800 active:scale-[0.98] transition-all">Report Arrival</button>
                         <button className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-slate-100 hover:text-slate-600 transition-all">Project Log</button>
                         <button className="px-6 py-5 bg-white border border-slate-100 text-red-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-red-50 transition-all">Abort</button>
                      </div>
                   </div>
                </div>
              )) : (
                <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[3rem] p-32 text-center">
                   <div className="max-w-xs mx-auto space-y-6 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-slate-200 shadow-sm">
                         <span className="material-symbols-outlined text-4xl">inbox</span>
                      </div>
                      <h4 className="text-xl font-black text-slate-900 uppercase italic tracking-tighter">Queue Unassigned</h4>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest leading-relaxed">Operations Command has not dispatched any requirements to your terminal.</p>
                   </div>
                </div>
              )}
            </div>
         </div>

         {/* Stats Panel */}
         <div className="space-y-10">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-10">
               <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-900 italic">Specialist Scorecard</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Current Quality Audit</p>
               </div>
               <div className="space-y-8">
                  {[
                    { label: 'Reliability Protocol', val: '100%', color: 'bg-emerald-500' },
                    { label: 'Citizen Rating', val: '100%', color: 'bg-blue-600' },
                    { label: 'Task Efficiency', val: '42%', color: 'bg-indigo-600' }
                  ].map(item => (
                    <div key={item.label}>
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-1">
                          <span className="text-slate-400 italic opacity-60">{item.label}</span>
                          <span className="text-slate-900 tracking-tight">{item.val}</span>
                       </div>
                       <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="pt-6 border-t border-slate-50">
                  <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.3em] shadow-lg hover:bg-slate-800 transition-all">Refresh Metrics</button>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-10 shadow-xl shadow-slate-200 relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <h4 className="text-2xl font-black leading-tight italic">Earning Terminal</h4>
                  <p className="text-white/40 text-[10px] font-black leading-loose uppercase tracking-widest text-slate-400">Manage your specialist yield and historical earnings distribution directly via the hub.</p>
                  <Link href="/worker/earnings" className="w-full h-14 flex items-center justify-center bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-500 transition-all active:scale-95">Verify Settlements</Link>
               </div>
               <div className="absolute opacity-[0.03] -bottom-10 -right-10 scale-[4]">
                  <span className="material-symbols-outlined text-[100px]">payments</span>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
