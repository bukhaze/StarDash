import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import RegisterWorkerForm from './RegisterWorkerForm';

export default async function WorkersAdministrationPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  const { data: workers } = await supabase
    .from('worker_profiles')
    .select(`
      id,
      bio,
      rating,
      total_jobs,
      verification_status,
      is_available,
      profile:profiles!worker_profiles_id_fkey(first_name, last_name, phone, email)
    `)
    .order('created_at', { ascending: false });

  const stats = [
    { label: 'Total Taskers', value: workers?.length || 0, icon: 'groups', color: 'bg-primary' },
    { label: 'Dispatch Ready', value: workers?.filter(w => w.is_available).length || 0, icon: 'bolt', color: 'bg-amber-500' },
    { label: 'Verified Experts', value: workers?.filter(w => w.verification_status === 'approved').length || 0, icon: 'verified', color: 'bg-secondary' },
    { label: 'Platform Rating', value: '4.8', icon: 'star', color: 'bg-yellow-500' },
  ];

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="w-full relative md:sticky top-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-4 md:h-20 gap-4 md:gap-0 shadow-sm border-b border-outline-variant/5">
          <div className="flex items-center gap-3">
             <span className="material-symbols-outlined text-primary text-2xl font-bold">engineering</span>
             <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Service Partner Network</h1>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <RegisterWorkerForm />
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map(s => (
               <div key={s.label} className="bg-white p-7 rounded-[2rem] shadow-premium border border-outline-variant/10 flex flex-col justify-between h-40 group hover:border-secondary/20 transition-all">
                  <div className={`w-10 h-10 rounded-xl ${s.color}/10 flex items-center justify-center`}>
                     <span className="material-symbols-outlined text-[20px]" style={{ color: s.color.includes('secondary') ? '#10b981' : s.color.includes('amber') ? '#d97706' : s.color.includes('yellow') ? '#eab308' : '#0f172a' }}>{s.icon}</span>
                  </div>
                  <div>
                     <p className="text-3xl font-black text-primary font-headline tracking-tight leading-none">{s.value}</p>
                     <p className="text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant font-headline mt-2 leading-none">{s.label}</p>
                  </div>
               </div>
            ))}
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/5 overflow-hidden font-body">
            <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/10">
               <div>
                  <h3 className="font-headline text-xl font-bold text-primary">Deployed Professionals</h3>
                  <p className="text-xs text-on-surface-variant mt-1 font-body">Management and verification of the artisan network.</p>
               </div>
               <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button className="px-4 py-2 bg-white rounded-lg shadow-sm text-xs font-bold text-primary">All Active</button>
                  <button className="px-4 py-2 text-xs font-bold text-on-surface-variant border-none bg-transparent">Pending</button>
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/10 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                    <th className="px-8 py-5">Professional Profile</th>
                    <th className="px-8 py-5">Verified Status</th>
                    <th className="px-8 py-5">Live Availability</th>
                    <th className="px-8 py-5 text-right">Performance Metrics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high/10">
                  {workers && workers.length > 0 ? workers.map((worker: any) => (
                    <tr key={worker.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary font-headline font-bold text-lg shadow-inner group-hover:bg-primary group-hover:text-white transition-all duration-500">
                            {worker.profile?.first_name?.[0]}{worker.profile?.last_name?.[0]}
                          </div>
                          <div>
                            <p className="font-black text-primary font-headline group-hover:text-secondary transition-colors">
                              {worker.profile?.first_name} {worker.profile?.last_name}
                            </p>
                            <p className="text-[10px] text-on-surface-variant font-body uppercase font-bold tracking-tight">{worker.profile?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-current ${
                          worker.verification_status === 'approved' ? 'bg-secondary/10 text-secondary' :
                          worker.verification_status === 'rejected' ? 'bg-error/10 text-error' :
                          'bg-amber-500/10 text-amber-600'
                        }`}>
                          {worker.verification_status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-on-surface-variant font-medium">
                        <div className="flex items-center gap-2">
                           <div className={`w-2.5 h-2.5 rounded-full ${worker.is_available ? 'bg-secondary shadow-[0_0_10px_#10b981]' : 'bg-slate-300'}`}></div>
                           <span className="text-[11px] font-bold font-headline uppercase tracking-tighter text-slate-700">{worker.is_available ? 'In Active Dispatch' : 'Signal Offline'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex flex-col items-end">
                           <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-yellow-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                              <span className="font-black text-primary font-headline text-sm">{worker.rating || '0.0'}</span>
                           </div>
                           <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-1">{worker.total_jobs} Managed Jobs</p>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-24 text-center">
                         <div className="max-w-xs mx-auto space-y-4">
                           <span className="material-symbols-outlined text-5xl text-slate-100">person_search</span>
                           <h4 className="font-headline font-bold text-primary">Platform Roster is Empty</h4>
                           <p className="text-on-surface-variant text-xs font-body leading-relaxed">No professional taskers have been registered on the StarDash network yet. Begin by onboarding a new partner.</p>
                         </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
