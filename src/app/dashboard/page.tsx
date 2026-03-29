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
      service:services(title),
      address:addresses(neighborhood, street_address, apartment_suite)
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false });

  const activeBookings = bookings?.filter(b => b.status === 'pending' || b.status === 'confirmed' || b.status === 'worker_assigned') || [];
  const upcomingBooking = activeBookings.length > 0 ? activeBookings[0] : null;

  const quickStats = [
    { label: 'Active Requests', value: activeBookings.length, icon: 'pending_actions', color: 'bg-primary' },
    { label: 'Total Managed', value: bookings?.length || 0, icon: 'inventory_2', color: 'bg-secondary' },
    { label: 'Savings Credit', value: 'KES 0', icon: 'account_balance_wallet', color: 'bg-amber-500' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-16">
      
      {/* Premium Hero Welcome */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-4">
        <div className="space-y-3">
           <span className="bg-secondary/10 text-secondary border border-secondary/20 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] font-headline">Elite Hub Access</span>
           <h2 className="font-headline text-5xl font-black tracking-tight text-primary leading-tight">
             Hello, {profile?.full_name?.split(' ')[0] || 'Member'}
           </h2>
           <p className="text-on-surface-variant text-xl font-body font-medium max-w-lg">Your home is curated by Nairobi's leading service network. Everything looks perfect for today.</p>
        </div>
        <Link href="/services" className="bg-primary text-white px-10 py-5 rounded-2xl font-bold font-headline shadow-premium hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group">
           <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add_circle</span>
           New Service Request
        </Link>
      </section>

      {/* Modern Insight Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {quickStats.map(s => (
          <div key={s.label} className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-outline-variant/10 group hover:border-secondary/30 transition-all flex flex-col justify-between h-48 relative overflow-hidden">
             <div className="space-y-4 relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${s.color}/10 flex items-center justify-center text-primary font-bold shadow-inner`}>
                   <span className="material-symbols-outlined text-[20px]" style={{ color: s.color.includes('secondary') ? '#10b981' : s.color.includes('amber') ? '#d97706' : '#0f172a' }}>{s.icon}</span>
                </div>
                <div>
                   <p className="text-4xl font-headline font-black text-primary tracking-tight leading-none">{s.value}</p>
                   <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant font-headline mt-3 leading-none">{s.label}</p>
                </div>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-low/20 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
          </div>
        ))}
      </section>

      {/* Main Command Center Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-2 space-y-12">
          
          <div className="space-y-6">
             <div className="flex items-center justify-between px-2">
                <h3 className="font-headline text-2xl font-bold text-primary">Service Dispatch Queue</h3>
                {upcomingBooking && <span className="bg-amber-500/10 text-amber-600 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/10 animate-pulse">Monitoring Live</span>}
             </div>
             
             {upcomingBooking ? (
               <div className="bg-white rounded-[3rem] shadow-premium border border-outline-variant/10 overflow-hidden group hover:border-secondary/20 transition-all">
                  <div className="p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                     <div className="space-y-6">
                        <div className="flex items-center gap-3">
                           <span className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest font-headline">{upcomingBooking.scheduled_date}</span>
                           <span className="text-secondary font-black text-[10px] font-headline uppercase tracking-widest leading-none">@ {upcomingBooking.scheduled_time}</span>
                        </div>
                        <h4 className="text-4xl font-headline font-black text-primary leading-tight group-hover:text-secondary transition-colors">{upcomingBooking.service?.title || 'Premium Service'}</h4>
                        
                        <div className="flex flex-wrap items-center gap-8">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
                                 <span className="material-symbols-outlined">distance</span>
                              </div>
                              <div>
                                 <p className="text-sm font-black text-primary font-headline">{upcomingBooking.address?.neighborhood}</p>
                                 <p className="text-[10px] text-on-surface-variant font-body uppercase font-bold">{upcomingBooking.address?.street_address}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary shadow-inner">
                                 <span className="material-symbols-outlined">stars</span>
                              </div>
                              <div>
                                 <p className="text-sm font-black text-primary font-headline">Status Signal</p>
                                 <p className="text-[10px] text-on-surface-variant font-body uppercase font-bold">{upcomingBooking.status.replace('_', ' ')}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <Link href="/dashboard/bookings" className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold font-headline text-sm shadow-xl hover:opacity-90 active:scale-95 transition-all text-center">Manage Dispatch</Link>
                  </div>
               </div>
             ) : (
               <div className="bg-surface-container-low/20 border-2 border-dashed border-outline-variant/30 rounded-[3rem] p-24 text-center">
                  <div className="max-w-xs mx-auto space-y-6">
                     <span className="material-symbols-outlined text-6xl text-slate-200">event_busy</span>
                     <h4 className="font-headline font-bold text-2xl text-primary leading-tight">No Active Dispatches</h4>
                     <p className="text-on-surface-variant text-sm font-body leading-relaxed">Your home network is currently in stand-by. Need a professional deep cleaning or laundry session?</p>
                     <Link href="/services" className="inline-block bg-primary text-white font-bold font-headline px-10 py-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">Browse Catalog</Link>
                  </div>
               </div>
             )}
          </div>

          <div className="space-y-6">
             <h3 className="font-headline text-2xl font-bold text-primary px-2">Managed History</h3>
             <div className="bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/10 overflow-hidden font-body">
                <div className="overflow-x-auto">
                   <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-high/10 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                          <th className="px-8 py-5">Service Rendered</th>
                          <th className="px-8 py-5">Managed Date</th>
                          <th className="px-8 py-5 text-right">Settlement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high/10">
                        {bookings && bookings.length > 0 ? bookings.slice(0, 5).map((activity: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-6">
                               <p className="font-black text-primary font-headline text-sm group-hover:text-secondary transition-colors">{activity.service?.title || 'Cleaning Service'}</p>
                               <span className={`text-[9px] font-black uppercase tracking-widest mt-1 ${activity.status === 'completed' ? 'text-secondary' : 'text-on-surface-variant'}`}>{activity.status.replace('_', ' ')}</span>
                            </td>
                            <td className="px-8 py-6 text-on-surface-variant font-bold text-xs uppercase tracking-tighter">{activity.scheduled_date}</td>
                            <td className="px-8 py-6 text-right font-black text-primary font-headline text-sm">KES {parseInt(activity.total_amount).toLocaleString()}</td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={3} className="px-8 py-16 text-center text-on-surface-variant font-medium">History is currently empty.</td>
                          </tr>
                        )}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-12">
           <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 shadow-premium relative overflow-hidden group">
              <div className="relative z-10 space-y-6">
                 <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary-fixed shadow-inner">
                    <span className="material-symbols-outlined text-3xl">loyalty</span>
                 </div>
                 <div>
                    <h4 className="font-headline text-3xl font-black leading-tight">Share the <br/>Gold Standard</h4>
                    <p className="text-white/50 text-xs mt-4 font-body leading-relaxed">Refer a neighbor to StarDash and both receive <span className="text-secondary font-bold">KES 1,500</span> in service credits once their first clean is completed.</p>
                 </div>
                 <button className="w-full py-5 bg-white text-primary rounded-2xl font-bold font-headline text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">Extract Referral Code</button>
              </div>
              <div className="absolute opacity-[0.03] -bottom-10 -right-10 scale-[5]">
                 <span className="material-symbols-outlined text-[100px]">auto_awesome</span>
              </div>
           </div>

           <div className="space-y-6 px-2">
              <h4 className="font-headline text-sm font-black uppercase tracking-widest text-primary">Lifestyle Concierge</h4>
              <div className="space-y-4">
                 {[
                   { label: 'Deep Apartment Hygiene', icon: 'sanitizer' },
                   { label: 'Executive Laundry Care', icon: 'local_laundry_service' },
                   { label: 'Premium Sofa Shampoo', icon: 'chair' }
                 ].map(item => (
                   <div key={item.label} className="p-6 bg-white border border-outline-variant/10 rounded-2xl flex items-center justify-between group hover:shadow-premium transition-all">
                      <div className="flex items-center gap-4">
                         <span className="material-symbols-outlined text-secondary opacity-60 group-hover:opacity-100 transition-opacity">{item.icon}</span>
                         <span className="text-xs font-bold text-primary font-headline">{item.label}</span>
                      </div>
                      <span className="material-symbols-outlined text-outline-variant text-[14px]">arrow_forward</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      <div className="h-12 md:hidden"></div>
    </div>
  );
}
