import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function CustomerSettingsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
           <h2 className="font-headline text-4xl font-extrabold tracking-tight text-primary">Account Settings</h2>
           <p className="text-on-surface-variant mt-2 text-lg font-body">Manage your personal profile and premium platform preferences.</p>
        </div>
        <button className="bg-primary text-white border-none px-10 py-4 rounded-2xl font-bold font-headline shadow-premium hover:shadow-xl transition-all scale-95 active:scale-90 flex items-center gap-2">
           <span className="material-symbols-outlined">save</span>
           Save Changes
        </button>
      </div>

      <div className="space-y-12">
         <div className="bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/5 overflow-hidden font-body">
            <div className="p-8 border-b border-slate-50 bg-surface-container-low/20">
               <h3 className="font-headline text-xl font-bold text-primary">Personal Profile</h3>
               <p className="text-sm text-on-surface-variant mt-1 font-body">Update your basic contact details for service notifications.</p>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant font-headline px-1">Full Name</label>
                  <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-secondary/30 transition-all outline-none" defaultValue={profile?.full_name || ''} />
               </div>
               <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant font-headline px-1">Email Connection</label>
                  <input className="w-full bg-slate-50/50 border-none rounded-2xl px-6 py-4 text-slate-400 font-semibold outline-none cursor-not-allowed" defaultValue={profile?.email || ''} readOnly />
               </div>
               <div className="space-y-3">
                  <label className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant font-headline px-1">Phone Number (Required)</label>
                  <input className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 text-on-surface font-semibold focus:ring-2 focus:ring-secondary/30 transition-all outline-none" defaultValue={profile?.phone || ''} />
               </div>
            </div>
         </div>

         <div className="bg-white rounded-[2.5rem] shadow-premium border border-outline-variant/5 overflow-hidden font-body">
            <div className="p-8 border-b border-slate-50 bg-warning/5">
                <h3 className="font-headline text-xl font-bold text-primary">Account Security</h3>
            </div>
            <div className="p-10 flex items-center justify-between">
               <div>
                  <h4 className="font-headline font-bold text-xl text-primary">Reset Login Protocol</h4>
                  <p className="text-on-surface-variant text-sm mt-1 max-w-sm">We'll send a password recovery secure link to your verified email address.</p>
               </div>
               <button className="bg-slate-100 text-slate-700 px-8 py-3 rounded-2xl font-bold font-headline text-sm hover:bg-slate-200 transition-all active:scale-95 shadow-sm">Initiate Reset</button>
            </div>
         </div>
      </div>
      <div className="h-10 md:hidden"></div>
    </div>
  );
}
