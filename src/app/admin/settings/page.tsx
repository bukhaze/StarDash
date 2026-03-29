import React from 'react';
import { createSupabaseServerClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

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
    <div className="flex bg-surface min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 md:ml-72 flex flex-col">
        <header className="w-full relative md:sticky top-0 z-30 bg-white/80 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-8 py-4 md:h-20 gap-4 md:gap-0 shadow-sm border-b border-outline-variant/5">
          <h1 className="font-headline font-semibold tracking-tight text-slate-900 text-xl">Platform Configuration Center</h1>
          <div className="flex items-center gap-4">
             <button className="bg-primary text-white px-8 py-2.5 rounded-xl font-headline font-bold text-sm shadow-premium hover:opacity-90 active:scale-95 transition-all">Save Global Settings</button>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
          
          <div className="bg-white rounded-[2rem] shadow-premium border border-outline-variant/5 overflow-hidden">
             <div className="p-8 border-b border-slate-100 bg-surface-container-low/30">
                <h3 className="text-xl font-bold font-headline text-primary">Service Coverage & Availability</h3>
                <p className="text-sm text-on-surface-variant font-body">Manage which Nairobi neighborhoods are active for live bookings.</p>
             </div>
             <div className="p-8 space-y-8">
                <div className="flex items-center justify-between py-2">
                   <div className="space-y-1">
                      <p className="font-bold text-primary font-headline">Accepting New Customers</p>
                      <p className="text-xs text-on-surface-variant font-body">Toggle to allow/disallow guest checkouts globally on the platform.</p>
                   </div>
                   <div className="w-14 h-8 bg-secondary rounded-full relative flex items-center px-1 shadow-inner shadow-secondary/20">
                      <div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-sm"></div>
                   </div>
                </div>

                <div className="flex items-center justify-between py-2 border-t border-slate-100 pt-8">
                   <div className="space-y-1">
                      <p className="font-bold text-primary font-headline">Kilimani & Westlands Priority</p>
                      <p className="text-xs text-on-surface-variant font-body">Boost visibility for these high-volume corridors.</p>
                   </div>
                   <div className="w-14 h-8 bg-secondary rounded-full relative flex items-center px-1 shadow-inner shadow-secondary/20">
                      <div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-sm"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-premium border border-outline-variant/5 overflow-hidden">
             <div className="p-8 border-b border-slate-100 bg-surface-container-low/30">
                <h3 className="text-xl font-bold font-headline text-primary">Administrative Security</h3>
             </div>
             <div className="p-8 space-y-8">
                <div className="flex items-center justify-between py-2">
                   <div className="space-y-1">
                      <p className="font-bold text-primary font-headline">Audit Log Retention</p>
                      <p className="text-xs text-on-surface-variant font-body">Automatically archive system activity after 30 days.</p>
                   </div>
                   <div className="w-14 h-8 bg-secondary rounded-full relative flex items-center px-1 shadow-inner shadow-secondary/20">
                      <div className="w-6 h-6 bg-white rounded-full absolute right-1 shadow-sm"></div>
                   </div>
                </div>
             </div>
          </div>

        </main>
      </div>
    </div>
  );
}
