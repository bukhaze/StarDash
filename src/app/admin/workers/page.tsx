import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
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
    { label: 'Total Personnel', value: workers?.length || 0, icon: 'groups', color: 'text-slate-900' },
    { label: 'Staff Online', value: workers?.filter(w => w.is_available).length || 0, icon: 'how_to_reg', color: 'text-emerald-600' },
    { label: 'Verified Partners', value: workers?.filter(w => w.verification_status === 'approved').length || 0, icon: 'verified', color: 'text-blue-600' },
    { label: 'Avg Rating', value: '4.8', icon: 'star', color: 'text-amber-500' },
  ];

  return (
    <div className="flex-1 flex flex-col font-body bg-slate-50 min-h-screen">
         
         <header className="w-full relative md:sticky top-0 z-30 bg-white border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between px-10 py-8 md:h-28 animate-in fade-in duration-700">
            <div className="space-y-1">
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Staff Management</h1>
               <p className="text-sm font-medium text-slate-400">Manage and oversee your specialist workforce in Nairobi.</p>
            </div>
            <div className="flex items-center gap-4">
               <RegisterWorkerForm />
            </div>
         </header>

         <main className="flex-1 p-10 max-w-[1600px] mx-auto w-full space-y-12 animate-in slide-in-from-bottom-4 duration-1000">
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {stats.map(s => (
                <div key={s.label} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between h-48 group hover:shadow-md transition-all relative overflow-hidden">
                   <div className="space-y-5">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                         <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
                      </div>
                      <div>
                         <p className={`text-4xl font-bold ${s.color} tracking-tight`}>{s.value}</p>
                         <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">{s.label}</p>
                      </div>
                   </div>
                </div>
             ))}
           </div>

           <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden font-body relative">
            <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
               <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">Personnel Directory</h3>
                  <p className="text-xs font-medium text-slate-400 mt-1">List of all registered service specialists</p>
               </div>
               <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  <button className="px-6 py-3 bg-white rounded-xl shadow-sm text-[10px] font-bold uppercase tracking-widest text-slate-900 border border-slate-50">All Staff</button>
                  <button className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Pending Verification</button>
               </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    <th className="px-10 py-6 border-b border-slate-50">Staff Member</th>
                    <th className="px-10 py-6 border-b border-slate-50">Status</th>
                    <th className="px-10 py-6 border-b border-slate-50">Availability</th>
                    <th className="px-10 py-6 border-b border-slate-50 text-right">Activity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {workers && workers.length > 0 ? workers.map((worker: any) => (
                    <tr key={worker.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-10">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-500 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                             {worker.profile?.first_name?.[0]}{worker.profile?.last_name?.[0]}
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-blue-600 transition-colors">
                              {worker.profile?.first_name} {worker.profile?.last_name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium tracking-tight">{worker.profile?.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-10">
                        <span className={`inline-flex px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                          worker.verification_status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          worker.verification_status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {worker.verification_status || 'Unverified'}
                        </span>
                      </td>
                      <td className="px-10 py-10">
                        <div className="flex items-center gap-4">
                           <div className={`w-3 h-3 rounded-full ${worker.is_available ? 'bg-emerald-500 shadow-xl' : 'bg-slate-200'}`}></div>
                           <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">{worker.is_available ? 'Ready for jobs' : 'Offline'}</span>
                        </div>
                      </td>
                      <td className="px-10 py-10 text-right">
                        <div className="flex flex-col items-end gap-1">
                           <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-amber-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                              <span className="font-bold text-slate-900 text-lg tracking-tight leading-none">{worker.rating || '0.0'}</span>
                           </div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{worker.total_jobs} total jobs</p>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={4} className="px-10 py-32 text-center">
                         <div className="max-w-xs mx-auto space-y-4 opacity-30">
                            <span className="material-symbols-outlined text-4xl">person_search</span>
                            <p className="text-sm font-bold uppercase tracking-widest">No staff members found</p>
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
  );
}
