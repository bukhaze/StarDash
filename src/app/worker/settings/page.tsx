import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function WorkerSettingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'worker' && profile?.role !== 'admin') redirect('/dashboard');

  return (
    <div className="flex-1 p-10 max-w-[1400px] mx-auto w-full space-y-12 animate-in fade-in duration-700 font-body">
      
      {/* Configuration Header */}
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 py-4">
        <div className="space-y-2">
           <h1 className="text-4xl font-black tracking-tight text-slate-900 italic">Specialist Config</h1>
           <p className="text-slate-500 font-medium text-lg italic uppercase tracking-widest text-[10px]">Manage Deployment Availability & Protocol</p>
        </div>
        <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-xl hover:bg-slate-800 transition-all scale-95 active:scale-90 flex items-center gap-3">
           Secure Update
           <span className="material-symbols-outlined text-base">verified_user</span>
        </button>
      </header>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 gap-12">
         
         {/* Live Availability Switch */}
         <div className="bg-white rounded-[3rem] shadow-premium border border-slate-100 overflow-hidden group hover:border-blue-500/10 transition-all duration-500">
            <div className="p-10 border-b border-slate-50 bg-slate-50/20 backdrop-blur-lg flex items-center justify-between">
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 italic">Deployment Signal</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Live Availability Radar Status</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>online_prediction</span>
               </div>
            </div>
            <div className="p-12">
               <div className="flex items-center justify-between p-10 bg-slate-50 border border-slate-100 rounded-[2.5rem] transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1 group/row max-w-2xl">
                  <div className="space-y-3">
                     <p className="font-black text-slate-900 text-xl italic tracking-tighter">Availability Status</p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-relaxed max-w-[240px]">Synchronize your specialist presence with the Nairobi central dispatch terminal.</p>
                  </div>
                  <div className="w-20 h-10 bg-emerald-500 rounded-full cursor-pointer relative flex items-center px-1 shadow-inner shadow-emerald-500/20">
                     <div className="w-8 h-8 bg-white rounded-full absolute right-1 shadow-md"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Access & Security */}
         <div className="bg-white rounded-[3rem] shadow-premium border border-slate-100 overflow-hidden group hover:border-blue-500/10 transition-all duration-500">
            <div className="p-10 border-b border-slate-50 bg-slate-50/20 backdrop-blur-lg flex items-center justify-between">
               <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 italic">Specialist Credentials</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Access Log & Keys</p>
               </div>
               <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
               </div>
            </div>
            <div className="p-12 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 italic">Specialist Signature (Full Name)</label>
                     <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-slate-900 font-bold italic shadow-inner outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" value={profile?.full_name || ''} readOnly />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2 italic">Email Connection</label>
                     <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-5 text-slate-400 font-bold italic shadow-inner outline-none cursor-not-allowed" value={user.email || ''} disabled />
                  </div>
               </div>
               <div className="pt-6">
                  <button className="px-10 py-5 bg-white border border-slate-100 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.3em] text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 transition-all shadow-sm active:scale-95 flex items-center gap-4">
                     Update Password Sequence
                     <span className="material-symbols-outlined text-sm">vpn_key</span>
                  </button>
               </div>
            </div>
         </div>

         {/* Critical Section */}
         <div className="bg-red-600 rounded-[3rem] p-12 text-white space-y-10 relative overflow-hidden group shadow-2xl transition-all hover:bg-red-700">
            <div className="relative z-10 space-y-8">
               <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <span className="material-symbols-outlined text-3xl">logout</span>
               </div>
               <div className="space-y-4">
                  <h5 className="text-3xl font-black leading-tight italic tracking-tighter">Terminate Signal Hub</h5>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] leading-loose max-w-sm">Permanently disconnect your specialist partner profile from the StarDash network dispatch.</p>
               </div>
               <button className="h-16 flex items-center justify-center px-12 bg-white text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-2xl hover:bg-red-50 transition-all active:scale-95">
                  <span className="material-symbols-outlined text-lg mr-4">no_accounts</span>
                  Execute Disconnection
               </button>
            </div>
            <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
         </div>

      </div>
      <div className="h-10"></div>
    </div>
  );
}
