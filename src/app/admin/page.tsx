import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

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

  const pendingBookings = allBookings?.filter(b => b.status === 'pending') || [];
  const inProgressJobs = allBookings?.filter(b => b.status === 'in_progress' || b.status === 'worker_assigned') || [];

  const stats = [
    { label: 'New Bookings', value: pendingBookings.length, color: 'text-blue-600', sub: 'Waiting for staff', icon: 'pending_actions' },
    { label: 'Active Jobs', value: inProgressJobs.length, color: 'text-blue-600', sub: 'Currently ongoing', icon: 'assignment' },
    { label: 'Active Staff', value: activeWorkers?.length || 0, color: 'text-emerald-600', sub: 'Staff online now', icon: 'person' },
    { label: 'Today\'s Earnings', value: 'KSh 12,450', color: 'text-slate-900', sub: 'Gross revenue', icon: 'account_balance_wallet' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen font-body">
         
         <header className="w-full relative md:sticky top-0 z-30 bg-white border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between px-10 py-8 md:h-28 animate-in fade-in duration-700">
            <div className="space-y-1">
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Management Overview</h1>
               <p className="text-sm font-medium text-slate-400">Manage your staff and service bookings for Nairobi.</p>
            </div>
            <div className="flex items-center gap-4">
               <Link href="/admin/bookings" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center gap-3">
                  Manage All Bookings
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
               </Link>
            </div>
         </header>

         <main className="flex-1 p-10 max-w-[1600px] mx-auto w-full space-y-12 animate-in slide-in-from-bottom-6 duration-1000">
            
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {stats.map(s => (
                  <div key={s.label} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-48 group hover:shadow-md transition-all">
                     <div className="space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                           <span className="material-symbols-outlined text-xl">{s.icon}</span>
                        </div>
                        <div>
                           <p className={`text-4xl font-bold ${s.color} tracking-tight`}>{s.value}</p>
                           <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">{s.label}</p>
                        </div>
                     </div>
                     <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-4 italic">{s.sub}</p>
                  </div>
               ))}
            </section>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
               
               <div className="xl:col-span-2 space-y-8">
                  <div className="flex items-center justify-between px-4">
                     <div>
                        <h3 className="text-xl font-bold text-slate-900">Recent Service Requests</h3>
                        <p className="text-xs font-medium text-slate-400 mt-1">Bookings made by customers across Nairobi</p>
                     </div>
                     <Link href="/admin/bookings" className="text-[11px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700 underline underline-offset-4">View All &gt;</Link>
                  </div>

                  <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[500px]">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                            <th className="px-10 py-6 border-b border-slate-50">Customer & Location</th>
                            <th className="px-10 py-6 border-b border-slate-50">Service Details</th>
                            <th className="px-10 py-6 text-right border-b border-slate-50">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {allBookings && allBookings.length > 0 ? allBookings.slice(0, 6).map((b: any) => (
                            <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-10 py-8">
                                <p className="font-bold text-slate-900 text-base">{b.customer?.full_name || 'Guest User'}</p>
                                <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-tight">{b.address?.neighborhood || 'Nairobi Area'}</p>
                              </td>
                              <td className="px-10 py-8">
                                <p className="font-bold text-slate-900 text-sm">{b.service?.title || 'Home Cleaning'}</p>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">{b.scheduled_date} at {b.scheduled_time}</p>
                              </td>
                              <td className="px-10 py-8 text-right">
                                <div className="flex flex-col items-end gap-3">
                                   <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                                     b.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                     b.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                     b.status === 'worker_assigned' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                     'bg-slate-100 text-slate-500 border-slate-200'
                                   }`}>
                                     {b.status.replace('_', ' ')}
                                   </span>
                                   {b.status === 'pending' && (
                                     <Link href={`/admin/bookings`} className="bg-slate-900 text-white text-[10px] font-bold uppercase py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition-all">Assign Staff</Link>
                                   )}
                                </div>
                              </td>
                            </tr>
                          )) : (
                            <tr>
                              <td colSpan={3} className="px-10 py-32 text-center">
                                 <div className="max-w-xs mx-auto space-y-4 opacity-30">
                                    <span className="material-symbols-outlined text-4xl">inbox</span>
                                    <p className="text-xs font-bold uppercase tracking-widest">No recent bookings found</p>
                                 </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 space-y-8">
                     <div className="flex items-center justify-between">
                        <div>
                           <h4 className="text-lg font-bold text-slate-900">Staff Status</h4>
                           <p className="text-xs font-medium text-slate-400 mt-1">Personnel currently online</p>
                        </div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                     </div>
                     <div className="space-y-2">
                        {activeWorkers && activeWorkers.length > 0 ? activeWorkers.slice(0, 5).map((w: any) => (
                          <div key={w.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-sm">
                                   {w.profile?.full_name?.split(' ').map((n:any) => n[0]).join('')}
                                </div>
                                <p className="text-sm font-bold text-slate-900">{w.profile?.full_name}</p>
                             </div>
                             <span className="text-[10px] font-bold text-emerald-500 uppercase">Online</span>
                          </div>
                        )) : (
                          <div className="py-20 text-center opacity-30">
                             <p className="text-[10px] font-bold uppercase tracking-widest">No staff currently online</p>
                          </div>
                        )}
                     </div>
                     <Link href="/admin/workers" className="w-full flex items-center justify-center py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg">Manage Staff</Link>
                  </div>

                  <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white space-y-6 shadow-xl shadow-blue-100">
                     <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">shield</span>
                     </div>
                     <div className="space-y-2">
                        <h5 className="text-2xl font-bold">Admin Controls</h5>
                        <p className="text-blue-100 text-sm leading-relaxed">Access global settings, audit logs, and finance records for the entire StarDash platform.</p>
                     </div>
                     <Link href="/admin/settings" className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold text-xs shadow-lg inline-block text-center hover:bg-blue-50 transition-all">Review System Settings</Link>
                  </div>
               </div>
            </div>
         </main>
    </div>
  );
}
