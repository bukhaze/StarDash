import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default async function WorkerDashboardPage() {
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
      service:services(name),
      customer:profiles!bookings_customer_id_fkey(full_name, phone, email),
      address:addresses(neighborhood, street_address, apartment_suite)
    `)
    .eq('worker_id', user.id)
    .order('scheduled_date', { ascending: true });

  const stats = [
    { label: 'Assigned Jobs', value: assignments?.length.toString() || '0', icon: 'assignment' },
    { label: 'Success Rate', value: '100%', icon: 'trending_up' },
    { label: 'Total Earnings', value: 'KES 0', icon: 'payments' },
  ];

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="w-full relative md:sticky top-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-4 md:h-20 gap-4 md:gap-0 shadow-sm border-b border-outline-variant/5">
          <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Worker Dispatch Center</h1>
          <div className="flex items-center gap-4">
             <span className="bg-secondary/10 text-secondary px-4 py-2 rounded-xl text-xs font-bold font-headline uppercase tracking-widest">Active Partner</span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(s => (
              <div key={s.label} className="bg-white p-8 rounded-3xl shadow-premium border border-outline-variant/5 flex flex-col justify-between h-40">
                <span className="material-symbols-outlined text-secondary text-2xl">{s.icon}</span>
                <div>
                   <p className="text-3xl font-black text-primary font-headline">{s.value}</p>
                   <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant font-headline mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
             <h3 className="text-2xl font-bold font-headline text-primary px-2">Assigned Tasks</h3>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               {assignments && assignments.length > 0 ? assignments.map((job: any) => (
                 <div key={job.id} className="bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/10 overflow-hidden hover:border-secondary transition-all group p-8 space-y-8 relative">
                    <div className="flex justify-between items-start">
                       <div className="space-y-2">
                          <span className="bg-blue-500/10 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-blue-500/20">{job.status.replace('_', ' ')}</span>
                          <h4 className="text-2xl font-bold text-primary font-headline group-hover:text-secondary transition-colors">{job.service?.name}</h4>
                       </div>
                       <div className="text-right">
                          <p className="text-lg font-bold text-slate-900 font-headline leading-tight">{job.scheduled_date}</p>
                          <p className="text-sm text-on-surface-variant font-body">{job.scheduled_time}</p>
                       </div>
                    </div>

                    <div className="p-6 bg-surface-container-low/30 rounded-2xl space-y-6">
                       <div className="flex items-center gap-4">
                          <span className="material-symbols-outlined text-secondary">location_on</span>
                          <div>
                             <p className="font-bold text-primary text-sm font-headline">{job.address?.neighborhood}</p>
                             <p className="text-xs text-on-surface-variant font-body">{job.address?.apartment_suite ? `${job.address?.apartment_suite}, ` : ''}{job.address?.street_address}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 pt-4 border-t border-white/50">
                          <span className="material-symbols-outlined text-secondary">person</span>
                          <div>
                             <p className="font-bold text-primary text-sm font-headline">{job.customer?.full_name || job.guest_name}</p>
                             <p className="text-xs text-on-surface-variant font-body">{job.customer?.phone || job.guest_phone || 'No phone provided'}</p>
                          </div>
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <button className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-bold font-headline text-sm shadow-md hover:opacity-90 active:scale-95 transition-all">Report Arrival</button>
                       <button className="py-4 px-6 bg-slate-100 text-slate-500 rounded-xl font-bold font-headline text-sm hover:bg-slate-200 transition-all">View Notes</button>
                    </div>
                 </div>
               )) : (
                 <div className="lg:col-span-2 bg-surface-container-low border-2 border-dashed border-outline-variant/30 rounded-[2.5rem] p-20 text-center">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-6">work_off</span>
                    <p className="text-on-surface-variant font-bold font-headline text-xl">No tasks dispatched to you yet.</p>
                 </div>
               )}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
