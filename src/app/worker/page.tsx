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
     { label: 'Today\'s Jobs', value: activeTasks.length, icon: 'today', sub: 'Current work' },
     { label: 'Your Rating', value: '5.0', icon: 'star', sub: 'Calculated from 12 reviews' },
     { label: 'Unpaid Earnings', value: 'KSh 0', icon: 'account_balance_wallet', sub: 'Waiting for payout' },
  ];

  return (
    <div className="flex-1 p-10 max-w-[1600px] mx-auto w-full space-y-12 animate-in fade-in duration-700 font-body bg-slate-50 min-h-screen">
      
      {/* Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 py-4 px-2">
        <div className="space-y-2">
           <h1 className="text-3xl font-bold tracking-tight text-slate-900">Specialist Dashboard</h1>
           <p className="text-slate-500 font-medium text-sm">Manage your current jobs and update your progress.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-3 pr-6 rounded-2xl border border-slate-100 shadow-sm">
           <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-lg shadow-blue-100">
              {profile?.full_name?.[0] || 'W'}
           </div>
           <div className="flex flex-col">
              <p className="text-sm font-bold text-slate-900 leading-none">{profile?.full_name}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5 leading-none">Verified Staff Member</p>
           </div>
        </div>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {metrics.map(m => (
          <div key={m.label} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between h-48 group hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 tracking-tight leading-none">{m.value}</p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2 leading-none">{m.label}</p>
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4 italic">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
         
         {/* Job List */}
         <div className="xl:col-span-2 space-y-8">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-xl font-bold text-slate-900">Assigned Jobs</h3>
               {activeTasks.length > 0 && <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest italic animate-pulse">Monitoring Live</span>}
            </div>

            <div className="grid grid-cols-1 gap-8">
              {activeTasks.length > 0 ? activeTasks.map((job: any) => (
                <div key={job.id} className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all group flex flex-col md:flex-row">
                   {/* Left Date Pane */}
                   <div className="w-full md:w-[130px] bg-slate-50 p-10 flex flex-col items-center justify-center border-r border-slate-50">
                      <p className="text-3xl font-bold text-slate-900 tracking-tight">{job.scheduled_date?.split('-')[2] || '--'}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.scheduled_date?.split('-')[1] || '--'}</p>
                      <p className="text-[10px] font-bold text-blue-600 mt-5 uppercase tracking-widest">{job.scheduled_time}</p>
                   </div>
                   {/* Main Content Pane */}
                   <div className="flex-1 p-10 space-y-10">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                         <div className="space-y-3">
                            <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Project</span>
                            <h4 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{job.service?.title || 'Residential Service'}</h4>
                         </div>
                         <div className="flex flex-col items-end gap-2">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                              job.status === 'in_progress' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                            }`}>
                               {job.status?.replace('_', ' ') || 'Assigned'}
                            </span>
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">Job #{job.id.slice(0, 5)}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-50">
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 mt-0.5 shadow-sm">
                               <span className="material-symbols-outlined text-lg">location_on</span>
                            </div>
                            <div className="space-y-1">
                               <p className="text-sm font-bold text-slate-900">{job.address?.neighborhood || 'Nairobi'}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Client Location</p>
                            </div>
                         </div>
                         <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 mt-0.5 shadow-sm">
                               <span className="material-symbols-outlined text-lg">person</span>
                            </div>
                            <div className="space-y-1">
                               <p className="text-sm font-bold text-slate-900">{job.customer?.full_name || job.guest_name}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Customer Contact</p>
                            </div>
                         </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                         <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98]">I Have Arrived</button>
                         <button className="flex-1 py-4 bg-white border border-slate-100 text-slate-500 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">Service Details</button>
                         <button className="px-8 py-4 bg-red-50 text-red-500 rounded-2xl font-bold text-[11px] uppercase tracking-widest hover:bg-red-100 transition-all">Cancel</button>
                      </div>
                   </div>
                </div>
              )) : (
                <div className="bg-white border border-slate-100 rounded-[3rem] p-32 text-center shadow-sm">
                   <div className="max-w-xs mx-auto space-y-4 opacity-30 flex flex-col items-center">
                      <span className="material-symbols-outlined text-5xl">inbox</span>
                      <p className="text-sm font-bold uppercase tracking-widest">No assigned jobs found</p>
                   </div>
                </div>
              )}
            </div>
         </div>

         {/* Sidebar Stats */}
         <div className="space-y-10">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-10">
               <div className="space-y-2">
                  <h4 className="text-lg font-bold text-slate-900">Performance Metrics</h4>
                  <p className="text-xs font-medium text-slate-400">Your quality and reliability stats</p>
               </div>
               <div className="space-y-8">
                  {[
                    { label: 'Job Consistency', val: '100%', color: 'bg-emerald-500' },
                    { label: 'Customer Satisfaction', val: '100%', color: 'bg-blue-600' },
                    { label: 'Completion rate', val: '95%', color: 'bg-indigo-600' }
                  ].map(item => (
                    <div key={item.label}>
                       <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-3 px-1">
                          <span className="text-slate-400">{item.label}</span>
                          <span className="text-slate-900">{item.val}</span>
                       </div>
                       <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-4 bg-slate-50 text-slate-500 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all">Refresh My Stats</button>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-xl shadow-slate-200 relative overflow-hidden group">
               <div className="relative z-10 space-y-6">
                  <h4 className="text-2xl font-bold tracking-tight">Your Earnings</h4>
                  <p className="text-white/40 text-xs leading-relaxed font-medium">Track your total income, track job payments, and manage your payouts easily from here.</p>
                  <Link href="/worker/earnings" className="w-full h-14 flex items-center justify-center bg-blue-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-500 transition-all active:scale-95">View Payout History</Link>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
