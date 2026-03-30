import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function CustomerDashboard() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'worker') redirect('/worker');
  if (profile?.role === 'admin') redirect('/admin');

  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(title, image_url),
      worker:worker_profiles(id, rating, profile:profiles(full_name, avatar_url)),
      address:addresses(neighborhood, street_address, apartment_suite)
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });

  const activeDispatches = bookings?.filter(b => b.status !== 'completed' && b.status !== 'cancelled') || [];
  const primaryDispatch = activeDispatches.length > 0 ? activeDispatches[0] : null;

  const quickStats = [
    { label: 'Active Bookings', value: activeDispatches.length, icon: 'schedule', color: 'text-blue-600' },
    { label: 'StarPoints', value: '1,200', icon: 'stars', color: 'text-amber-500' },
    { label: 'Total Services', value: bookings?.filter(b => b.status === 'completed').length || 0, icon: 'verified', color: 'text-emerald-600' },
  ];

  return (
    <div className="p-8 max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-700">
      
      {/* Welcome Header */}
      <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 py-4">
        <div className="space-y-2">
           <h2 className="text-4xl font-black tracking-tight text-slate-900">
             Welcome back, {profile?.first_name || 'Member'}
           </h2>
           <p className="text-slate-500 font-medium text-lg">Manage your home services and track your active specialists.</p>
        </div>
        <Link href="/services" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all active:scale-95 flex items-center gap-2">
           <span className="material-symbols-outlined text-lg">add_circle</span>
           Book a Service
        </Link>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map(s => (
          <div key={s.label} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between h-44 group hover:border-blue-200 transition-all">
             <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
             </div>
             <div>
                <p className={`text-3xl font-black ${s.color} tracking-tight`}>{s.value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">{s.label}</p>
             </div>
          </div>
        ))}
      </section>

      {/* Main Dashboard Area */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
        <div className="xl:col-span-2 space-y-10">
          
          {/* Active Booking Tracker */}
          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-900 px-2">Active Service</h3>
             
             {primaryDispatch ? (
               <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-lg overflow-hidden group">
                  <div className="p-10 flex flex-col md:flex-row gap-10">
                     
                     <div className="flex-1 space-y-8">
                        <div className="space-y-4">
                           <div className="flex items-center gap-3">
                              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">{primaryDispatch.scheduled_date}</span>
                              <span className="text-slate-400 font-bold text-[11px] uppercase tracking-widest leading-none">@ {primaryDispatch.scheduled_time}</span>
                           </div>
                           <h4 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{primaryDispatch.service?.title || 'Managed Service'}</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                           <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mt-1">
                                 <span className="material-symbols-outlined text-lg">location_on</span>
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-800 tracking-tight">{primaryDispatch.address?.neighborhood}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Location</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-4">
                              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mt-1">
                                 <span className="material-symbols-outlined text-lg">sync</span>
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-800 tracking-tight capitalize">{primaryDispatch.status.replace('_', ' ')}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Status</p>
                              </div>
                           </div>
                        </div>

                        {primaryDispatch.worker && (
                           <div className="pt-8 border-t border-slate-50">
                              <div className="flex items-center gap-5">
                                 <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-black shadow-lg overflow-hidden ring-4 ring-slate-50">
                                    {primaryDispatch.worker.profile?.avatar_url ? (
                                      <img src={primaryDispatch.worker.profile.avatar_url} alt="Specialist" className="w-full h-full object-cover" />
                                    ) : (
                                      primaryDispatch.worker.profile?.full_name?.[0]
                                    )}
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned Specialist</p>
                                    <p className="text-lg font-black text-slate-900">{primaryDispatch.worker.profile?.full_name}</p>
                                    <div className="flex items-center gap-1">
                                       <span className="material-symbols-outlined text-[12px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                       <span className="text-[10px] font-bold text-slate-500">{primaryDispatch.worker.rating} Specialist Rating</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        )}
                     </div>

                     <div className="w-full md:w-auto flex flex-col gap-3 min-w-[200px]">
                        <button className="w-full px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-slate-800 transition-all">Chat with Support</button>
                        <button className="w-full px-8 py-4 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all">Reschedule</button>
                     </div>
                  </div>
               </div>
             ) : (
               <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2.5rem] p-24 text-center">
                  <div className="max-w-xs mx-auto space-y-6 flex flex-col items-center">
                     <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-slate-200 shadow-sm mb-2">
                        <span className="material-symbols-outlined text-4xl">calendar_today</span>
                     </div>
                     <h4 className="text-xl font-black text-slate-800">Ready for your next clean?</h4>
                     <p className="text-slate-400 text-sm font-medium leading-relaxed">Book a professional service today and experience the StarDash standard.</p>
                     <Link href="/services" className="bg-blue-600 text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-all">Browse Services</Link>
                  </div>
               </div>
             )}
          </div>

          {/* Booking History */}
          <div className="space-y-6">
             <h3 className="text-xl font-black text-slate-900 px-2">Service History</h3>
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-black">
                          <th className="px-8 py-5">Service</th>
                          <th className="px-8 py-5">Date</th>
                          <th className="px-8 py-5 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {bookings && bookings.length > 0 ? bookings.slice(0, 10).map((b: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6">
                               <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{b.service?.title || 'Home Service'}</p>
                               <span className={`text-[10px] font-bold uppercase tracking-widest mt-1 inline-block ${b.status === 'completed' ? 'text-emerald-600' : 'text-slate-400 opacity-60'}`}>{b.status.replace('_', ' ')}</span>
                            </td>
                            <td className="px-8 py-6">
                               <p className="text-sm font-bold text-slate-600">{b.scheduled_date}</p>
                            </td>
                            <td className="px-8 py-6 text-right font-black text-slate-900">
                               KSh {parseInt(b.total_amount).toLocaleString()}
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={3} className="px-8 py-16 text-center text-slate-300 font-bold italic">No bookings found in your history.</td>
                          </tr>
                        )}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
           {/* Referral Card */}
           <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white space-y-8 shadow-xl shadow-blue-100 relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md border border-white/10">
                    <span className="material-symbols-outlined text-3xl">card_giftcard</span>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-3xl font-black leading-tight">Gift KSh 1,000</h4>
                    <p className="text-white/70 text-sm font-medium leading-relaxed">Refer a friend and you both get KSh 1,000 when they complete their first booking.</p>
                 </div>
                 <button className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all outline-none">Share My Link</button>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                 <span className="material-symbols-outlined text-[150px]">celebration</span>
              </div>
           </div>

           {/* Quick Support */}
           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm space-y-6">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 px-1">Need help?</h4>
              <div className="space-y-3">
                 {[
                   { label: 'Booking Help', icon: 'help_center' },
                   { label: 'Billing & Receipts', icon: 'receipt_long' },
                   { label: 'Report an Issue', icon: 'report_problem' }
                 ].map(item => (
                   <button key={item.label} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-blue-600 hover:text-white transition-all duration-300">
                      <div className="flex items-center gap-4">
                         <span className="material-symbols-outlined text-lg text-slate-400 group-hover:text-white transition-colors">{item.icon}</span>
                         <span className="text-sm font-bold">{item.label}</span>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 text-base group-hover:text-white transition-colors">chevron_right</span>
                   </button>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
