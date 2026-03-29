import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import RegisterWorkerForm from './RegisterWorkerForm';

export default async function WorkersAdministrationPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Double check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  // Fetch the entire network string of workers
  // To do this, we join worker_profiles on profiles
  const { data: workers, error } = await supabase
    .from('worker_profiles')
    .select(`
      id,
      bio,
      rating,
      total_jobs,
      verification_status,
      is_available,
      profile:profiles!worker_profiles_id_fkey(first_name, last_name, phone)
    `)
    .order('created_at', { ascending: false });

  const activeWorkers = workers?.filter(w => w.verification_status === 'approved' && w.is_available) || [];

  return (
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        {/* Header */}
        <header className="w-full relative md:sticky top-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-4 md:h-20 gap-4 md:gap-0 shadow-sm border-b border-outline-variant/5">
          <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Worker Management Roster</h1>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <RegisterWorkerForm />
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl shadow-premium border border-outline-variant/5">
              <span className="material-symbols-outlined text-secondary mb-2 text-2xl">groups</span>
              <p className="text-3xl font-headline font-extrabold text-primary">{workers?.length || 0}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-1">Total Workers</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-premium border border-outline-variant/5">
              <span className="material-symbols-outlined text-green-500 mb-2 text-2xl">event_available</span>
              <p className="text-3xl font-headline font-extrabold text-primary">{activeWorkers.length}</p>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mt-1">Available Now</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-premium border border-outline-variant/5 overflow-hidden font-body">
            <div className="p-6 border-b border-outline-variant/10 bg-surface-container-lowest">
               <h3 className="font-headline text-xl font-bold text-primary">Deployed Service Workers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/30 text-on-surface-variant text-[10px] uppercase tracking-widest font-extrabold font-headline">
                    <th className="px-8 py-5">Worker Details</th>
                    <th className="px-8 py-5">Verification</th>
                    <th className="px-8 py-5">Availability</th>
                    <th className="px-8 py-5 text-right">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-high/20">
                  {workers && workers.length > 0 ? workers.map((worker: any) => (
                    <tr key={worker.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-8 py-6 flex items-center gap-4">
                        <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center text-secondary font-headline font-bold">
                          {worker.profile?.first_name?.[0] || 'W'}
                        </div>
                        <div>
                          <p className="font-bold text-primary font-headline group-hover:text-secondary transition-colors">
                            {worker.profile?.first_name} {worker.profile?.last_name}
                          </p>
                          <p className="text-xs text-on-surface-variant font-body">{worker.profile?.phone || 'No phone recorded'}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-current opacity-90 ${
                          worker.verification_status === 'approved' ? 'bg-secondary/10 text-secondary' :
                          worker.verification_status === 'rejected' ? 'bg-error/10 text-error' :
                          'bg-amber-500/10 text-amber-600'
                        }`}>
                          {worker.verification_status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${worker.is_available ? 'bg-secondary animate-pulse' : 'bg-slate-300'}`}></div>
                           <span className="text-xs font-bold text-slate-600">{worker.is_available ? 'Available' : 'Offline'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <p className="font-bold text-primary flex items-center justify-end gap-1">
                          <span className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          {worker.rating}
                        </p>
                        <p className="text-xs text-on-surface-variant">{worker.total_jobs} total jobs</p>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center text-on-surface-variant font-medium">
                         No workers registered. Use the "Add New Worker" button to recruit cleaners to the dashboard.
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
