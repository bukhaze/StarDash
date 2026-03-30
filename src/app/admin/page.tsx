import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminOperationsCenter() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  // Fetch High-Density Telemetry
  const { data: allBookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(title),
      customer:profiles!bookings_customer_id_fkey(full_name, phone),
      address:addresses(neighborhood)
    `)
    .order('created_at', { ascending: false });

  const { data: activeWorkers } = await supabase
    .from('worker_profiles')
    .select(`*, profile:profiles(full_name)`)
    .eq('is_available', true);

  const pendingAssignments = allBookings?.filter(b => b.status === 'pending') || [];
  const activeJobs = allBookings?.filter(b => b.status === 'in_progress' || b.status === 'worker_assigned') || [];

  const metrics = [
    { label: 'Booking Intake', value: pendingAssignments.length, color: 'text-blue-600', sub: 'Ready for Dispatch', icon: 'pending_actions' },
    { label: 'Active Jobs', value: activeJobs.length, color: 'text-indigo-600', sub: 'Live in Nairobi', icon: 'dynamic_feed' },
    { label: 'Online Specialists', value: activeWorkers?.length || 0, color: 'text-emerald-600', sub: 'Verified & Available', icon: 'engineering' },
    { label: 'Today Revenue', value: 'KSh 12,450', color: 'text-blue-600', sub: '+12% vs Yesterday', icon: 'payments' },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto w-full space-y-12 animate-in fade-in duration-700">
      
      {/* Ops Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 py-4">
        <div className="space-y-2">
           <h1 className="text-4xl font-black tracking-tight text-slate-900 italic">Operations Hub</h1>
           <p className="text-slate-500 font-medium text-lg">Central dispatch and platform performance management.</p>
        </div>
        <div className="flex gap-3">
           <Link href="/admin/workers" className="bg-slate-50 text-slate-700 border border-slate-100 px-6 py-4 rounded-xl font-bold text-sm hover:bg-white transition-all">Manages Specialists</Link>
           <Link href="/admin/bookings" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-base">assignment</span>
              Dispatch Queue
           </Link>
        </div>
      </header>

      {/* Metrics Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(m => (
          <div key={m.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between h-48 relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
              </div>
              <div>
                <p className={`text-4xl font-black ${m.color} tracking-tight leading-none`}>{m.value}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-3 leading-none">{m.label}</p>
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 font-body uppercase tracking-tight relative z-10">{m.sub}</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
          </div>
        ))}
      </section>

      {/* Main Operations Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* Recent Inbound Activity */}
        <div className="xl:col-span-2 space-y-8">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-slate-900 italic">Inbound Intake Queue</h3>
              <Link href="/admin/bookings" className="text-blue-600 font-bold text-sm hover:underline underline-offset-4 decoration-2">Full Roster Audit &gt;</Link>
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                     <th className="px-10 py-6 italic">Customer / Location</th>
                     <th className="px-10 py-6 italic">Service Detail</th>
                     <th className="px-10 py-6 text-right italic">Action Required</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {allBookings && allBookings.length > 0 ? allBookings.slice(0, 10).map((b: any) => (
                     <tr key={b.id} className="hover:bg-slate-50/50 transition-colors group">
                       <td className="px-10 py-8">
                         <p className="font-bold text-slate-900 text-lg">{b.customer?.full_name || 'Anonymous Guest'}</p>
                         <div className="flex items-center gap-2 mt-1">
                            <span className="material-symbols-outlined text-[12px] text-blue-600">location_on</span>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest leading-none">{b.address?.neighborhood || 'Nairobi'}</span>
                         </div>
                       </td>
                       <td className="px-10 py-8">
                         <p className="font-black text-slate-900 text-[13px]">{b.service?.title || 'Managed Service'}</p>
                         <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">{b.scheduled_date} • {b.scheduled_time}</p>
                       </td>
                       <td className="px-10 py-8 text-right">
                         <div className="flex flex-col items-end gap-3">
                            <span className={`inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${
                              b.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                              b.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse' :
                              b.status === 'worker_assigned' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                              'bg-slate-100 text-slate-500 border-slate-200'
                            }`}>
                              {b.status.replace('_', ' ')}
                            </span>
                            {b.status === 'pending' ? (
                              <Link href={`/admin/bookings`} className="text-[9px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest flex items-center gap-1 group/link">
                                Assign Specialist
                                <span className="material-symbols-outlined text-[12px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
                              </Link>
                            ) : (
                                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Locked</p>
                            )}
                         </div>
                       </td>
                     </tr>
                   )) : (
                     <tr>
                       <td colSpan={3} className="px-10 py-32 text-center text-slate-300 italic font-bold">Intake queue currently clear.</td>
                     </tr>
                   )}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        {/* Sidebar Ops Widgets */}
        <div className="space-y-10">
           
           {/* Command Pulse */}
           <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white space-y-10 shadow-xl shadow-slate-200 relative overflow-hidden group">
              <div className="relative z-10 space-y-10">
                 <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                 </div>
                 <div className="space-y-4">
                    <h5 className="text-3xl font-black leading-tight italic">Platform Vitality</h5>
                    <p className="text-white/40 text-[10px] font-black leading-loose uppercase tracking-[0.2em]">Manage your premium specialist network and service architecture via the secure hub.</p>
                 </div>
                 <div className="space-y-3">
                    <Link href="/admin/workers" className="w-full h-14 flex items-center justify-between px-6 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/5 font-black text-[10px] uppercase tracking-widest">
                       Partner Roster
                       <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </Link>
                    <button className="w-full h-14 flex items-center justify-between px-6 bg-white/10 hover:bg-white/20 transition-all rounded-2xl border border-white/5 font-black text-[10px] uppercase tracking-widest">
                       Service Directory
                       <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                    <button className="w-full h-14 flex items-center justify-center gap-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-500 transition-all active:scale-95 mt-4">
                       <span className="material-symbols-outlined text-lg">description</span>
                       Audit Report
                    </button>
                 </div>
              </div>
           </div>

           {/* Specialist Presence */}
           <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-8">
              <div className="flex items-center justify-between">
                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 font-headline italic leading-none">Specialist Presence</h4>
                 <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className="divide-y divide-slate-50">
                 {activeWorkers && activeWorkers.length > 0 ? activeWorkers.slice(0, 6).map((w: any) => (
                   <div key={w.id} className="flex items-center justify-between py-5 group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-900 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            {w.profile?.full_name?.split(' ').map((n:any) => n[0]).join('')}
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-sm font-black text-slate-900">{w.profile?.full_name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none italic">Verified Specialist</p>
                         </div>
                      </div>
                      <span className="material-symbols-outlined text-emerald-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                   </div>
                 )) : (
                   <div className="py-20 text-center space-y-4">
                      <span className="material-symbols-outlined text-4xl text-slate-100">person_off</span>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Active roster empty.</p>
                   </div>
                 )}
              </div>
              <Link href="/admin/workers" className="w-full flex items-center justify-center p-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all">Full Network View</Link>
           </div>

        </div>
      </div>
    </div>
  );
}
