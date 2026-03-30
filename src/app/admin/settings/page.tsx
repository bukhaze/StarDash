import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminSettingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  return (
    <div className="flex-1 flex flex-col font-body bg-slate-50 min-h-screen">
         
         <header className="w-full relative md:sticky top-0 z-30 bg-white border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between px-10 py-8 md:h-28 animate-in fade-in duration-700">
            <div className="space-y-1">
               <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Settings</h1>
               <p className="text-sm font-medium text-slate-400">Manage your business and security configurations from one place.</p>
            </div>
            <div className="flex items-center gap-4">
               <button className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98]">Save Changes</button>
            </div>
         </header>

         <main className="flex-1 p-10 max-w-[1400px] mx-auto w-full space-y-12 animate-in slide-in-from-bottom-4 duration-1000">
           
           <div className="grid grid-cols-1 gap-12">

              {/* Business Settings */}
              <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all duration-500">
                 <div className="p-10 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
                    <div className="space-y-1">
                       <h3 className="text-xl font-bold text-slate-900">Service Area Settings</h3>
                       <p className="text-xs font-medium text-slate-400">Manage where and how we offer services across Nairobi.</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-50 flex items-center justify-center text-slate-400">
                       <span className="material-symbols-outlined">map</span>
                    </div>
                 </div>
                 <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex items-center justify-between p-8 bg-slate-50 border border-slate-50 rounded-[2.5rem] hover:bg-white hover:border-slate-100 transition-all">
                       <div className="space-y-2">
                          <p className="font-bold text-slate-900 text-lg">Allow Guest Bookings</p>
                          <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[200px]">Allow customers to book a service without creating an account first.</p>
                       </div>
                       <div className="w-14 h-8 bg-blue-600 rounded-full cursor-pointer relative flex items-center px-1 shadow-inner shadow-blue-200">
                          <div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-sm"></div>
                       </div>
                    </div>

                    <div className="flex items-center justify-between p-8 bg-slate-50 border border-slate-50 rounded-[2.5rem] hover:bg-white hover:border-slate-100 transition-all">
                       <div className="space-y-2">
                          <p className="font-bold text-slate-900 text-lg">Priority Locations</p>
                          <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[200px]">Prioritize staff assignments for Westlands and Kilimani areas.</p>
                       </div>
                       <div className="w-14 h-8 bg-blue-600 rounded-full cursor-pointer relative flex items-center px-1 shadow-inner shadow-blue-200">
                          <div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-sm"></div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Data Settings */}
              <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-all duration-500">
                 <div className="p-10 border-b border-slate-50 bg-slate-50/20 flex items-center justify-between">
                    <div className="space-y-1">
                       <h3 className="text-xl font-bold text-slate-900">Security & Privacy</h3>
                       <p className="text-xs font-medium text-slate-400">Manage data privacy and historical business records.</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-50 flex items-center justify-center text-slate-400">
                       <span className="material-symbols-outlined">security</span>
                    </div>
                 </div>
                 <div className="p-10">
                    <div className="flex items-center justify-between p-8 bg-slate-50 border border-slate-50 rounded-[2.5rem] hover:bg-white hover:border-slate-100 transition-all max-w-xl">
                       <div className="space-y-2">
                          <p className="font-bold text-slate-900 text-lg">Archive Old Records</p>
                          <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[200px]">Move booking data to history automatically after 30 days.</p>
                       </div>
                       <div className="w-14 h-8 bg-slate-200 rounded-full cursor-pointer relative flex items-center px-1 shadow-inner">
                          <div className="w-6 h-6 bg-white rounded-full absolute left-1 shadow-sm"></div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Support Tools */}
              <div className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 relative overflow-hidden group shadow-2xl transition-all hover:bg-black">
                 <div className="relative z-10 space-y-8">
                    <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                       <span className="material-symbols-outlined text-2xl">support</span>
                    </div>
                    <div className="space-y-2">
                       <h5 className="text-3xl font-bold tracking-tight">System Support Central</h5>
                       <p className="text-white/40 text-xs font-medium leading-relaxed max-w-xl tracking-widest uppercase">Access specialized tools to resolve staff disputes or manage technical platform issues.</p>
                    </div>
                    <button className="h-16 flex items-center justify-center px-10 bg-white text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-50 transition-all active:scale-95">
                       Open Support Tools
                       <span className="material-symbols-outlined ml-4 text-sm">arrow_forward</span>
                    </button>
                 </div>
              </div>

           </div>
           <div className="h-10 md:hidden"></div>
         </main>
    </div>
  );
}
