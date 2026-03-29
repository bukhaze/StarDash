import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

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

  // Fetch metrics for reporting
  const { data: allBookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(title),
      customer:profiles!bookings_customer_id_fkey(full_name, phone, email),
      address:addresses(neighborhood)
    `)
    .order('created_at', { ascending: false });

  const { data: workerCount } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq('role', 'worker');

  const pendingAssignments = allBookings?.filter(b => b.status === 'pending') || [];
  const todayBookings = allBookings?.filter(b => b.scheduled_date === new Date().toISOString().split('T')[0]) || [];

  const metrics = [
    { 
      label: 'Network Volume', 
      value: allBookings?.length || 0, 
      sub: 'All-time requests',
      icon: 'database',
      color: 'bg-primary'
    },
    { 
      label: 'Pending Dispatch', 
      value: pendingAssignments.length, 
      sub: 'Awaiting triages',
      icon: 'pending_actions',
      color: 'bg-amber-500' 
    },
    { 
      label: 'Verified Pros', 
      value: workerCount?.length || 0, 
      sub: 'Active partners',
      icon: 'engineering',
      color: 'bg-secondary' 
    },
  ];

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="w-full relative md:sticky top-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-4 md:h-20 gap-4 md:gap-0 shadow-sm border-b border-outline-variant/5">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-2xl font-bold">shield</span>
             <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Operational Command Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end hidden md:block">
               <p className="text-xs font-bold text-primary font-headline uppercase tracking-widest leading-none">{profile?.full_name}</p>
               <p className="text-[10px] text-on-surface-variant font-body">Super Admin Access</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white shadow-premium text-white font-bold flex items-center justify-center font-headline shrink-0">
               {profile?.full_name?.split(' ').map(n => n[0]).join('') || 'AD'}
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {metrics.map(m => (
              <div key={m.label} className="bg-white p-8 rounded-[2.5rem] shadow-premium border border-outline-variant/5 group hover:border-secondary/20 transition-all flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                   <div className={`w-12 h-12 rounded-2xl ${m.color}/10 flex items-center justify-center text-${m.color.split('-')[1]} font-bold`}>
                      <span className="material-symbols-outlined" style={{ color: m.color.includes('pending') ? '#d97706' : m.color.includes('secondary') ? '#10b981' : '#0f172a' }}>{m.icon}</span>
                   </div>
                   <div>
                      <p className="text-4xl font-headline font-black text-primary tracking-tight leading-none">{m.value}</p>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant font-headline mt-2 leading-none">{m.label}</p>
                   </div>
                </div>
                <p className="text-[10px] font-medium text-slate-400 font-body relative z-10 uppercase tracking-tight">{m.sub}</p>
                <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container-low/30 rounded-full translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform"></div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="flex items-center justify-between px-2">
                  <h3 className="font-headline text-2xl font-bold text-primary">Live Intake Roster</h3>
                  <Link href="/admin/bookings" className="text-xs font-extrabold text-secondary uppercase tracking-widest hover:underline flex items-center gap-1">Complete List &gt;</Link>
               </div>
               <div className="bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/5 overflow-hidden font-body">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-high/10 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                          <th className="px-8 py-5">Origin Connection</th>
                          <th className="px-8 py-5">Market Vector</th>
                          <th className="px-8 py-5 text-right">Operational Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container-high/10">
                        {allBookings && allBookings.length > 0 ? allBookings.slice(0, 8).map((booking: any) => (
                          <tr key={booking.id} className="hover:bg-slate-50 transition-colors group border-b border-outline-variant/5">
                            <td className="px-8 py-6">
                              <p className="font-bold text-primary font-headline text-sm">{booking.customer?.full_name || booking.guest_name || 'Anonymous'}</p>
                              <p className="text-[10px] text-on-surface-variant font-body uppercase font-medium">{booking.address?.neighborhood || 'Nairobi Hub'}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="font-bold text-primary font-headline text-sm">{booking.service?.title || 'Home Service'}</p>
                              <p className="text-[10px] text-on-surface-variant font-body">{booking.scheduled_date} • {booking.scheduled_time}</p>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                booking.status === 'completed' ? 'bg-secondary/10 text-secondary border-secondary/20' :
                                booking.status === 'pending' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20 animate-pulse' :
                                'bg-blue-500/10 text-blue-600 border-blue-500/20'
                              }`}>
                                {booking.status.replace('_', ' ')}
                              </span>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={3} className="px-8 py-20 text-center">
                               <span className="material-symbols-outlined text-4xl text-slate-200 mb-4">move_to_inbox</span>
                               <p className="text-on-surface-variant font-headline font-bold">In-take queue is currently empty.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-8 shadow-premium relative overflow-hidden">
                  <div className="relative z-10">
                     <h4 className="font-headline font-bold text-xl leading-snug">Generate Nairobi Performance Audit</h4>
                     <p className="text-white/60 text-xs mt-2 font-body leading-relaxed">Extract full market telemetry including revenue growth and worker utilization rates from the last 30 days.</p>
                  </div>
                  <button className="w-full py-4 bg-white text-primary rounded-xl font-bold font-headline text-sm shadow-xl hover:scale-105 active:scale-95 transition-all relative z-10 flex items-center justify-center gap-2">
                     <span className="material-symbols-outlined text-sm">analytics</span>
                     Run Protocol
                  </button>
                  <div className="absolute opacity-5 -bottom-10 -right-10 scale-[4]">
                     <span className="material-symbols-outlined text-[100px]">insights</span>
                  </div>
               </div>

               <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-outline-variant/5 space-y-6">
                  <h4 className="font-headline text-sm font-extrabold uppercase tracking-widest text-primary">Triage Breakdown</h4>
                  <div className="space-y-4">
                     {[
                       { label: 'Manual Assignments', val: '72%', color: 'bg-primary' },
                       { label: 'Auto-Dispatch', val: '0%', color: 'bg-slate-100' },
                       { label: 'Fulfillment Rate', val: '98%', color: 'bg-secondary' }
                     ].map(item => (
                       <div key={item.label}>
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2 px-1">
                             <span className="text-on-surface-variant font-headline">{item.label}</span>
                             <span className="text-primary font-headline">{item.val}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                             <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
